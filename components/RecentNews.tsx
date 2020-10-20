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
        <MainTitle>
          최신 뉴스
          <img src="new.png" />
        </MainTitle>
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

/* const NewsTitle = styled.div``; */

const MainTitle = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  background-color: #ececec;
  color: #555;
  font-size: 1.5rem;
  padding: 1rem 3rem;

  & img {
    width: 2.2rem;
    margin-left: 0.5rem;
  }
`;

const NewsBlock = styled.div``;

const NewsItemWrapper = styled.a`
  display: block;
  box-sizing: border-box;
  padding: 20px 30px;
  border-bottom: 1px solid #d2d2d2;
  text-decoration: none;
  /* &:not(:last-child) {
    margin-bottom: 10px;
  } */
`;

const NewsTitle = styled.div`
  flex: 5;
  overflow: hidden;
  font-size: 1.7rem;
  font-weight: 700;
  text-decoration: none;
  color: #555;
`;

const NewsDesc = styled.div`
  margin-top: 1rem;

  flex: 3;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  & > div {
    color: #999;
    font-weight: 400;
    font-size: 1.3rem;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    height: 50%;
  }
`;
