import React, { useState, useEffect } from 'react';
import CategoryAccordion from '../components/CategoryAccordion';
import SearchBar from '../components/SearchBar';

const KylesPage = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/medialist.json')
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

  const groupByInitialLetterRange = (items) => {
    const ranges = [
      { start: 'A', end: 'D' },
      { start: 'E', end: 'H' },
      { start: 'I', end: 'L' },
      { start: 'M', end: 'P' },
      { start: 'Q', end: 'T' },
      { start: 'U', end: 'Z' }
    ];
    return ranges.reduce((acc, range) => {
      const key = `${range.start}-${range.end}`;
      acc[key] = items.filter(
        (item) => item.charAt(0).toUpperCase() >= range.start && item.charAt(0).toUpperCase() <= range.end
      );
      return acc;
    }, {});
  };

  if (!filteredData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h1 className="text-center">Kyle's Page</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="accordion" id="accordionExample">
            {Object.keys(filteredData).map((category, index) => {
              if (Array.isArray(filteredData[category])) {
                const items = filteredData[category];
                if (items.length > 50) {
                  const groupedItems = groupByInitialLetterRange(items);
                  return (
                    <CategoryAccordion
                      key={category}
                      id={`category-${index}`}
                      title={category}
                      subCategories={groupedItems}
                    />
                  );
                } else {
                  return (
                    <CategoryAccordion
                      key={category}
                      id={`category-${index}`}
                      title={category}
                      items={items}
                    />
                  );
                }
              } else if (typeof filteredData[category] === 'object') {
                return Object.keys(filteredData[category]).map((subCategory, subIndex) => {
                  const items = filteredData[category][subCategory];
                  if (items.length > 50) {
                    const groupedItems = groupByInitialLetterRange(items);
                    return (
                      <CategoryAccordion
                        key={`${category}-${subCategory}`}
                        id={`subcategory-${index}-${subIndex}`}
                        title={`${category} - ${subCategory}`}
                        subCategories={groupedItems}
                      />
                    );
                  } else {
                    return (
                      <CategoryAccordion
                        key={`${category}-${subCategory}`}
                        id={`subcategory-${index}-${subIndex}`}
                        title={`${category} - ${subCategory}`}
                        items={items}
                      />
                    );
                  }
                });
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KylesPage;
