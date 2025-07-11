import React, { useState, useRef, useEffect } from 'react';
import { Collection } from '../types';

interface ExportButtonProps {
  data: Collection[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const triggerDownload = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = ['Collection Name', 'Chain', 'Floor Price', 'Currency', 'Total Items', 'NFT ID', 'NFT Name', 'Trait Type', 'Trait Value'];
    
    const rows = data.flatMap(collection => 
      collection.nfts.flatMap(nft => 
        nft.traits.map(trait => [
          `"${collection.name}"`,
          collection.chain,
          collection.floorPrice,
          collection.currency,
          collection.totalItems,
          nft.id,
          `"${nft.name}"`,
          `"${trait.trait_type}"`,
          `"${trait.value}"`
        ].join(','))
      )
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    triggerDownload(csvContent, 'nft_collections_export.csv', 'text/csv;charset=utf-8;');
    setIsOpen(false);
  };

  const exportToJSON = () => {
    if (data.length === 0) return;
    const jsonContent = JSON.stringify(data, null, 2);
    triggerDownload(jsonContent, 'nft_collections_export.json', 'application/json;charset=utf-8;');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        disabled={data.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-brand-secondary hover:bg-brand-accent text-white font-semibold rounded-md transition-colors duration-200 disabled:bg-base-300 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-base-200 ring-1 ring-base-300 ring-opacity-5 z-10 animate-fade-in">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); exportToCSV(); }}
              className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-base-300"
              role="menuitem"
            >
              Export as CSV
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); exportToJSON(); }}
              className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-base-300"
              role="menuitem"
            >
              Export as JSON
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
