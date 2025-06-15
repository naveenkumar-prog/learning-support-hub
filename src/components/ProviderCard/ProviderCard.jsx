import React from 'react';
import { Link } from 'react-router-dom';
import './ProviderCard.css';

const ProviderCard = ({ provider }) => {
  return (
    <Link to={`/providers/${provider.id}`} className="provider-card">
      <h3>{provider.name}</h3>
      <p>
        <strong>Specialization:</strong> {provider.specialization}
      </p>
      <p>
        <strong>Location:</strong> {provider.location}
      </p>
      <p>
        <strong>Rating:</strong> ⭐ {provider.rating}
      </p>
    </Link>
  );
};

export default ProviderCard;
