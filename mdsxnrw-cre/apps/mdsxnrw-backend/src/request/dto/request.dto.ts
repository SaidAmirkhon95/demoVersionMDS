import {
  IsIn,
  IsArray,
  ArrayMinSize,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import {
  CompanyIndustrySector,
  CompanySize,
  ItKnowhow,
  DataAvailabilities,
  DataspaceRoles,
  ServiceLevel,
  UsagePolicies,
} from '@prisma/client';

export class RequestDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsIn(Object.values(CompanyIndustrySector), { each: true })
  companyIndustrySectors: string[];

  @IsNumber()
  companyItExpertsFrom: number;

  @IsNumber()
  companyItExpertsTo: number;

  @IsIn(Object.values(ItKnowhow), { each: true })
  companyItKnowhow: string;

  @IsString()
  companyLocation: string;

  @IsIn(Object.values(CompanySize), { each: true })
  companySize: string;

  @IsString()
  companyType: string;

  @IsOptional()
  @IsNumber()
  companyZipcode: number;

  @IsOptional()
  @IsArray()
  @IsIn(Object.values(DataAvailabilities), { each: true })
  dataAvailabilities: string[];

  @IsOptional()
  @IsArray()
  @IsIn(Object.values(DataspaceRoles), { each: true })
  dataspaceRoles: string[];

  @IsOptional()
  @IsIn(Object.values(ServiceLevel), { each: true })
  serviceLevel: string[];

  @IsOptional()
  @IsIn(Object.values(UsagePolicies), { each: true })
  usagePolicies: string;
}
