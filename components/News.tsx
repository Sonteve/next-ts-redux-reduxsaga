import React, { useState } from "react";
import NewsItem from "./NewsItem";
import { NewsData } from "../interfaces/news";
import styled from "styled-components";

const News = () => {
  const [news, setNews] = useState<NewsData[]>([
    {
      title: "뉴스기사 1",
      source: "언론사 1",
      createdAt: "20.00.01",
    },
    {
      title: "뉴스기사 2",
      source: "언론사 2",
      createdAt: "20.00.02",
    },
    {
      title: "뉴스기사 3",
      source: "언론사 3",
      createdAt: "20.00.03",
    },
  ]);

  return (
    <NewsWrapper>
      <NewsTT>인기뉴스</NewsTT>
      {news?.map((data, index) => (
        <NewsItem key={index} data={data} />
      ))}
    </NewsWrapper>
  );
};

export default News;

const NewsTT = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
`;

const NewsWrapper = styled.div`
  padding: 15px;
  background: #eee;
`;
