import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import {
  searchWordAction,
  setPrevSearchCookie,
  setCurrentItem,
} from "../reducers/search";
import { RootState } from "../reducers";
import Router from "next/router";
import cookie from "react-cookies";
import { getOneYearLater } from "../utils/getOneYearLater";
import moment from "moment";
import { SearchCookie, SearchItem } from "../interfaces/search";
moment.locale("ko");

interface Props {
  focus?: boolean;
}

interface SCProps {
  detail?: boolean;
}

const SearchBar = ({ focus }: Props) => {
  const dispatch = useDispatch();

  const { searchList, prevSearchList } = useSelector(
    ({ search }: RootState) => search
  );
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  // submit시 입력값 확인
  const onSubmitSearchForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("submit 값 : ", input);
    },
    [input]
  );

  // 검색결과 아이템 클릭시 쿠키에 추가 및 라우팅
  const onClickItem = useCallback(async (item: SearchItem) => {
    setInput("");
    const prevSearchCookie: SearchCookie[] = cookie.load("search-cookie");
    console.log("클릭한 아이템", item);
    // 검색 당시 정보 저장
    const newData = {
      Keyword: item.Keyword,
      ItemCode: item.ItemCode,
      createdAt: moment(new Date()).format("YY.MM.DD"),
    };
    if (prevSearchCookie) {
      prevSearchCookie.map((v) => console.log(v));
      // 중복 검색어 제거
      const data = prevSearchCookie.filter(
        (data) => data.Keyword !== newData.Keyword
      );
      if (data.length >= 5) {
        // 쿠키 저장시 이전목록이 5개 이상이면 마지막데이터는 지워진다.
        cookie.save("search-cookie", [newData, ...data.splice(0, 4)], {
          expires: getOneYearLater(),
        });
      } else {
        cookie.save("search-cookie", [newData, ...data], {
          expires: getOneYearLater(),
        });
      }

      console.log("기존 쿠키에 새 데이터 추가");
    } else {
      cookie.save("search-cookie", [newData], {
        expires: getOneYearLater(),
      });
      console.log("새 쿠키생성");
    }
    dispatch(setCurrentItem(item));
    Router.push(`/product?keyword=${item.Keyword}&itemcode=${item.ItemCode}`);
  }, []);

  const onClickCloseButton = useCallback(() => {
    console.log("닫힘");
    setSearchFocus(false);
    setInput("");
  }, []);

  // 현재 페이지내부에 어디를 클릭했는지를 확인하는 이벤트핸들러
  useEffect(() => {
    const focusCheck = () => {
      const activeElement = document.activeElement;
      console.log("activeElement", activeElement);
      console.log("inputref", inputRef.current);
      if (activeElement === inputRef.current) {
        // 클릭한것이 input이라면 이전검색 쿠키값 받아옴.
        // 쿠키값을 받아오고 있다면 store에 그값을 추가해준다.
        const prevSearch = cookie.load("search-cookie");
        if (prevSearch) {
          dispatch(setPrevSearchCookie(prevSearch));
        }
        setSearchFocus(true);
      } else {
        setSearchFocus(false);
      }
    };
    document.addEventListener("click", focusCheck);

    return () => {
      document.removeEventListener("click", focusCheck);
    };
  }, []);

  // 검색요청
  useEffect(() => {
    if (input !== "") {
      dispatch(searchWordAction.request(input));
    }
  }, [input]);

  // 처음 searchbar렌더시 focus props가 true이면 자동 focus되게
  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
  }, [focus]);

  // 현재 focus여부 확인
  useEffect(() => {
    console.log("searchFocus", searchFocus);
  }, [searchFocus]);

  return (
    <SearchForm detail={focus} onSubmit={onSubmitSearchForm}>
      <InputWrapper>
        <input
          ref={inputRef}
          placeholder="품목을 입력하세요."
          value={input}
          onChange={onChangeInput}
        />
        <SearchResult>
          {!input && prevSearchList && searchFocus && (
            <PrevSearchList>
              <div>이전 검색목록</div>
              {prevSearchList.map((prevItem) => (
                <SearchingItem
                  key={prevItem.Keyword}
                  onClick={() => onClickItem(prevItem)}
                >
                  <span>{prevItem.Keyword}</span>
                  <span>{prevItem.createdAt}</span>
                </SearchingItem>
              ))}
            </PrevSearchList>
          )}
          {input &&
            searchList.map((searchItem, index) => (
              <SearchingItem
                key={index}
                onClick={() => onClickItem(searchItem)}
              >
                {searchItem.Keyword}
              </SearchingItem>
            ))}
        </SearchResult>
      </InputWrapper>
      <RemoveButton onClick={onClickCloseButton}>X</RemoveButton>
    </SearchForm>
  );
};

export default SearchBar;

const RemoveButton = styled.button`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  position: absolute;
  right: 1%;
`;

const SearchResult = styled.div`
  position: absolute;
  width: 100%;
  font-size: 18px;
  top: 40px;
`;
const SearchForm = styled.form<SCProps>`
  padding: 10px;
  background: #dbdbdb;
  border: 1px solid #eaeaea;
  display: flex;

  width: 100%;
  box-sizing: border-box;
  position: relative;
  ${(props) =>
    props.detail &&
    css`
      position: fixed;
      top: 44px;
    `}
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;

  & > input {
    flex: 1;
    padding: 10px;
    font-size: 15px;
    border: 1px solid #eee;
    border-radius: 8px;
  }
`;

const PrevSearchList = styled.div`
  background: white;
`;

const SearchingItem = styled.div`
  background: black;
  color: yellow;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
