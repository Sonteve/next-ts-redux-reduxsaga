export interface T3ExportData {
  StdItemCode: string;
  StdItemName: string;
  HskPrdlstCode: string;
  BaseDate: string;
  ConvertedWeight: string;
}

export interface T3ImportData {
  StdItemCode: string;
  StdItemName: string;
  HskPrdlstCode: string;
  BaseDate: string;
  ConvertedWeight: string;
}

export interface T3AuctionVolumeData {
  AuctionDate: string;
  StdItemName: string;
  StdItemCode: string;
  AccQy: string;
}
