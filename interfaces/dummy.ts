interface WholePrice {
  kind: string;
  unit: string;
  high: number | null;
  middle: number | null;
}

export interface WholePriceDatas {
  recent: WholePrice[];
  prev: WholePrice[];
}

interface RetailPrice {
  kind: string;
  unit: string;
  high: {
    min: number;
    max: number;
  } | null;
  middle: {
    min: number;
    max: number;
  } | null;
}

export interface RetailPriceDatas {
  recent: RetailPrice[];
  prev: RetailPrice[];
}
