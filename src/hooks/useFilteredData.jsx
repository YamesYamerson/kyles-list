import { useState, useEffect } from 'react';

const useFilteredData = (data) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

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

  return { filteredData, searchQuery, handleSearch };
};

export default useFilteredData;
