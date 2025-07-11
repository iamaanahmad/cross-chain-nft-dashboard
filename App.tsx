import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Collection } from './types';
import { getCollections } from './services/mockNftService';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ExportButton from './components/ExportButton';
import CollectionCard from './components/CollectionCard';
import CollectionDetailView from './components/CollectionDetailView';

const App: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCollections = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getCollections();
      setCollections(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to fetch collections. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const filteredCollections = useMemo(() => {
    return collections.filter(collection =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [collections, searchQuery]);

  const handleSelectCollection = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  const handleCloseDetailView = () => {
    setSelectedCollection(null);
  };

  const renderContent = () => {
    if (isLoading && collections.length === 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-base-200 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-400 py-10">{error}</div>;
    }

    if (filteredCollections.length === 0 && !isLoading) {
      return <div className="text-center text-text-secondary py-10">No collections found for "{searchQuery}".</div>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCollections.map(collection => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onSelect={handleSelectCollection}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-100 text-text-primary font-sans">
      <Header />
      <main className="container mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div className="w-full sm:w-auto sm:flex-grow sm:max-w-xs">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex items-center gap-2">
             <button
                onClick={fetchCollections}
                disabled={isLoading}
                title="Refresh Data"
                className="p-2 bg-base-200 hover:bg-base-300 border border-base-300 text-text-secondary font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
                aria-label="Refresh data"
              >
                <svg className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            <ExportButton data={filteredCollections} />
          </div>
        </div>
         {lastUpdated && (
            <div className="text-right text-xs text-text-secondary mb-4">
              Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          )}
        {renderContent()}
      </main>
      {selectedCollection && (
        <CollectionDetailView
          collection={selectedCollection}
          onClose={handleCloseDetailView}
        />
      )}
    </div>
  );
};

export default App;