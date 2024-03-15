import { RequestDto } from 'src/request/dto/request.dto';
import { RecommendationDTO } from 'src/recommendation/dto/recommendation.dto';
import { Utils } from './cre.utils';
import { ConflictException } from '@nestjs/common';

export class CRE {
  // ------ ENGINE METHODS -----

  /**
   * This is a function to combine the features of both recommendation engine metrics
   *
   * asserts that all arrays are valid
   *
   * allows weighted vectors
   * @param vector1 of length n (may contain zero values)
   * @param vector2 of length n (may contain zero values)
   * @param weightVector of length n in range [1, inf]
   * @returns mean of cosine similarity and normalized euclidean distance in range [0, 1] (1 means best)
   */
  static calculateCosineSimilarityWithNormalizedEuclideanDistance(
    vector1: number[],
    vector2: number[],
    weightVector: number[],
  ) {
    // check valid arrays
    this.checkValidArrays(vector1, vector2, weightVector);
    // logging
    console.log(
      'Engine Methods [cos, eucl]: [',
      CRE.calculateCosineSimilarity(vector1, vector2),
      ', ',
      CRE.calculateNormalizedEucledianDistance(vector1, vector2, weightVector),
      ']',
    );
    // mean of both metrics
    return (
      (CRE.calculateCosineSimilarity(vector1, vector2) +
        CRE.calculateNormalizedEucledianDistance(
          vector1,
          vector2,
          weightVector,
        )) /
      2
    );
  }

  /**
   * calculates cosine similarity
   *
   * allows weighted vectors
   * @param vector1 of length n (may contain zero values)
   * @param vector2 of length n (may contain zero values)
   * @returns normalized cosine similarity in range [0, 1]
   */
  static calculateCosineSimilarity(vector1: number[], vector2: number[]) {
    let dotProduct = 0;
    // refactor zero values to 0+e to avoid division by zero
    let vectorA = vector1.map((x) => (x == 0 ? 0 + 1e-5 : x));
    let vectorB = vector2.map((x) => (x == 0 ? 0 + 1e-5 : x));
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
    }
    const norm1 = Math.sqrt(
      vectorA.reduce((sum, feature) => sum + Math.pow(feature, 2), 0),
    );
    const norm2 = Math.sqrt(
      vectorB.reduce((sum, feature) => sum + Math.pow(feature, 2), 0),
    );
    // calculate normalized similarity
    let similarity = dotProduct / (norm1 * norm2);
    //similarity mapped back to [0,1] for percentage mapping
    similarity = (similarity + 1) / 2.0;
    // catch rounding errors
    similarity = similarity <= 1e-5 ? 0 : similarity;
    similarity = similarity >= 1 - 1e-5 ? 1 : similarity;
    return similarity;
  }

  /**
   * calculates euclidean distance by considering the relative distance in each dimenions
   * NOTE: (vector1 / weightVector) and (vector2 / weightVector) must be in range [-1,1]
   *
   * allows weighted vectors
   * @param vector1 of length n (may contain zero values)
   * @param vector2 of length n (may contain zero values)
   * @param weightVector of length n in range [1, inf]
   * @returns (1 - normalized euclidean distance) in range [0, 1] (because 0 is best for this method and we need to swap that)
   */
  static calculateNormalizedEucledianDistance(
    vector1: number[],
    vector2: number[],
    weightVector: number[],
  ) {
    let vectorA = [];
    let vectorB = [];
    // copy vectors
    vector1.forEach((x, i) => {
      vectorA[i] = x;
    });
    vector2.forEach((x, i) => {
      vectorB[i] = x;
    });

    // calculate maxDistance to normalize calculated euclidian distance
    let maxDistance = 0;
    weightVector.forEach((x, i) => {
      // x * 2 important here, because the max distance is the max distance (2) in the unweighted vectors [-1,1] multiplied with the weights
      maxDistance += Math.pow(x * 2, 2);
    });
    maxDistance = Math.sqrt(maxDistance);

    // calculate normalized euclidean distance with relative difference per dimension
    let eucledianDistance = 0;
    for (let i = 0; i < vector1.length; i++) {
      eucledianDistance += Math.pow(
        Math.max(vectorA[i], vectorB[i]) - Math.min(vectorA[i], vectorB[i]),
        2,
      );
    }
    // normalized to [0, 1]
    eucledianDistance = Math.sqrt(eucledianDistance);
    // return 1 - (...) because 0 means best
    return 1 - eucledianDistance / maxDistance;
  }

  /**
   * checks whether two vectors and weight are valid inputs for engine
   *
   * @param array1
   * @param array2
   * @param weight
   */
  private static checkValidArrays(
    array1: number[],
    array2: number[],
    weight: number[],
  ) {
    if (array1.length != array2.length || array1.length != weight.length) {
      throw new ConflictException('Arrays must have same length');
    }
    for (let i = 0; i < array1.length; i++) {
      if (isNaN(array1[i]) || isNaN(array2[i])) {
        throw new ConflictException('Arrays must contain only numbers');
      }
    }
    for (let i = 0; i < weight.length; i++) {
      if (isNaN(weight[i]) || weight[i] < 1) {
        throw new ConflictException(
          'Weights must contain only numbers greater or equal than 1',
        );
      }
    }
  }

  /*
  static test() {
    let input1 = [-1, -0.3333, 0];
    let input2 = [-1, 1, 1];
    //input1 = [1, 1, -1];
    //input2 = [1, 1, 1];
    let weight = [2, 2, 3];
    //let weight = [1, 1, 1];
    weight.forEach((w, i) => {
      input1[i] *= w;
      input2[i] *= w;
    });
    console.log('weighted: input1: ', input1, 'input2: ', input2);
    console.log('cosine: ', CRE.calculateCosineSimilarity(input1, input2));
    console.log(
      'eukld: ',
      CRE.normalizedEucledianDistance(input1, input2, weight),
    );
    console.log(
      ' final: ',
      CRE.calculateCosineSimilarityWithNormalizedEuclideanDistance(
        input1,
        input2,
        weight,
      ),
    );
  }
  */
}

