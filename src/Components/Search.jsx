import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

function Search({ onSearch }) {
  const inputRef = useRef();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  // Actualiza el valor del input
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setError('');
  };

  // Cuando el usuario hace clic en una sugerencia
  const handleSuggestionClick = (location) => {
    onSearch(location.id);
    setQuery('');
    setSuggestions([]);
  };

  // Cuando hace clic en el botón de búsqueda
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

  // Debounce para sugerencias automáticas
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      const numericQuery = parseInt(query.trim());
      if (!isNaN(numericQuery)) {
        setSuggestions([
          { id: numericQuery, name: `Go to location ID: ${numericQuery}` },
        ]);
        return;
      }

      axios
        .get(`https://rickandmortyapi.com/api/location/?name=${query}`)
        .then((res) => setSuggestions(res.data.results))
        .catch(() => setSuggestions([]));
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

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