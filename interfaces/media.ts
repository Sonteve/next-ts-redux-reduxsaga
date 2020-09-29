export interface MediaParams {
  itemCode: number;
  start: number;
  countPerPage: number;
}

export interface News {
  data: {
    ItemCode: string;
    Query: string;
    Title: string;
    Link: string;
    Press: string;
    Description: string;
    PubDate: string;
    Priority: number;
    IsDisplay: number;
  }[];
  meta: {
    countPerPage: number;
    startIndex: number;
    totalCount: number;
  };
}

export interface Youtube {
  data: {
    ItemCode: string;
    VideoID: string;
    Query: string;
    ChannelID: string;
    ChannelTitle: string;
    Title: string;
    Description: string;
    ThumbnailURL: string;
    PublishedAt: string;
    IsDisplay: number;
  }[];
  meta: {
    countPerPage: number;
    startIndex: number;
    totalCount: number;
  };
}