/*
  private testEngineMethods() {
    let vector_1 = [-1, -1, -1, -1];
    let vector_2 = [1, 1, 1, 1];
    console.log(
      'vectors: [',
      vector_1 + '], [' + vector_2 + '], cosine similarity: ',
      Number(CRE.calculateCosineSimilarity(vector_1, vector_2).toFixed(3)) +
        ', eukl distance normalized: ',
      Number(CRE.normalizedEucledianDistance(vector_1, vector_2).toFixed(3)) +
        ', mean of both: ',
      Number(
        CRE.calculateCosineSimilarityWithNormalizedEuclideanDistance(
          vector_1,
          vector_2,
        ).toFixed(3),
      ),
    );
    vector_1 = [0, 0, 0, 0];
    vector_2 = [1, 1, 1, 1];
    console.log(
      'vectors: [',
      vector_1 + '], [' + vector_2 + '], cosine similarity: ',
      Number(CRE.calculateCosineSimilarity(vector_1, vector_2).toFixed(3)) +
        ', eukl distance normalized: ',
      Number(CRE.normalizedEucledianDistance(vector_1, vector_2).toFixed(3)) +
        ', mean of both: ',
      Number(
        CRE.calculateCosineSimilarityWithNormalizedEuclideanDistance(
          vector_1,
          vector_2,
        ).toFixed(3),
      ),
    );
    vector_1 = [0, 0, 0, 0];
    vector_2 = [0.5, 0.5, 0.5, 0.5];
    console.log(
      'vectors: [',
      vector_1 + '], [' + vector_2 + '], cosine similarity: ',
      Number(CRE.calculateCosineSimilarity(vector_1, vector_2).toFixed(3)) +
        ', eukl distance normalized: ',
      Number(CRE.normalizedEucledianDistance(vector_1, vector_2).toFixed(3)) +
        ', mean of both: ',
      Number(
        CRE.calculateCosineSimilarityWithNormalizedEuclideanDistance(
          vector_1,
          vector_2,
        ).toFixed(3),
      ),
    );
    vector_1 = [0, 1, 1, 1];
    vector_2 = [1, 1, 1, 1];
    console.log(
      'vectors: [',
      vector_1 + '], [' + vector_2 + '], cosine similarity: ',
      Number(CRE.calculateCosineSimilarity(vector_1, vector_2).toFixed(3)) +
        ', eukl distance normalized: ',
      Number(CRE.normalizedEucledianDistance(vector_1, vector_2).toFixed(3)) +
        ', mean of both: ',
      Number(
        CRE.calculateCosineSimilarityWithNormalizedEuclideanDistance(
          vector_1,
          vector_2,
        ).toFixed(3),
      ),
    );
    vector_1 = [-1, -0.5, 0.5, 1];
    vector_2 = [1, 1, 1, 1];
    console.log(
      'vectors: [',
      vector_1 + '], [' + vector_2 + '], cosine similarity: ',
      Number(CRE.calculateCosineSimilarity(vector_1, vector_2).toFixed(3)) +
        ', eukl distance normalized: ',
      Number(CRE.normalizedEucledianDistance(vector_1, vector_2).toFixed(3)) +
        ', mean of both: ',
      Number(
        CRE.calculateCosineSimilarityWithNormalizedEuclideanDistance(
          vector_1,
          vector_2,
        ).toFixed(3),
      ),
    );
    vector_1 = [-1, 0, 0, 1];
    vector_2 = [1, 1, 1, 1];
    console.log(
      'vectors: [',
      vector_1 + '], [' + vector_2 + '], cosine similarity: ',
      Number(CRE.calculateCosineSimilarity(vector_1, vector_2).toFixed(3)) +
        ', eukl distance normalized: ',
      Number(CRE.normalizedEucledianDistance(vector_1, vector_2).toFixed(3)) +
        ', mean of both: ',
      Number(
        CRE.calculateCosineSimilarityWithNormalizedEuclideanDistance(
          vector_1,
          vector_2,
        ).toFixed(3),
      ),
    );
  }
  */

