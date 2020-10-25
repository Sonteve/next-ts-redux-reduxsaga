import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
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
import animateScrollTo from "animated-scroll-to";
moment.locale("ko");

interface Props {
  focus?: boolean;
  isItemPage?: boolean;
}

interface SCProps {
  detail?: boolean;
  same?: boolean;
}

const SearchBar = ({ focus, isItemPage }: Props) => {
  const dispatch = useDispatch();

  const { searchList, prevSearchList } = useSelector(
    ({ search }: RootState) => search
  );
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log("eee");
    setInput(e.target.value);
  }, []);

  // submit시 입력값 확인
  const onSubmitSearchForm = useCallback(
    (e: FormEvent<HTMLFormElement> | FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      console.log(searchList.length);
      if (!searchList.length) return;
      console.log("submit 값 : ", input);
      console.log("searchList.length", searchList[0]);
      const { Keyword, ItemCode } = searchList[0];
      Router.push(`/product?keyword=${Keyword}&itemcode=${ItemCode}`);
    },
    [input, searchList]
  );

  const onKeyPressCheck = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter" || searchList.length === 0) return;
      const { Keyword, ItemCode } = searchList[0];
      /* setInput(""); */
      const prevSearchCookie: SearchCookie[] = cookie.load("search-cookie");
      // 검색 당시 정보 저장
      const newData = {
        Keyword,
        ItemCode,
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
      dispatch(
        setCurrentItem({
          ItemCode,
          Keyword,
        })
      );
      animateScrollTo(0, { speed: 0, minDuration: 0, maxDuration: 0 });

      Router.push(`/product?keyword=${Keyword}&itemcode=${ItemCode}`);
    },
    [input, searchList]
  );

  // 검색결과 아이템 클릭시 쿠키에 추가 및 라우팅
  const onClickItem = useCallback((item: SearchItem) => {
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
    animateScrollTo(0, { speed: 0, minDuration: 0, maxDuration: 0 });
    Router.push(`/product?keyword=${item.Keyword}&itemcode=${item.ItemCode}`);
  }, []);

  const onClickCloseButton = useCallback(() => {
    console.log("닫힘");
    setSearchFocus(false);
    setInput("");
  }, []);

  // 이전 검색목록 제거 및 입력창에 focus준다.
  const onClickCookieRemoveButton = useCallback(() => {
    cookie.remove("search-cookie");
    dispatch(setPrevSearchCookie(null));
    inputRef.current?.focus();
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
          value={input}
          placeholder="품목을 입력하세요."
          onKeyPress={onKeyPressCheck}
          onChange={onChangeInput}
        />
        <SearchResult>
          {!input && prevSearchList && searchFocus && (
            <PrevSearchList>
              <PrevListTitle>이전 검색목록</PrevListTitle>
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
                same={input === searchItem.Keyword ? true : false}
              >
                {searchItem.Keyword}
              </SearchingItem>
            ))}
          {input && searchFocus && searchList.length > 0 && (
            <SearchListUI style={{ justifyContent: "flex-end" }}>
              <ListCloseButton onClick={onClickCloseButton}>
                닫기
              </ListCloseButton>
            </SearchListUI>
          )}
          {!input && searchFocus && prevSearchList && (
            <SearchListUI>
              <ListRemoveButton onClick={onClickCookieRemoveButton}>
                이전 검색목록 제거
              </ListRemoveButton>
              <ListCloseButton onClick={onClickCloseButton}>
                닫기
              </ListCloseButton>
            </SearchListUI>
          )}

          {/* {searchFocus && searchList && (prevSearchList || searchList) && (
            <SearchListUI>
              <ListCloseButton onClick={onClickCloseButton}>닫기</ListCloseButton>
            </SearchListUI>
          )} */}
        </SearchResult>
      </InputWrapper>
      <SearchUI>
        {input && (
          <ListCloseButton onClick={onClickCloseButton}>X</ListCloseButton>
        )}
        {!isItemPage && (
          <SearchButton type="submit">
            <img src="search.png" />
          </SearchButton>
        )}
      </SearchUI>
    </SearchForm>
  );
};

export default SearchBar;

const SearchListUI = styled.div`
  padding: 1rem 0.5rem;
  background: #eaeaea;
  text-align: right;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d2d2d2;
`;

const PrevListTitle = styled.div`
  padding: 1rem;
  font-size: 1.3rem;
  color: #777;
`;

const SearchUI = styled.div`
  position: absolute;
  right: 3%;
  display: flex;
`;

const SearchButton = styled.button`
  cursor: pointer;
  & img {
    width: 3rem;
    height: 3rem;
  }
  border: none;
  background: none;
`;
const ListCloseButton = styled.button`
  cursor: pointer;
  font-size: 1.3rem;
  color: #777;
  background: transparent;
  border: none;
  /* color: rgba(255, 255, 255, 0.8); */
`;
const ListRemoveButton = styled.button`
  cursor: pointer;
  font-size: 1.3rem;
  color: #777;
  background: transparent;
  border: none;
  /* color: rgba(255, 255, 255, 0.8); */
`;

const SearchResult = styled.div`
  position: absolute;
  width: 100%;
  font-size: 17px;
  top: 51px;
`;
const SearchForm = styled.form<SCProps>`
  display: flex;
  align-items: center;
  background: #4eac62;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 150;
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
    padding: 15px 10px;
    font-size: 17px;
    border: none;
    background-color: #4eac62;
    color: #fff;
    border-radius: 0;

    &::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }

    &:focus {
      outline: none !important;
    }
  }
`;

const PrevSearchList = styled.div`
  background: white;
`;

const SearchingItem = styled.div<SCProps>`
  background-color: #fff;
  color: #555;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;

  &:not(:last-child) {
    border-bottom: 1px solid #d2d2d2;
  }

  ${(props) =>
    props.same &&
    css`
      /* background-color: #eee; */
      font-weight: bold;
    `}
`;
