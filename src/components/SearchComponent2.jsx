import React, { useState } from "react";
import Fuse from "fuse.js";

// Fuse.js options
const options = {
  keys: ["title", "author", "category", "content", "description"],
  threshold: 0.3,
};

const SearchComponent2 = () => {
  // state to store data from API
  // state to store Fuse.js instance
  const [fuse, setFuse] = useState(null);
  // state to store search query
  const [searchQuery, setSearchQuery] = useState("");
  // state to store search results
  const [searchResults, setSearchResults] = useState([]);

  const getSlugs = async () => {
    const response = await fetch("/slugs.json");
    const data = await response.json();
    console.log(data.posts);
    setFuse(new Fuse(data.posts, options));
  };

  React.useEffect(() => {
    getSlugs();
  }, []);

  // Handle search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Perform search using Fuse.js
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = fuse.search(searchQuery);
    setSearchResults(results.map((res) => res.item));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {searchResults.map((item, index) => (
              <li key={index}>
                {item.title} by {item.author}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchComponent2;
