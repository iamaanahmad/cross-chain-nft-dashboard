
import React from 'react';
import { Collection } from '../types';
import { ChainIcon } from './icons/ChainIcons';

interface CollectionCardProps {
  collection: Collection;
  onSelect: (collection: Collection) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(collection)}
      className="bg-base-200 rounded-lg overflow-hidden shadow-lg hover:shadow-brand-secondary/50 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in"
    >
      <img src={collection.imageUrl} alt={collection.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-text-primary truncate group-hover:text-brand-accent transition-colors duration-200">{collection.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <ChainIcon chain={collection.chain} />
            <span className="text-sm font-semibold text-text-secondary">{collection.chain}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary">Floor</p>
            <p className="font-bold text-text-primary">{collection.floorPrice} {collection.currency}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
