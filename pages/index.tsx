import React, { useEffect } from "react";
import styled from "styled-components";
import News from "../components/News";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";
import { setPrevSearchCookie } from "../reducers/search";
import wrapper from "../store/configureStore";
import { getNewsAction } from "../reducers/media";
import { END } from "redux-saga";

// 메인페이지

const Main = () => {
  const dispatch = useDispatch();

  /* 메인페이지 초기 진입시 과거 검색 데이터 로드 및 
  데이터 있을시 가져온 현재 데이터로 갱신 */
  useEffect(() => {
    const prevSearch = cookie.load("search-cookie");
    if (prevSearch) {
      dispatch(setPrevSearchCookie(prevSearch));
    }
  }, []);
  return (
    <MainWrapper>
      <MainImageWrapper>
        <TestImg>Agripa</TestImg>
      </MainImageWrapper>
      <SearchBar />
      <div>인기 뉴스</div>
      <News />
      <Footer />
    </MainWrapper>
  );
};

export default Main;

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
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

const MainWrapper = styled.div``;

const MainImageWrapper = styled.div`
  padding: 15px;
  background: #eee;
`;

const TestImg = styled.div`
  height: 150px;
  background: #dbdbdb;
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  color: #fff;
  font-size: 30px;
  justify-content: center;
  align-items: center;
`;
