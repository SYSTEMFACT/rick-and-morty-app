import './LocationInfo.css';

function LocationInfo({ location }) {
  return (
    <section className="location-info">
      <h2 className="location-info__name">{location.name}</h2>
      <div className="location-info__details">
        <div className="location-info__detail">
          <span className="location-info__label">Type:</span>
          <span>{location.type}</span>
        </div>
        <div className="location-info__detail">
          <span className="location-info__label">Dimension:</span>
          <span>{location.dimension}</span>
        </div>
        <div className="location-info__detail">
          <span className="location-info__label">Population:</span>
          <span>{location.residents.length}</span>
        </div>
      </div>
    </section>
  );
}

export default LocationInfo;

