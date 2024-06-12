import React, { useState, useEffect } from 'react';
import CategoryAccordion from '../components/CategoryAccordion';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const KylesPage = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/src/assets/data/medialist.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
      })
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(data);
    } else {
      const queryLowerCase = query.toLowerCase();
      const filterData = (data) => {
        return Object.keys(data).reduce((acc, key) => {
          if (Array.isArray(data[key])) {
            acc[key] = data[key].filter((item) =>
              item.toLowerCase().includes(queryLowerCase)
            );
          } else if (typeof data[key] === 'object') {
            acc[key] = filterData(data[key]);
          }
          return acc;
        }, {});
      };
      setFilteredData(filterData(data));
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h1 className="text-center">Kyle's Page</h1>
          <SearchBar onSearch={handleSearch} />
          {searchQuery ? (
            <SearchResults searchQuery={searchQuery} data={filteredData} />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default KylesPage;
