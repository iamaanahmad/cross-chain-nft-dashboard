
import React, { useState, useEffect } from 'react';
import { Collection } from '../types';
import TraitChart from './TraitChart';
import { getMarketAnalysis } from '../services/geminiService';
import { ChainIcon } from './icons/ChainIcons';

interface CollectionDetailViewProps {
  collection: Collection;
  onClose: () => void;
}

const CollectionDetailView: React.FC<CollectionDetailViewProps> = ({ collection, onClose }) => {
  const [analysis, setAnalysis] = useState('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoadingAnalysis(true);
      const result = await getMarketAnalysis(collection);
      setAnalysis(result);
      setIsLoadingAnalysis(false);
    };

    fetchAnalysis();
  }, [collection]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-base-200 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slide-in-up relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex-shrink-0">
              <img src={collection.imageUrl} alt={collection.name} className="w-full rounded-lg shadow-lg" />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-text-primary mb-2">{collection.name}</h2>
              <div className="flex items-center gap-4 mb-4 text-text-secondary">
                <div className="flex items-center gap-2">
                  <ChainIcon chain={collection.chain} />
                  <span>{collection.chain}</span>
                </div>
                <span>•</span>
                <span>{collection.totalItems.toLocaleString()} items</span>
              </div>
              <div className="bg-base-300 rounded-lg p-4 mb-6">
                <p className="text-sm text-text-secondary">Floor Price</p>
                <p className="text-2xl font-bold text-text-primary">{collection.floorPrice} {collection.currency}</p>
              </div>
              
              <div className="space-y-2">
                 <h3 className="text-xl font-semibold text-text-primary mb-2">AI Market Analysis</h3>
                 <div className="bg-base-100 p-4 rounded-lg min-h-[80px] flex items-center justify-center">
                    {isLoadingAnalysis ? (
                       <div className="flex items-center gap-2 text-text-secondary">
                          <svg className="animate-spin h-5 w-5 text-brand-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Generating insights...</span>
                       </div>
                    ) : (
                       <p className="text-text-secondary italic">"{analysis}"</p>
                    )}
                 </div>
              </div>

            </div>
          </div>
          
          <div className="mt-8 border-t border-base-300 pt-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Trait Rarity</h3>
            <TraitChart collection={collection} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailView;