/*
  private mapConnectorStringNumberToRequestNumber(
    requestValue: number,
    connectorValue: string,
    enumValues: string[],
    numberIntervalsForEnumValues: number[][],
  ) {
    if (enumValues.length != numberIntervalsForEnumValues.length)
      throw new Error(
        'enumValues and numberIntervalsForEnumValues must have same length',
      );
    // index = in which number interval for enum values is the request value
    let indexOfRequestValue = -1;
    for (let i = 0; i < numberIntervalsForEnumValues.length; i++) {
      if (
        requestValue >= numberIntervalsForEnumValues[i][0] &&
        requestValue <= numberIntervalsForEnumValues[i][1]
      ) {
        indexOfRequestValue = i;
      }
    }
    // index = which enum value is the connector value
    let indexOfConnectorValue = -1;
    for (let i = 0; i < enumValues.length; i++) {
      if (connectorValue == enumValues[i]) {
        indexOfConnectorValue = i;
      }
    }
    // partition of [-1, 1] in index steps
    const step = 2.0 / (enumValues.length - 1);
    const req = -1 + step * indexOfRequestValue;
    let con;
    // if request value is already at least as good as connector value, then full match
    if (indexOfRequestValue >= indexOfConnectorValue) {
      con = req;
    } else {
      // else calculate distance between request value and connector value
      con = -1 + step * indexOfConnectorValue;
    }
    return [req, con];
  }
  */

/*
   * calculates euclidean distance by considering the relative distance in each dimenions
   *
   * @param vector1 of length n with values in [-1,1] (may contain zero values)
   * @param vector2 of length n with values in [-1,1] (may contain zero values)
   * @returns 1 - normalized euclidean distance (because 0 is best in our case and we need to swap that)
   
  static normalizedEucledianDistanceOLD(vector1: number[], vector2: number[]) {
    let vectorA = [];
    let vectorB = [];
    //renormalize to [0,1] for use with euclidean distance
    for (let i = 0; i < vector1.length; i++) {
      vectorA[i] = (vector1[i] + 1) / 2;
      // assert non exact zero values here
      vectorA[i] = vectorA[i] == 0 ? 1e-5 : vectorA[i];
      vectorB[i] = (vector2[i] + 1) / 2;
      // assert non exact zero values here
      vectorB[i] = vectorB[i] == 0 ? 1e-5 : vectorB[i];
    }
    console.log('EUKLID: ', vectorA, vectorB);
    // calculate normalized euclidean distance with relative distance per dimension
    let eucledianDistance = 0;
    for (let i = 0; i < vector1.length; i++) {
      eucledianDistance += Math.pow(
        Math.max(vectorA[i], vectorB[i]) - Math.min(vectorA[i], vectorB[i]),
        2,
      );
    }
    eucledianDistance = Math.sqrt(eucledianDistance);
    console.log('EUKL Distance rooted: ', eucledianDistance);
    // return 1 - (...) because 0 means best
    return 1 - eucledianDistance / (1.0 * Math.sqrt(vector1.length));
  }
  */
