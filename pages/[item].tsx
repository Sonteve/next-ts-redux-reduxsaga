import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { searchFormInitAction } from "../reducers/search";
import { useDispatch } from "react-redux";
import MarketInfo from "../components/MarketInfo";
import { wholePrice, retailPrice } from "../utils/dummy";
import Footer from "../components/Footer";
import Head from "next/head";
import Navigation from "../components/Navigation";
import WholeChart from "../components/WholeChart";
import RetailChart from "../components/RetailChart";
import MediaTrend from "../components/MediaTrend";

// 품목 상세페이지 동적라우팅 컴포넌트

function Detail() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<boolean>(false);
  const router = useRouter();
  const { item } = router.query;

  const onClickSearchButton = useCallback(() => {
    setSearch((prev) => !prev);
  }, [search]);

  useEffect(() => {
    setSearch(false);
    dispatch(searchFormInitAction());
    console.log("Item : name ", item);
  }, [item]);
  return (
    <>
      <Head>
        <title>{item}</title>
      </Head>
      <Navigation onClickSearchButton={onClickSearchButton} />
      {search && <SearchBar focus={search} />}
      {/* <ContentReady /> */}
      <ItemImageWrapper>
        <TestImg>{item}이미지</TestImg>
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

const ItemImageWrapper = styled.div`
  padding: 15px;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestImg = styled.div`
  /* padding: 50px; */
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
