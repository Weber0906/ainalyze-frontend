import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Search from '../Partials/Search';
import Particle from '../Particles';
import { auth } from '../../firebase';

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { exchangeId } = useParams();

  useEffect(() => {
    async function fetchStocks() {
      try {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const url = exchangeId ? `https://ainalyze-back.onrender.com/api/stocks/${exchangeId}` : 'https://ainalyze-back.onrender.com/api/stocks';
        const response = await axios.get(url, config);
        console.log(url)
        setStocks(response.data);
        setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
        setLoading(false);
      }
    }

    fetchStocks();
  }, [exchangeId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = stocks.filter((stock) =>
    stock.act_symbol.toLowerCase().includes(query.toLowerCase()) ||
    stock.company_name.toLowerCase().includes(query.toLowerCase())

    );
    setSearchResults(filteredResults)
  }

  const handleAinalyze = (act_symbol) => {
    navigate(`/ainalyze/${act_symbol}`);
  };


  if (loading) {
    return ( 
      <div>
        <Particle />
        <div>Loading...</div>;
      </div>
      );
  }

  return (
    <div id='stocks-container' className="d-flex flex-wrap mt-5">
      
      <Container className='w-100' >
        <Particle />
        <h1>Stocks</h1>
        <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch} />
        <Row >
          {(searchQuery.length === 0 ? stocks : searchResults).map((stock) => (
            <Col key={stock.id} xs={12} sm={8} md={6} lg={4} className="d-flex justify-content-center">
              <Card id='stock' key={stock.id} className="mx-2 my-2" style={{width:"300px", height:"300px"}}>
                <Card.Body >
                  <Card.Title>{stock.act_symbol}</Card.Title>
                  <Card.Text>{stock.company_name}</Card.Text>
                  <Card.Text>{stock.lastsale}</Card.Text>
                  <Button className="mx-2 my-2" variant="primary" onClick={() => handleAinalyze(stock.act_symbol)}>
                    Ainalyze!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Stocks;