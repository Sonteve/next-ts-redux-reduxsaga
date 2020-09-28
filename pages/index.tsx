import styled from "styled-components";
import News from "../components/News";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

// 메인페이지

const Main = () => {
  return (
    <MainWrapper>
      <MainImageWrapper>
        <TestImg>Agripa</TestImg>
      </MainImageWrapper>
      <SearchBar />
      <News />
      <Footer />
    </MainWrapper>
  );
};

export default Main;

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
