
export enum Chain {
  Ethereum = 'Ethereum',
  Solana = 'Solana',
  Polygon = 'Polygon',
}

export interface Trait {
  trait_type: string;
  value: string;
}

export interface NFT {
  id: string;
  name: string;
  imageUrl: string;
  traits: Trait[];
}

export interface Collection {
  id: string;
  name: string;
  chain: Chain;
  floorPrice: number;
  currency: string;
  totalItems: number;
  imageUrl: string;
  nfts: NFT[];
}
