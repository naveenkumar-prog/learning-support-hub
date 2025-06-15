import React, { useEffect, useState } from 'react';
import { fetchSupportProviders } from '../../utils/fetchProviders';
import ProviderCard from '../../components/ProviderCard/ProviderCard';
import './ProviderList.css';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 3;

  // Fetch data on mount
  useEffect(() => {
    fetchSupportProviders().then((data) => {
      setProviders(data);
      setLoading(false);
    });
  }, []);

  // Filter providers by search term
  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove titles for sorting consistency
  const removeTitlePrefix = (name) =>
    name.replace(/^(dr\.?|mr\.?|ms\.?|mrs\.?)\s*/i, '').trim();

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = removeTitlePrefix(a.name).toLowerCase();
      const nameB = removeTitlePrefix(b.name).toLowerCase();
      return nameA.localeCompare(nameB);
    }

    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }

    return 0;
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedProviders.length / itemsPerPage));
  const paginatedProviders = sortedProviders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset current page if it exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="provider-list-container">
      <h1>Find the Right Support for You</h1>

      <input
        type="text"
        placeholder="Search by name or specialization..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="search-input"
      />

      <select
        className="sort-select"
        onChange={(e) => setSortBy(e.target.value)}
        value={sortBy}
      >
        <option value="name">Sort by Name</option>
        <option value="rating">Sort by Rating</option>
      </select>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="provider-grid">
            {paginatedProviders.length > 0 ? (
              paginatedProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))
            ) : (
              <p className="no-providers">No providers found.</p>
            )}
          </div>

          {/* Pagination */}
          {filteredProviders.length > 0 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProviderList;
