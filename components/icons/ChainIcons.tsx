
import React from 'react';
import { Chain } from '../../types';

export const EthereumIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.69l-6 3.99V17.3l6 4.02 6-4.02V6.68L12 2.69zm-4.5 5.09l4.5-3 4.5 3v5.45l-4.5 3-4.5-3V7.78z" />
  </svg>
);

export const SolanaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.81 3.99c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S8.31 6.32 8.31 5.5c0-.83-.68-1.51-1.5-1.51zM17.19 3.99c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.68 1.5-1.51s-.68-1.5-1.5-1.5zM12 9.01c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S13.5 11.34 13.5 10.5c0-.83-.68-1.5-1.5-1.5zM6.81 15.01c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S8.31 17.34 8.31 16.5c0-.83-.68-1.5-1.5-1.5zM17.19 15.01c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.68 1.5-1.5s-.68-1.5-1.5-1.5z" />
    <path d="M4 3h16v18H4z" fill="none"/>
  </svg>
);

export const PolygonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.06 8.28L3 12l3.06 3.72 3.96-2.28L6.06 8.28zM9.72 17.4l3.96 2.28 3.06-3.72-3.96-2.28-3.06 3.72zm.3-8.84L12 3l1.98 5.56-2.94 1.7-1.02-2.7zM14.28 13.44l3.96 2.28L21 12l-2.76-3.28-3.96 2.28z"/>
  </svg>
);

export const ChainIcon: React.FC<{ chain: Chain; className?: string }> = ({ chain, className = "w-5 h-5" }) => {
  switch (chain) {
    case Chain.Ethereum:
      return <EthereumIcon className={`${className} text-sky-400`} />;
    case Chain.Solana:
      return <SolanaIcon className={`${className} text-fuchsia-500`} />;
    case Chain.Polygon:
      return <PolygonIcon className={`${className} text-purple-400`} />;
    default:
      return null;
  }
};
