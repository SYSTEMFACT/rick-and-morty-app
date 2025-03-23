import { useState, useEffect } from 'react';
import Hero from './Components/Hero';
import Search from './Components/Search';
import LocationInfo from './Components/LocationInfo';
import ResidentsList from './Components/ResidentsList';
import { setRamdomNumber } from './utils';
import { useFetchApi } from './hooks/useFetchApi';
import './index.css';

const baseUrl = 'https://rickandmortyapi.com/api/location';

function App() {
  const [locationId, setLocationId] = useState(setRamdomNumber());
  const { data: location, request, loading, error } = useFetchApi();

  useEffect(() => {
    request(`${baseUrl}/${locationId}`);
  }, [locationId]);

  const handleSearch = (id) => {
    if (id < 1 || id > 126) {
      alert('Please enter a valid location ID between 1 and 126');
    } else {
      setLocationId(id);
    }
  };

  return (
    <div className="app-container">
      <Hero />
      <Search onSearch={handleSearch} />

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && location && (
        <>
          <LocationInfo location={location} />
          <ResidentsList residents={location.residents} />
        </>
      )}
    </div>
  );
}

export default App;

