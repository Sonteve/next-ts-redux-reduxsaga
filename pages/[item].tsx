import React, { useState, useEffect, useCallback } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { FcSearch, FcPrevious } from "react-icons/fc";
import SearchBar from "../components/SearchBar";
import { searchFormInitAction } from "../reducers/search";
import { useDispatch } from "react-redux";

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
      <div>수출 월간 추이</div>
      <ItemImageWrapper>
        <TestImg>{item}이미지</TestImg>
      </ItemImageWrapper>
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
