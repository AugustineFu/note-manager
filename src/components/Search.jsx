import React from 'react';
import SearchIcon from '@mui/icons-material/Search';


const Search = ({ setSearchQuery }) => {
  return (
    <div className="search">
      <SearchIcon/>
      <input
        type="text"
        placeholder="搜索笔记"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchInput"
      />
    </div>
  );
};

export default Search;