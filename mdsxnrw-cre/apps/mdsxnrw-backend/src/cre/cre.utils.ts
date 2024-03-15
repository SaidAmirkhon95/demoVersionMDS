import { RequestDto } from 'src/request/dto/request.dto';
import { RecommendationDTO } from 'src/recommendation/dto/recommendation.dto';
import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class Utils {
  // DB Functions

  /**
   * loads the prisma database
   *
   * @param prisma with connector entity
   * @returns entire db
   */
  static async loadDatabase(prisma: PrismaClient) {
    let db = {};
    try {
      db = await prisma.connector.findMany();
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
    return db;
  }

  /**
   * filteres database on given attributes
   *
   * @param attributes
   * @param db
   * @returns filtered database
   */
  static async loadFilteredDatabase(attributes: string[], db: object) {
    let filteredDatabase = [];
    for (let index in db) {
      filteredDatabase[index] = {};
      attributes.forEach((attribute) => {
        filteredDatabase[index][attribute] = db[index][attribute];
      });
    }
    return filteredDatabase;
  }

  /**
   * find a connector with given id in DB if it exists
   *
   * @param db
   * @param id
   * @returns connector with given id from db
   */
  static findConnectorById(db: object, id: number) {
    for (let connector in db) {
      if (db[connector]['id'] == id) {
        return db[connector];
      }
    }
    throw new NotFoundException('Connector not found');
  }

  // Build Request Function

  /**
   * builds filtered and initialized request object
   * @param requestDto
   * @param relevantRequestAttributes
   * @param defaultValuesForOptionalAttributes Values to fill if attribute is optional and not set or empty
   * @returns filtered and initialized request object
   */
  static buildRequestObject(
    requestDto: RequestDto,
    relevantRequestAttributes: string[],
    defaultValuesForOptionalAttributes: object,
  ) {
    const request = {};
    relevantRequestAttributes.forEach((attribute) => {
      if (
        requestDto.hasOwnProperty(attribute) &&
        requestDto[attribute] !== ''
      ) {
        if (
          Array.isArray(requestDto[attribute]) &&
          requestDto[attribute].length === 0
        ) {
          // fill up with default value if an empty array was specified by user
          request[attribute] = defaultValuesForOptionalAttributes[attribute];
        } else {
          // pass through value specified by user
          request[attribute] = requestDto[attribute];
        }
      } else {
        // fill up with default values if attribute has not been specified by user
        request[attribute] = defaultValuesForOptionalAttributes[attribute];
      }
    });
    return request;
  }

  // Weighting

  /**
   * return object of weighted vectors
   *
   * @param vectors object of vectors {id: [vector], ...}
   * @param weightVector
   */
  static weighting(vectors: object, weightVector: number[]): object {
    let weightedVectors: object = Utils.deepCopy(vectors);

    for (let id in vectors) {
      for (let i = 0; i < vectors[id].length; i++) {
        weightedVectors[id][i] = vectors[id][i] * weightVector[i];
      }
    }
    return weightedVectors;
  }

  // Other util functions

  static buildRecommendationObject(
    db: object,
    sortedConnectorScores: [string, number][],
  ) {
    let recommendation: RecommendationDTO = {
      connectors: [],
      recommendationScores: [],
      args: [],
    };
    for (let i = 0; i < sortedConnectorScores.length; i++) {
      recommendation['connectors'][i] = Utils.findConnectorById(
        db,
        parseFloat(sortedConnectorScores[i][0]),
      );
      recommendation['recommendationScores'][i] = sortedConnectorScores[i][1];
      recommendation['args'][i] = [sortedConnectorScores[i][0]];
    }
    return recommendation;
  }

  /**
   * sets vectors in request and connector vectors at given id and index to req_con
   *
   * @param requestVectors
   * @param connectorVectors
   * @param id
   * @param index
   * @param req_con two dimensional array of [requestMappingValue, connectorMappingValue]
   */
  static setVectors(
    requestVectors: object,
    connectorVectors: object,
    id: number,
    index: number,
    req_con: number[],
  ) {
    // if index has not been set yet, set it to req mapping value
    requestVectors[id][index] == 42
      ? (requestVectors[id][index] = req_con[0])
      : requestVectors[id][index];
    // set connector mapping value
    connectorVectors[id][index] = req_con[1];
  }

  /**
   * deep copies an object
   * @param obj
   * @returns copy of object
   */
  static deepCopy(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }
}
