import React from "react";
import { FcSearch, FcPrevious } from "react-icons/fc";
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
      <FcPrevious
        onClick={() => Router.replace("/")}
        style={{ cursor: "pointer", fontSize: "30px" }}
      />
      <div>{keyword}</div>
      <div>
        <FcSearch
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={onClickSearchButton}
        />
      </div>
    </NavigationBlock>
  );
};

export default Navigation;

const NavigationBlock = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px; */
`;
