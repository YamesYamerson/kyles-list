import React, { useState, useEffect } from 'react';
import { Accordion, Container, Row, Col } from 'react-bootstrap';
import CategoryAccordion from '../components/CategoryAccordion';
import SearchBar from '../components/SearchBar';

const KylesPage = () => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/src/assets/data/medialist.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  const filterData = (data) => {
    const query = searchQuery.toLowerCase();
    return Object.keys(data).reduce((acc, key) => {
      if (Array.isArray(data[key])) {
        acc[key] = data[key].filter((item) =>
          item.toLowerCase().includes(query)
        );
      } else if (typeof data[key] === 'object') {
        acc[key] = filterData(data[key]);
      }
      return acc;
    }, {});
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const filteredData = filterData(data);

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col>
          <h1>Kyle's Page</h1>
          <SearchBar onSearch={setSearchQuery} />
          <Accordion defaultActiveKey="0">
            {Object.keys(filteredData).map((category) =>
              typeof filteredData[category] === 'object' &&
              !Array.isArray(filteredData[category]) ? (
                Object.keys(filteredData[category]).map((subCategory) => (
                  <CategoryAccordion
                    key={subCategory}
                    title={`${category} - ${subCategory}`}
                    items={filteredData[category][subCategory]}
                  />
                ))
              ) : (
                <CategoryAccordion
                  key={category}
                  title={category}
                  items={filteredData[category]}
                />
              )
            )}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default KylesPage;
