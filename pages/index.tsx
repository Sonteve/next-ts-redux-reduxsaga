import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { getRecentNewsListAction } from "../reducers/search";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import RecentNews from "../components/RecentNews";
import Top3Contents from "../components/Top3Contents";
import {
  getTop3AuctionVolumeAction,
  getTop3ExportationAction,
  getTop3ImportationAction,
} from "../reducers/top3Contents";

// 메인페이지

const Main = () => {
  /*  const dispatch = useDispatch(); */
  /* useEffect(() => {
    console.log("qqqq", process.cpuUsage());
  }); */
  /* useEffect(() => {
    const prevSearch = cookie.load("search-cookie");
    if (prevSearch) {
      dispatch(setPrevSearchCookie(prevSearch));
    }
    dispatch(
      getNewsAction.request({
        itemCode: 111,
        start: 0,
        countPerPage: 5,
      })
    );
  }, []); */

  /* 메인페이지 초기 진입시 과거 검색 데이터 로드 및 
  데이터 있을시 가져온 현재 데이터로 갱신 */
  return (
    <MainWrapper>
      <MainUi>
        <MainImageWrapper>
          <TestImg src="logo.png" />
        </MainImageWrapper>
        <SearchBar />
      </MainUi>
      <Top3Contents />
      <RecentNews />
      <Footer />
    </MainWrapper>
  );
};

export default Main;

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    /* context.store.dispatch(getTop3ImportationAction.request()); */
    /* context.store.dispatch(getRecentNewsListAction.request()); */
    context.store.dispatch(getRecentNewsListAction.request());
    context.store.dispatch(getTop3ExportationAction.request());
    context.store.dispatch(getTop3ImportationAction.request());
    context.store.dispatch(getTop3AuctionVolumeAction.request());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {} };
  }
);

const MainWrapper = styled.div``;

const MainImageWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 4rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestImg = styled.img`
  width: 40%;
  /*  height: 150px;
  background: #dbdbdb;
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  color: #fff;
  font-size: 30px;
  justify-content: center;
  align-items: center; */
`;

const MainUi = styled.div`
  background-color: #4eac62;
`;
