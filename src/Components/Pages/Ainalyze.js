import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPolygonData, generatePrompt, analyzeData } from '../Api/Api';
import Particle from '../Particles';

const Analysis = () => {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const { act_symbol } = useParams();

  useEffect(() => {
    const fetchDataAndAnalyze = async () => {
      try {
        const data = await fetchPolygonData({ act_symbol });
        console.log(data)
        const prompt = generatePrompt(data);
        console.log(prompt)
        const analysis = await analyzeData(prompt);
        console.log(analysis)

        setData(data);
        setAnalysis(analysis);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data and analyzing:', error);
        setLoading(false);
      }
    };

    fetchDataAndAnalyze();
  }, [act_symbol]);

  if (loading) {
    return (
        <div>
          <Particle />
          <div>Loading...</div>;
        </div>
    )
        
        
  }

  if (!data || !analysis) {
    return <div>
        <Particle />
        <h3>
             Unable to fetch data and perform analysis.
        </h3>
       
        </div>;
  }

  return (
    <div>
        <Particle />
        <div className='mt-5'>
           <h1>Analysis Results</h1>
      <div id='analisys' className='d-flex w-75 mx-auto'>
        <p>{analysis}</p>
      </div> 
        </div>
      
    </div>
  );
};

export default Analysis;
