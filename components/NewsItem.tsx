import React from "react";
import { NewsData } from "../interfaces/news";
import styled from "styled-components";

interface NewsItemProps {
  data: NewsData;
}

const NewsItem = ({ data }: NewsItemProps) => {
  return (
    <NewsItemWrapper>
      <NewsTitle>{data.title}</NewsTitle>
      <NewsDesc>
        <div>{data.source}</div>
        <div>{data.createdAt}</div>
      </NewsDesc>
    </NewsItemWrapper>
  );
};

export default NewsItem;

const NewsItemWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid #999;
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const NewsTitle = styled.div`
  flex: 4;
`;

const NewsDesc = styled.div`
  flex: 1;
`;
