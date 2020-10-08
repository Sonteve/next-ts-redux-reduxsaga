export interface RecentWholePrice {
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

export interface LastYearWholePrice {
  examinDate: string;
  examinGradeCode: string;
  examinGradeName: string;
  examinItemCode: string;
  examinItemName: string;
  examinSpeciesCode: string;
  examinSpeciesName: string;
  examinUnit: string;
  examinUnitName: string;
  price: number;
}
