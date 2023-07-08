import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Search from '../Partials/Search';
import Particle from '../Particles';
import { auth } from '../../firebase';


function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExchanges() {
      try {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get('http://localhost:5001/api/exchanges', config);
          console.log(response)
          setExchanges(response.data);
          setLoading(false);
        }
        
        
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
      <div>Loading...</div>
    </div>
    )
    
  }

  const handleChooseStock = (exchangeId) => {
    navigate(`/stocks/${exchangeId}`);
  };


  return (
    <div id='exchanges-container' className="d-flex flex-wrap mt-5">
      <Container className='w-100'>
        <Particle />
        <h1>Exchanges</h1>
        <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch} />
        <Row >
          {(searchQuery.length === 0 ? exchanges : searchResults).map((exchange) => (
            <Col key={exchange.id} xs={12} sm={8} md={6} lg={4} className="d-flex justify-content-center">
              <Card id='exchange' className="mx-2 my-2 w-100">
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