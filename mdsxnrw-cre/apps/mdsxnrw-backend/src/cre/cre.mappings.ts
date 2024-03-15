export class Mappings {
  // Mapping Functions

  // These Methods always return Pair [RequestMappingValue, ConnectorMappingValue] with both values in range [-1, 1]
  // These Methods are always called with at least request vector value and connector vector value

  /**
   * Full Match if both arrays share at least one element, else no match
   *
   * @param requestValueArray string array from request
   * @param connectorValueArray string array from connector
   * @returns [requestMappingValue, connectorMappingValue] in range [-1, 1]
   */
  static mapOneInBothArrays(
    requestValueArray: string[],
    connectorValueArray: string[],
  ) {
    for (let i = 0; i < requestValueArray.length; i++) {
      if (connectorValueArray.includes(requestValueArray[i])) {
        // full match
        return [-1, -1];
      }
    }
    // no match => max distance
    return [-1, 1];
  }

  /**
   * Full match if all elements of requestValueArray are in connectorValueArray (requestArray subset of connectorArray)
   * otherwise no match
   *
   * @param requestValueArray string array from request
   * @param connectorValueArray string array from connector
   * @returns [requestMappingValue, connectorMappingValue] in range [-1, 1]
   */
  static mapSubsetOfArray(
    requestValueArray: string[],
    connectorValueArray: string[],
  ) {
    for (let i = 0; i < requestValueArray.length; i++) {
      if (!connectorValueArray.includes(requestValueArray[i])) {
        // no match => max distance
        return [-1, 1];
      }
    }
    // full match if requestValueArray is a subset of connectorValueArray
    return [-1, -1];
  }

  /**
   * Maps request value and connector value from ordered enum values to [-1, 1].
   * Full match if request value >= connector value. Otherwise no match.
   * Assumes that a greater enum index is better valued !
   *
   * @param requestValue value from request
   * @param connectorValue value from connector
   * @param enumValues all possible enum values (must be ordered in ascending order; greater index means better value !)
   * @returns [requestMappingValue, connectorMappingValue] in range [-1, 1]]
   */
  static mapDownwardCompatible(
    requestValue: string,
    connectorValue: string,
    enumValues: string[],
  ) {
    // assert both values are in enumValues
    if (
      !enumValues.includes(requestValue) ||
      !enumValues.includes(connectorValue)
    ) {
      throw new Error('Both values must be in enumValues');
    }
    let indexOfRequestValue = -1;
    let indexOfConnectorValue = -1;
    for (let i = 0; i < enumValues.length; i++) {
      if (requestValue == enumValues[i]) {
        indexOfRequestValue = i;
      }
      if (connectorValue == enumValues[i]) {
        indexOfConnectorValue = i;
      }
    }
    // if request value is already at least as good as connector value, then full match
    if (indexOfRequestValue >= indexOfConnectorValue) {
      // full match
      return [-1, -1];
    }
    // else no match
    return [-1, 1];
  }

  /**
   * Maps request value and connector value from ordered enum values to [-1, 1]. Uses normalized distance between request value and connector value if request value < connector value.
   * Assumes that a greater enum index is better valued !
   *
   * Differences with mapDownwardCompatible: if connectorValue > requestValue then it may match to some extend (stepwise distance)
   *
   * @param requestValue value from request
   * @param connectorValue value from connector
   * @param enumValues all possible enum values (must be ordered in ascending order; greater index means better value !)
   * @returns [requestMappingValue, connectorMappingValue] in range [-1, 1]]
   */
  static mapEnumSteps(
    requestValue: string,
    connectorValue: string,
    enumValues: string[],
  ) {
    // assert both values are in enumValues
    if (
      !enumValues.includes(requestValue) ||
      !enumValues.includes(connectorValue)
    ) {
      throw new Error('Both values must be in enumValues');
    }
    let indexOfRequestValue = -1;
    let indexOfConnectorValue = -1;
    for (let i = 0; i < enumValues.length; i++) {
      if (requestValue == enumValues[i]) {
        indexOfRequestValue = i;
      }
      if (connectorValue == enumValues[i]) {
        indexOfConnectorValue = i;
      }
    }
    // if request value is already at least as good as connector value, then full match
    if (indexOfRequestValue >= indexOfConnectorValue) {
      // full match
      return [-1, -1];
    }
    // else use distance between request value and connector value normalized to [-1, 1]
    // partition of [-1, 1] in index steps
    const step = 2.0 / (enumValues.length - 1);
    const req = -1 + step * indexOfRequestValue;
    const con = -1 + step * indexOfConnectorValue;
    return [req, con];
  }

  /**
   * Maps request value and connector value to [-1, 1] if exact match (requestValue == connectorValue)
   *
   * @param requestValue
   * @param connectorValue
   * @returns [requestMappingValue, connectorMappingValue] in range [-1, 1]]
   */
  static mapExactMatch(requestValue: string, connectorValue: string) {
    if (requestValue == connectorValue) {
      return [-1, -1];
    } else {
      return [-1, 1];
    }
  }
}
