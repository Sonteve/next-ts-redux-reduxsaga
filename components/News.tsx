import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { NewsData } from "../interfaces/news";
import styled from "styled-components";
import { newsData } from "../utils/dummy";

const News = () => {
  const [news, setNews] = useState<NewsData[]>();

  useEffect(() => {
    setNews(newsData);
  }, []);

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
