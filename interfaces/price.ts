export interface WholePrice {
  ExaminDate: string;
  ExaminItemName: string;
  ExaminItemCode: string;
  ExaminSpeciesName: string;
  ExaminSpeciesCode: string;
  ExaminUnitName: string;
  ExaminUnit: string;
  ExaminGradeName: string;
  ExaminGradeCode: string;
  Price: number;
}

export interface RetailPrice {
  ExaminDate: string;
  ExaminGradeCode: string;
  ExaminGradeName: string;
  ExaminItemCode: string;
  ExaminItemName: string;
  ExaminSpeciesCode: string;
  ExaminSpeciesName: string;
  ExaminUnit: string;
  ExaminUnitName: string;
  MaxPrice: number;
  MinPrice: number;
}

export interface ChartData {
  StdItemCode: string;
  RangeLabel: string[];
  GraphLine: {
    ExaminItemName: string;
    ExaminSpeciesName: string;
    ExaminUnitName: string;
    ExaminGradeName: string;
    PriceType: string;
    GraphData: {
      X: string;
      Y: number;
    }[];
  }[];
}

export interface AuctionVolumeData {
  StdItemCode: string;
  RangeLabel: string[];
  GraphLine: {
    StdItemName: string;
    StdSpeciesName: string;
    StdGradeName: string;
    GraphData: {
      X: string;
      Y: string;
    }[];
  }[];
}
