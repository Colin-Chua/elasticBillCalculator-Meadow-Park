import _ from "lodash";

export const splitStringToArray = (str: string, symbol: string): string[] => {
    if (!str) return [];
    const result = str.split(symbol);
    result.forEach((val, index) => {
      result[index] = trimString(val);
    });
    return _.isEmpty(result) ? [] : result;
  };



  
/** Remove white space in string */
export const trimString = (str: string): string => {
    if (!str) return str;
    if (!_.isString(str)) return str;
    return str.replace(/^\s+|\s+$/g, "");
  };


