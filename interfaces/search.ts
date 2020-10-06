export interface SearchItem {
  ItemCode: string;
  Keyword: string;
}

export interface SearchCookie {
  Keyword: string;
  ItemCode: string;
  createdAt: string;
}

export interface ItemCodeMap {
  StdItemCode: string;
  ExaminItemCode: string;
  HskPrdlstCode: string;
}
