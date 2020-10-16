export interface ImportExportData {
  StdItemCode: string;
  RangeLabel: string[];
  GraphLine: {
    GraphData: {
      X: string;
      Y: string;
    }[];
    HskPrdlstCode: string;
    TradeType: string;
  }[];
}
