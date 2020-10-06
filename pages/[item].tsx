import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import {
  setCurrentItem,
  searchFormInitAction,
  getItemCodeMapAction,
} from "../reducers/search";
import { useDispatch } from "react-redux";
import MarketInfo from "../components/MarketInfo";
import { wholePrice, retailPrice } from "../utils/dummy";
import Footer from "../components/Footer";
import Head from "next/head";
import Navigation from "../components/Navigation";
import WholeChart from "../components/WholeChart";
import RetailChart from "../components/RetailChart";
import MediaTrend from "../components/MediaTrend";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { getNewsAction } from "../reducers/media";

// 품목 상세페이지 동적라우팅 컴포넌트

function Detail() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<boolean>(false);
  const router = useRouter();
  const { keyword, itemcode } = router.query;

  const onClickSearchButton = useCallback(() => {
    setSearch((prev) => !prev);
  }, [search]);

  useEffect(() => {
    setSearch(false);
    dispatch(searchFormInitAction());
    console.log("Item : name ", keyword);
  }, [keyword]);

  useEffect(() => {
    console.log("router.query", router.query);
  }, []);
  return (
    <>
      <Head>
        <title>{keyword}</title>
      </Head>
      <Navigation onClickSearchButton={onClickSearchButton} />
      {search && <SearchBar focus={search} />}
      {/* <ContentReady /> */}
      <ItemImageWrapper>
        <TestImg>{keyword}이미지</TestImg>
      </ItemImageWrapper>
      <MarketInfo
        title={{
          recent: "최신 도매 가격",
          prev: "전년 도매 가격",
        }}
        wholePrice={wholePrice}
      />
      <WholeChart />
      <MarketInfo
        title={{
          recent: "최신 소비자 가격",
          prev: "전년 소비자 가격",
        }}
        retailPrice={retailPrice}
      />
      <RetailChart />
      <MediaTrend />
      <Footer />
    </>
  );
}

export default Detail;

/* export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {

    const state = context.store.getState();
    if (state.search.currentItem?.ItemCode) {
      context.store.dispatch(
        getItemCodeMapAction.request(state.search.currentItem?.ItemCode)
      );
    }

    context.store.dispatch(
      getNewsAction.request({
        itemCode: 111,
        start: 0,
        countPerPage: 5,
      })
    );
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {} };
  }
); */

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch(
      setCurrentItem({
        ItemCode: context.query.itemcode as string,
        Keyword: context.query.keyword as string,
      })
    );
    context.store.dispatch(
      getNewsAction.request({
        itemCode: 111,
        start: 0,
        countPerPage: 5,
      })
    );

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {} };
  }
);

const ItemImageWrapper = styled.div`
  padding: 15px;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestImg = styled.div`
  width: 80%;
  padding: 30px 0;
  text-align: center;
  display: inline-block;
  background: #dbdbdb;
  border: 1px solid black;
  border-radius: 15px;
  color: #fff;
  font-size: 30px;
`;
