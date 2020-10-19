import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "../reducers";
import { RecentNewsData } from "../interfaces/search";

const RecentNews = () => {
  const { recentNewsList } = useSelector(({ search }: RootState) => search);

  return (
    <NewsBlock>
      <LazyLoad height={212}>
        {recentNewsList?.map((data: RecentNewsData, index: number) => (
          <NewsItemWrapper key={index} target="_blank" href={data.link}>
            <NewsTitle>{data.title}</NewsTitle>
            <NewsDesc>
              <div>{data.author}</div>
              <div>{moment(data.pubDate).format("YY.MM.DD")}</div>
            </NewsDesc>
          </NewsItemWrapper>
        ))}
      </LazyLoad>
    </NewsBlock>
  );
};

export default RecentNews;

const NewsBlock = styled.div``;

const NewsItemWrapper = styled.a`
  padding: 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid #999;
  border-radius: 10px;
  height: 80px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const NewsTitle = styled.div`
  flex: 5;
  overflow: hidden;
`;

const NewsDesc = styled.div`
  flex: 3;
  overflow: hidden;

  & > div {
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    height: 50%;
  }
`;
