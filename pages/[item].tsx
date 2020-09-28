import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { FcSearch, FcPrevious } from "react-icons/fc";
import SearchBar from "../components/SearchBar";
import { searchFormInitAction } from "../reducers/search";
import { useDispatch } from "react-redux";
import MarketInfo from "../components/MarketInfo";
import { wholePrice, retailPrice } from "../utils/dummy";
import TrendChart from "../components/TrendChart";
import Footer from "../components/Footer";
/* import ContentReady from "../components/ContentReady"; */

// 품목 상세페이지 동적라우팅 컴포넌트

function Detail() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<boolean>(false);
  const router = useRouter();
  const { item } = router.query;

  useEffect(() => {
    setSearch(false);
    dispatch(searchFormInitAction());
    console.log("Item : name ", item);
  }, [item]);
  return (
    <>
      <Navigation>
        <FcPrevious
          onClick={() => Router.replace("/")}
          style={{ cursor: "pointer", fontSize: "30px" }}
        />
        <div>{item}</div>
        <div>
          <FcSearch
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={() => setSearch((prev) => !prev)}
          />
        </div>
      </Navigation>
      {search && <SearchBar focus={search} />}
      {/* <ContentReady /> */}
      <div>수출 월간 추이</div>
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
      <TrendChart
        title={{
          price: "도매 가격 추이",
          volume: "도매시장 경매 거래량 추이",
        }}
      />
      <MarketInfo
        title={{
          recent: "최신 소비자 가격",
          prev: "전년 소비자 가격",
        }}
        retailPrice={retailPrice}
      />
      <TrendChart
        title={{
          price: "소비자 가격 추이",
          volume: "소비자시장 경매 거래량 추이",
        }}
      />
      <Footer />
    </>
  );
}

export default Detail;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
`;

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
