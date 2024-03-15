import { Body, Controller, Post } from '@nestjs/common';
import { CreService } from './cre.service';
import {
  Prisma,
  PrismaClient,
  ItKnowhow,
  CompanyIndustrySector,
  DataspaceRoles,
  ServiceLevel,
  UsagePolicies,
  FTE,
  AlternativePolicyExpressionModel,
} from '@prisma/client';
import {
  AuthenticatedUser,
  Public,
  Roles,
  RoleMatchingMode,
  Unprotected,
} from 'nest-keycloak-connect';
import { RequestDto } from 'src/request/dto/request.dto';
import { RecommendationDTO } from 'src/recommendation/dto/recommendation.dto';
import { CRE } from './cre.engine.core';
import { Utils } from './cre.utils';
import { Mappings } from './cre.mappings';
import { filter } from 'rxjs';

const prisma = new PrismaClient();

@Controller('/api/cre')
export class CreController {
  constructor(private readonly creService: CreService) {}

  @Post()
  @Public(true)
  async callCRE(@Body() requestDto: RequestDto) {
    // ----- LOAD AND BUILD DATA SOURCES (SPECIFY HERE) -----

    // just for this case only, where we distinguish between companyItExpertsFrom and companyItExpertsTo
    requestDto['companyItExpertsFrom'] =
      (requestDto['companyItExpertsFrom'] + requestDto['companyItExpertsTo']) /
      2.0;
    // SPECIFY relevant request attributes for recommendation
    // NOTE: Final engine vectors will have same length as this array
    // NOTE: If multiple connector attributes map to the same request attribute separately, do multiple handles in the mapping below and adapt other array length
    const relevantRequestAttributes: string[] = [
      'companyIndustrySectors', // match with targetIndustrySectors
      'companyItExpertsFrom', // match with fte
      // 'companyItExpertsTo' ignored as the mean of ..From and ..To is overwritten in ..From !
      'companyItKnowhow', // match with itKnowhow and selfImplementation
      'dataspaceRoles', // match with targetDataspaceRoles
      'serviceLevel', // match with serviceLevel
      'usagePolicies', // match with basedOnODRL and alternativePolicyExpressionModel
    ];

    // SPECIFY default values for all OPTIONAL request attributes
    // convention: 'null' means full match (dont care about this attribute), no mapping to connector value required (consider this case when doing matching)
    const defaultValuesForOptionalAttributes = {
      dataspaceRoles: null, // full match
      serviceLevel: null, // full match
      usagePolicies: 'standard',
    };

    // WEIGHTS
    // SPECIFY weighting vector (must have same length as relevantRequestAttributes since all vectors must fit this length)
    // RequestVector: [companyIndustrySectors, companyItExpertsFrom, companyItKnowhow, dataspaceRoles, serviceLevel, usagePolicies]
    const weightVector = [1, 2, 3, 1, 1, 1];

    // build request object with extended requestDTO to all relevant request attributes (add default values to empty fields)
    const request = Utils.buildRequestObject(
      requestDto,
      relevantRequestAttributes,
      defaultValuesForOptionalAttributes,
    );

    // specify relevant connector attributes for the recommendation engine (should be in order of engine iteration / request!)
    const relevantDBAttributes = [
      'targetIndustrySectors',
      'fte',
      'itKnowhow',
      'selfImplementation',
      'targetDataspaceRoles',
      'serviceLevel',
      'basedOnODRL',
      'alternativePolicyExpressionModel',
    ];
    // load entire database
    const db = await Utils.loadDatabase(prisma);
    // filter database on relevantCREAttributes, track id to identify connector
    let filteredDatabase: Object[] = await Utils.loadFilteredDatabase(
      ['id'].concat(relevantDBAttributes),
      db,
    );

    // ----- BUILD REQUEST VECTOR and CONNECTOR VECTORS BY MAPPINGS -----

    // vector: ["companyIndustrySectors", "companyItExpertsFrom" (with mean value), "companyItKnowhow", "dataspaceRoles", "serviceLevel", "usagePolicies"];
    // requestVectors: {"id": requestVector[], ...}
    let requestVectors: object = {};
    // connector: ['targetIndustrySectors', 'fte', 'itKnowhow', 'selfImplementation', 'targetDataspaceRoles', 'serviceLevel', 'basedOnODRL', 'alternativePolicyExpressionModel',];
    // connectorVectors: {"id": connectorVector[], ...}
    // connectorVector each of same length as requestVector
    let connectorVectors: object = {};
    filteredDatabase.forEach((connector) => {
      connectorVectors[connector['id']] = [];
      requestVectors[connector['id']] = [];
    });

    // SPECIFY MAPPINGS for each attribute based on matching information
    // index of requestVector and connectorVector
    let index = 0;
    for (let key in request) {
      // index will be overwritten once in each loop for each connector ID, 42 indicates 'not set yet'
      for (let id in requestVectors) {
        requestVectors[id][index] = 42;
      }
      // switch case on REQUESTattributes to match on specific DB attributes
      // ------------------------ SPECIFY MAPPING HERE ------------------------
      switch (key) {
        // -------------------------------------------
        case 'companyIndustrySectors':
          filteredDatabase.forEach((connector) => {
            const req_con: number[] = Mappings.mapOneInBothArrays(
              request[key],
              connector['targetIndustrySectors'],
            );
            Utils.setVectors(
              requestVectors,
              connectorVectors,
              connector['id'],
              index,
              req_con,
            );
          });
          break;
        // -------------------------------------------
        case 'companyItExpertsFrom':
          // companyITExpertsFrom is mean value of companyItExpertsFrom and companyItExpertsTo here !
          filteredDatabase.forEach((connector) => {
            // find corresponding FTE string value to request number value
            // map request number value to enum string value so it can be delegated mapEnumSteps (intervals should be pairwise disjunct)
            const numberToEnumMappingIntervalArray: number[][] = [
              [1, 2], // single_person
              [3, 5], // small_team
              [6, 9], // large_team
              [10, Number.MAX_VALUE], // department
            ];
            let request_interval_index = -1;
            numberToEnumMappingIntervalArray.forEach((interval) => {
              if (request[key] >= interval[0] && request[key] <= interval[1]) {
                request_interval_index =
                  numberToEnumMappingIntervalArray.indexOf(interval);
              }
            });
            // store corresponding enum string value in transformed_request
            const transformed_request_value =
              Object.values(FTE)[request_interval_index];
            const req_con: number[] = Mappings.mapEnumSteps(
              transformed_request_value,
              connector['fte'],
              Object.values(FTE),
            );
            Utils.setVectors(
              requestVectors,
              connectorVectors,
              connector['id'],
              index,
              req_con,
            );
          });
          break;
        // -------------------------------------------
        case 'companyItKnowhow':
          filteredDatabase.forEach((connector) => {
            const req_con: number[] = Mappings.mapEnumSteps(
              request[key],
              connector['itKnowhow'],
              Object.values(ItKnowhow),
            );
            // if connector doesnt have to be self implemented, dont care about required ItKnowhow and full match
            if (connector['selfImplementation'] == false) {
              Utils.setVectors(
                requestVectors,
                connectorVectors,
                connector['id'],
                index,
                [-1, -1],
              );
            } else {
              // use req_con as calculated
              Utils.setVectors(
                requestVectors,
                connectorVectors,
                connector['id'],
                index,
                req_con,
              );
            }
          });
          break;
        case 'dataspaceRoles':
          filteredDatabase.forEach((connector) => {
            let req_con: number[];
            // if dataspaceRoles is null in request, then full match
            if (request[key] == null) {
              req_con = [-1, -1]; // full match
            } else {
              req_con = Mappings.mapSubsetOfArray(
                request[key],
                connector['targetDataspaceRoles'],
              );
            }
            Utils.setVectors(
              requestVectors,
              connectorVectors,
              connector['id'],
              index,
              req_con,
            );
          });
          break;
        case 'serviceLevel':
          filteredDatabase.forEach((connector) => {
            /* let req_con: number[];
            // if serviceLevel is null in request, then full match
            if (request[key] == null) {
              req_con = [-1, -1]; // full match
            } else {
              req_con = Mappings.mapDownwardCompatible(
                request[key],
                connector['serviceLevel'],
                Object.values(ServiceLevel),
              );
            } */
            const req_con: number[] = Mappings.mapOneInBothArrays(
              request[key],
              connector['serviceLevel'],
            );
            Utils.setVectors(
              requestVectors,
              connectorVectors,
              connector['id'],
              index,
              req_con,
            );
          });
          break;
        case 'usagePolicies':
          filteredDatabase.forEach((connector) => {
            let req_con: number[];
            // if usagePolicies is null in request, then full match
            if (request[key] == null) {
              req_con = [-1, -1]; // full match
            } else {
              if (connector['basedOnODRL'] == true) {
                req_con = Mappings.mapExactMatch(request[key], 'standard');
              } else {
                // alternativeExpressionModel means special usagePolicies
                req_con = Mappings.mapExactMatch(
                  request[key],
                  connector['special'],
                );
              }
            }
            Utils.setVectors(
              requestVectors,
              connectorVectors,
              connector['id'],
              index,
              req_con,
            );
          });
          break;
      }
      // end switch-case
      index++;
    }
    // ----- APPLY WEIGHTING -----

    const weightedRequestVectors: object = Utils.weighting(
      requestVectors,
      weightVector,
    );
    const weightedConnectorVectors: object = Utils.weighting(
      connectorVectors,
      weightVector,
    );

    // ----- CALCULATE RECOMMENDATION SCORES / CALL ENGINE -----

    let connectorScores: Object = {};
    for (let id in connectorVectors) {
      connectorScores[id] =
        CRE.calculateCosineSimilarityWithNormalizedEuclideanDistance(
          weightedRequestVectors[id],
          weightedConnectorVectors[id],
          weightVector,
        );
    }
    // sort connector scores by score in descending order
    // [id, score]
    const sortedConnectorScores: [string, number][] = Object.entries(
      connectorScores,
    ).sort((a, b) => b[1] - a[1]);

    // ----- BUILD RECOMMENDATION OBJECT AND RETURN-----

    const recommendation: RecommendationDTO = Utils.buildRecommendationObject(
      db,
      sortedConnectorScores,
    );

    // return recommendation;

    // --------------------------------------- OTHERS ----------------------------------------------------

    // ----- METHOD TESTING and TEST LOGGING -----
    //this.testEngineMethods();
    console.log('RequestDTO: ', requestDto);
    console.log('request Object (filtered and extended): ', request);
    //console.log('filtered database: ', filteredDatabase);
    //console.log('Database: ', db);
    console.log('request vectors: ', requestVectors);
    console.log('connector vectors: ', connectorVectors);
    console.log('weighted request vectors: ', weightedRequestVectors);
    console.log('weighted connector vectors: ', weightedConnectorVectors);
    console.log(
      'recommendation: ',
      recommendation['args'],
      ', ',
      recommendation['recommendationScores'],
    );

    return recommendation;
  }
}
