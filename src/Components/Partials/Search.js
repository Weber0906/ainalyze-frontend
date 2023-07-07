import React from "react";
import { TextField } from "@mui/material";


function Search({ searchQuery, setSearchQuery, handleSearch }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    handleSearch(event.target.value);
    };

  return (
    <div className="d-flex w-50 mx-auto">
      <TextField
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;