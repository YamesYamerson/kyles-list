import React from 'react';

const SearchResults = ({ searchQuery, data }) => {
  const renderResults = (data) => {
    const results = [];
    Object.keys(data).forEach((category) => {
      if (Array.isArray(data[category])) {
        data[category].forEach((item) => {
          results.push(<li key={item}>{item}</li>);
        });
      } else if (typeof data[category] === 'object') {
        Object.keys(data[category]).forEach((subCategory) => {
          data[category][subCategory].forEach((item) => {
            results.push(<li key={item}>{item}</li>);
          });
        });
      }
    });
    return results;
  };

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      <ul>{renderResults(data)}</ul>
    </div>
  );
};

export default SearchResults;
