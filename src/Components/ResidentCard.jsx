import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useFetchApi } from '../hooks/useFetchApi';
import './ResidentCard.css';

function ResidentCard({ url }) {
  const { data: resident, request, loading } = useFetchApi();

  useEffect(() => {
    request(url);
  }, [url]);

  if (loading || !resident) return <p>Loading...</p>;

  const statusColors = {
    Alive: '#70a925',
    Dead: '#ff4c4c',
    unknown: '#999'
  };

  return (
    <motion.article
      className="resident"
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: `0 12px 24px ${statusColors[resident.status]}80`
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
    >
      <div className="resident__header">
        <img className="resident__image" src={resident.image} alt={resident.name} />
        <div className="resident__status">
          <div
            className="resident__circle"
            style={{ backgroundColor: statusColors[resident.status] }}
          ></div>
          <span>{resident.status}</span>
        </div>
      </div>
      <div className="resident__body">
        <h3 className="resident__name">{resident.name}</h3>
        <hr className="resident__hr" />
        <ul className="resident__info">
          <li><span className="resident__label">Species:</span> {resident.species}</li>
          <li><span className="resident__label">Origin:</span> {resident.origin.name}</li>
          <li><span className="resident__label">Episodes:</span> {resident.episode.length}</li>
        </ul>
      </div>
    </motion.article>
  );
}

export default ResidentCard;