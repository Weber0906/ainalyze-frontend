import React, { useEffect, useState } from 'react';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Search from '../Partials/Search';
import Particle from '../Particles';


function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExchanges() {
      try {
        const response = await fetch('http://localhost:5001/api/exchanges');
        const data = await response.json();
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
        setLoading(false);
      }
    }

    fetchExchanges();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = exchanges.filter((exchange) =>
    exchange.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults)
  }


  if (loading) {
    return ( 
    <div>
      <Particle />
      <div>Loading...</div>;
    </div>
    )
    
  }

  const handleChooseStock = (exchangeId) => {
    navigate(`/stocks/${exchangeId}`);
  };


  return (
    <div id='exchanges-container' className="d-flex flex-wrap align-items-center justify-content-center mt-5">
      
      <Container >
        <Particle />
        <h1>Exchanges</h1>
        <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch} />
        <Row className="w-100 align-items-center justify-content-center">
          {(searchQuery.length === 0 ? exchanges : searchResults).map((exchange) => (
            <Col key={exchange.id} xs={10} sm={8} md={6} lg={4} className="d-flex">
              <Card className="mx-2 my-2 w-100">
                <Card.Body>
                  <Card.Title>{exchange.name}</Card.Title>
                  <Button
                    className="mx-2 my-2"
                    variant="primary"
                    onClick={() => handleChooseStock(exchange.id)}
                  >
                    Choose stock
                  </Button>
                  <Button
                    className="mx-2 my-2"
                    variant="primary"
                    onClick={() => window.open(exchange.url, '_blank')}
                  >
                    Visit Webpage
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

export default Exchanges;