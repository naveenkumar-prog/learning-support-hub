import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSupportProviders } from '../../utils/fetchProviders';
import './ProviderDetail.css';

const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchSupportProviders()
      .then((data) => {
        const selectedProvider = data.find((p) => p.id.toString() === id);
        if (selectedProvider) {
          setProvider(selectedProvider);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} style={{ color: 'gold' }}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" style={{ color: 'gold' }}>☆</span>);
    }

    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} style={{ color: 'gray' }}>★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Provider Not Found</h2>
        <p>Sorry, we couldn't find a provider with ID <strong>{id}</strong>.</p>
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="provider-detail-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to List
      </button>

      <h1>{provider.name}</h1>

      <p><strong>Specialization:</strong> {provider.specialization}</p>
      <p><strong>Location:</strong> {provider.location}</p>

      <p>
        <strong>Rating:</strong>{' '}
        <span className="rating-stars">{renderStars(provider.rating)}</span> ({provider.rating})
      </p>

      <p>
        <strong>Contact Email:</strong>{' '}
        <a href={`mailto:${provider.contactEmail}`} className="link">
          {provider.contactEmail}
        </a>
      </p>

      <p><strong>Phone Number:</strong> {provider.phoneNumber}</p>
      <p><strong>Description:</strong></p>
      <p>{provider.longDescription}</p>
    </div>
  );
};

export default ProviderDetail;
