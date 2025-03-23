import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import { useDebounce } from '../hooks/useDebounce';

function Search({ onSearch }) {
  const inputRef = useRef();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  const debouncedQuery = useDebounce(query, 600);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setError('');
  };

  const handleSuggestionClick = (location) => {
    onSearch(location.id);
    setQuery('');
    setSuggestions([]);
  };

  const handleSearchClick = () => {
    if (!query.trim()) {
      setError('Please enter a location name or ID');
      return;
    }

    const numericQuery = parseInt(query.trim());

    if (!isNaN(numericQuery)) {
      onSearch(numericQuery);
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/location/?name=${query}`)
        .then((res) => {
          if (res.data.results.length > 0) {
            onSearch(res.data.results[0].id);
          } else {
            setError('No locations found with that name');
          }
        })
        .catch(() => setError('No locations found with that name'));
    }

    setSuggestions([]);
    setQuery('');
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const numericQuery = parseInt(debouncedQuery.trim());

    if (!isNaN(numericQuery)) {
      setSuggestions([
        { id: numericQuery, name: `Go to location ID: ${numericQuery}` },
      ]);
      return;
    }

    axios
      .get(`https://rickandmortyapi.com/api/location/?name=${debouncedQuery}`)
      .then((res) => setSuggestions(res.data.results))
      .catch(() => setSuggestions([]));
  }, [debouncedQuery]);

  return (
    <div className="search">
      <div className="search__container">
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          className="search__input"
          placeholder="Enter location ID or Name"
        />
        <button
          onClick={handleSearchClick}
          className="search__button"
        >
          Search
        </button>
      </div>

      {error && <p className="search__error">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="search__suggestions">
          {suggestions.map((loc) => (
            <li
              key={loc.id}
              onClick={() => handleSuggestionClick(loc)}
              className="search__suggestion-item"
            >
              {loc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;