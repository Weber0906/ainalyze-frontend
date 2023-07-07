import React, { useEffect, useState } from 'react';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Search from '../Partials/Search';
import Particle from '../Particles';

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
        const url = exchangeId ? `http://localhost:5001/api/stocks/${exchangeId}` : 'http://localhost:5001/api/stocks';
        const response = await fetch(url);
        console.log(url)
        const data = await response.json();
        setStocks(data);
        setLoading(false);
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
    ( 
      <div>
        <Particle />
        <div>Loading...</div>;
      </div>
      );
  }

  return (
    <div id='stocks-container' className="d-flex flex-wrap align-items-center justify-content-center mt-5">
      
      <Container >
        <Particle />
        <h1>Stocks</h1>
        <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch} />
        <Row className="w-100 align-items-center justify-content-center">
          {(searchQuery.length === 0 ? stocks : searchResults).map((stock) => (
            <Col key={stock.id} xs={12} sm={8} md={6} lg={4} className="d-flex">
              <Card key={stock.id} className="mx-2 my-2" style={{width:"300px", height:"300px"}}>
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