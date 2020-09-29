import React, { useEffect, useState } from "react";
import { NewsData } from "../interfaces/news";
import styled from "styled-components";
import { newsData } from "../utils/dummy";
import LazyLoad from "react-lazyload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { getNewsAction } from "../reducers/media";

const News = () => {
  const dispatch = useDispatch();
  const { news } = useSelector(({ media }: RootState) => media);

  const newsData = news?.data;
  useEffect(() => {
    dispatch(
      getNewsAction.request({
        itemCode: 111,
        start: 0,
        countPerPage: 5,
      })
    );
  }, []);

  return (
    <NewsBlock>
      {/* <NewsTT>인기뉴스</NewsTT> */}
      <LazyLoad height={212}>
        {newsData?.map((data, index) => (
          <NewsItemWrapper key={index}>
            <NewsTitle>{data.Title}</NewsTitle>
            <NewsDesc>
              <div>{data.Description}</div>
              <div>{data.PubDate}</div>
            </NewsDesc>
          </NewsItemWrapper>
        ))}
      </LazyLoad>
    </NewsBlock>
  );
};

export default News;

const NewsBlock = styled.div``;

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
  flex: 2;
`;
