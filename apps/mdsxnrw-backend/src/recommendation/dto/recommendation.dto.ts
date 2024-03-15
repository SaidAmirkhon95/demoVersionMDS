import { IsArray } from 'class-validator';
import { Connector } from '@prisma/client';

export class RecommendationDTO {
  // sorted by recommendationScore of the connector in descending order
  @IsArray()
  connectors: Connector[];

  @IsArray()
  recommendationScores: number[];

  @IsArray()
  args: string[][];
}
