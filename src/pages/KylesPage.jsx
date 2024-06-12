import React, { useState, useEffect } from 'react';
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
    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h1 className="text-center">Kyle's Page</h1>
          <SearchBar onSearch={setSearchQuery} />
          <div className="accordion" id="accordionExample">
            {Object.keys(filteredData).map((category, index) =>
              typeof filteredData[category] === 'object' &&
              !Array.isArray(filteredData[category]) ? (
                Object.keys(filteredData[category]).map((subCategory, subIndex) => (
                  <CategoryAccordion
                    key={`${index}-${subIndex}`}
                    id={`${index}-${subIndex}`}
                    title={`${category} - ${subCategory}`}
                    items={filteredData[category][subCategory]}
                  />
                ))
              ) : (
                <CategoryAccordion
                  key={index}
                  id={index}
                  title={category}
                  items={filteredData[category]}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KylesPage;
