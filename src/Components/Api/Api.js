import axios from 'axios';
import { extractDataFromResponse } from '../Partials/Extractdata';

const POLYGON_API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;


export const fetchPolygonData = async ({ act_symbol }) => {
    try {
      const tickerDetailsUrl = `https://api.polygon.io/v3/reference/tickers/${act_symbol}?apiKey=${POLYGON_API_KEY}`;
      console.log(tickerDetailsUrl)
      const aggregatedDataUrl = `https://api.polygon.io/v2/aggs/ticker/${act_symbol}/prev?adjusted=true&apiKey=${POLYGON_API_KEY}`;
      console.log(aggregatedDataUrl)
      const newsUrl = `https://api.polygon.io/v2/reference/news?ticker=${act_symbol}&apiKey=${POLYGON_API_KEY}`;
      console.log(newsUrl)
  
      const delayBetweenRequests = 5000; // Adjust this value as per your rate limit
  
      const [newsResponse, aggregatedDataResponse, tickerDetailsResponse] = await Promise.all([
        fetchWithTimeout(tickerDetailsUrl, delayBetweenRequests),
        fetchWithTimeout(newsUrl, delayBetweenRequests),
        fetchWithTimeout(aggregatedDataUrl, delayBetweenRequests),
      ]);
  
      const tickerDetails = await tickerDetailsResponse.json();
      const aggregatedData = await aggregatedDataResponse.json();
      const newsData = await newsResponse.json();
  
      // Extract the necessary information from the responses
      const extractedTickerDetails = extractDataFromResponse(tickerDetails, ['market_cap', 'name', 'total_employees'], 'results');
      const extractedAggregatedData = extractDataFromResponse(aggregatedData,['c', 'h', 'l', 'n', 'o', 't', 'v', 'vw'], 'results');
      const extractedNewsData = extractDataFromResponse(newsData, ['title', 'description'], 'results');
      
      

      console.log(extractedNewsData)
      console.log(extractedAggregatedData)
      console.log(extractedTickerDetails)
  
      return {
        tickerDetails: extractedTickerDetails,
        aggregatedData: extractedAggregatedData,
        news: extractedNewsData,
        
      };
    } catch (error) {
      console.error('Error fetching data from Polygon API:', error);
      throw error;
    }
  };



  
  const fetchWithTimeout = (url, timeout) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, timeout);
  
      fetch(url)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  export const generatePrompt = (data) => {
    console.log(data)
    const jsonData = JSON.stringify(data)
    const prompt = `${jsonData} - Please provide additional insights and analysis based on the above information`;

      console.log(prompt)
  
    return prompt;
  };

export const analyzeData = async (prompt) => {
  try {
    const openaiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await axios.post(openaiUrl, {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });


    const analysis = response.data.choices[0].message.content;
    return analysis;
  } catch (error) {
    console.error('Error analyzing data with OpenAI:', error);
    throw error;
  }
};

