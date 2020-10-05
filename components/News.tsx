import React, { useState, useCallback } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { getMoreNewsAction } from "../reducers/media";
import moment from "moment";
import MoreMediaButton from "./MoreMediaButton";

const News = () => {
  const dispatch = useDispatch();
  const { news } = useSelector(({ media }: RootState) => media);
  const [visible, setVisible] = useState<boolean>(true);
  const newsData = news?.data;
  const meta = news?.meta;

  const getMoreNewsData = useCallback(() => {
    if (!newsData || !meta) return;
    if (newsData.length + 5 > meta.totalCount) {
      dispatch(
        getMoreNewsAction.request({
          itemCode: 111,
          start: meta.startIndex + 5,
          countPerPage: meta.totalCount - meta.startIndex,
        })
      );
      setVisible(false);
    } else {
      dispatch(
        getMoreNewsAction.request({
          itemCode: 111,
          start: meta.startIndex + 5,
          countPerPage: 5,
        })
      );
    }
    console.log("more newsdata");
  }, [newsData, meta]);

  return (
    <NewsBlock>
      {/* <NewsTT>인기뉴스</NewsTT> */}
      <LazyLoad height={212}>
        {newsData?.map((data, index) => (
          <NewsItemWrapper key={index} target="_blank" href={data.Link}>
            <NewsTitle>{data.Title}</NewsTitle>
            <NewsDesc>
              <div>{data.Press}</div>
              <div>{moment(data.PubDate).format("YY.MM.DD")}</div>
            </NewsDesc>
          </NewsItemWrapper>
        ))}
      </LazyLoad>
      {visible && <MoreMediaButton getMoreNewsData={getMoreNewsData} />}
    </NewsBlock>
  );
};

export default News;

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
