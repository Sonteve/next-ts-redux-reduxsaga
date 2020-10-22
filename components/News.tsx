import React, { useState, useCallback } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { useDispatch } from "react-redux";
import { getMoreNewsAction } from "../reducers/media";
import moment from "moment";
import MoreMediaButton from "./MoreMediaButton";
import { useRouter } from "next/router";
import { News as NewsData } from "../interfaces/media";

interface Props {
  datas: NewsData | null;
}

const News = ({ datas }: Props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(true);
  const newsData = datas?.data;
  const meta = datas?.meta;
  const router = useRouter();
  const itemCode = router.query.itemcode as string;

  const getMoreNewsData = useCallback(() => {
    if (!newsData || !meta) return;
    if (newsData.length + 5 > meta.totalCount) {
      dispatch(
        getMoreNewsAction.request({
          itemCode,
          start: meta.startIndex + 5,
          countPerPage: meta.totalCount - meta.startIndex,
        })
      );
      setVisible(false);
    } else {
      dispatch(
        getMoreNewsAction.request({
          itemCode,
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
  text-decoration: none;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 10px;
    border-bottom: 1px solid #ececec;
  }
`;

const NewsTitle = styled.div`
  flex: 5;
  font-size: 1.7rem;
  overflow: hidden;
  color: #555;
  font-weight: 700;
`;

const NewsDesc = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  & > div {
    color: #555;
    font-size: 1.3rem;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    /* height: 50%; */

    &:first-child {
      color: #999;
    }
  }
`;
