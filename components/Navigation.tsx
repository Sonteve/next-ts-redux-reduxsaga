import React from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";

interface Props {
  onClickSearchButton: () => void;
}

const Navigation = ({ onClickSearchButton }: Props) => {
  const router = useRouter();
  const { keyword } = router.query;
  return (
    <NavigationBlock>
      <PrevBtn onClick={() => Router.replace("/")}>
        <img src="back.png" alt="뒤로가기" />
      </PrevBtn>
      <NavTitle>{keyword}</NavTitle>
      <SearchBtn onClick={onClickSearchButton}>
        <img src="search.png" alt="검색 버튼" />
      </SearchBtn>
    </NavigationBlock>
  );
};

export default Navigation;

const NavTitle = styled.div`
  color: #fff;
`;

const PrevBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 50%;
    display: block;
  }
`;

const SearchBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 50%;
    display: block;
  }
`;

const NavigationBlock = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  background: #4eac62;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px; */
`;
