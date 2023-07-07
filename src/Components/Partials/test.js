

const sampleResponse = {
    "results": [
      { "id": 1, "title": "Title 1", "description": "Description 1" },
      { "id": 2, "title": "Title 2", "description": "Description 2" }
    ]
  };
  
  // Call the extraction function with the sample response
  const extractedData = extractDataFromResponse(sampleResponse, ['title', 'description'], 'results');
  
  // Log the extracted data to check if it matches your expectations
  console.log(extractedData);