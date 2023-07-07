export function extractDataFromResponse(response, keys = [], path = '') {
    const innerResults = Array.isArray(response.results) ? response.results : [response.results];
    
    const extractedValues = innerResults.map((item) => {
      const extractedData = {};
      keys.forEach((key) => {
        if (item.hasOwnProperty(key)) {
          extractedData[key] = item[key];
        }
      });
      return extractedData;
    });
  
    return extractedValues;
  }

  