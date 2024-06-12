import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search items..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
