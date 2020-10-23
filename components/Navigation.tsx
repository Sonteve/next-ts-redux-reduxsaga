import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Router, { useRouter } from "next/router";
import animateScrollTo from "animated-scroll-to";
import UnderLine from "./UnderLine";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";

interface Props {
  onClickSearchFormOpenButton: () => void;
  isSearch: boolean;
  wholeOffset: number | null;
  retailOffset: number | null;
  portOffset: number | null;
  trendOffset: number | null;
}

interface Offset {
  type: string;
  offset: number;
}

interface SCprops {
  active: boolean;
}

const Navigation = ({
  onClickSearchFormOpenButton,
  wholeOffset,
  retailOffset,
  portOffset,
  trendOffset,
  isSearch,
}: Props) => {
  const router = useRouter();
  const { searchList } = useSelector(({ search }: RootState) => search);
  const { keyword } = router.query;
  const [offsets, setOffsets] = useState<Offset[]>([]);
  const [currentMenu, setCurrentMenu] = useState<string>("");
  console.log("isSearch", isSearch);

  useEffect(() => {
    const arr: Offset[] = [];
    if (wholeOffset) {
      arr.push({
        type: "whole",
        offset: wholeOffset,
      });
    }
    if (retailOffset) {
      arr.push({
        type: "retail",
        offset: retailOffset,
      });
    }
    if (portOffset) {
      arr.push({
        type: "port",
        offset: portOffset,
      });
    }
    if (trendOffset) {
      arr.push({
        type: "trend",
        offset: trendOffset,
      });
    }
    setOffsets(arr);
  }, [wholeOffset, retailOffset, portOffset, trendOffset]);

  useEffect(() => {
    console.log(offsets);
  }, [offsets]);

  const onClickQuickMenuButton = useCallback(
    (menu: string) => {
      if (menu === "whole" && wholeOffset !== null) {
        console.log("whole", `${wholeOffset}으로 이동`);
        animateScrollTo(wholeOffset - 100);
      } else if (menu === "retail" && retailOffset !== null) {
        console.log("retail클릭", `${retailOffset}으로 이동`);
        animateScrollTo(retailOffset - 100);
      } else if (menu === "port" && portOffset !== null) {
        console.log("port", `${portOffset}으로 이동`);
        animateScrollTo(portOffset - 100);
      } else if (menu === "trend" && trendOffset !== null) {
        console.log("trend", `${trendOffset}으로 이동`);
        animateScrollTo(trendOffset - 100);
      }
    },
    [wholeOffset, retailOffset, portOffset, trendOffset]
  );

  const onClickSearch = useCallback(() => {
    if (!searchList.length) return;
    console.log("searchList.length", searchList[0]);
    const { Keyword, ItemCode } = searchList[0];
    Router.push(`/product?keyword=${Keyword}&itemcode=${ItemCode}`);
  }, [searchList]);

  useEffect(() => {
    if (!offsets.length) return;
    let wScroll = 0;
    if (offsets[0].type === "whole") {
      setCurrentMenu("whole");
    }
    if (offsets[0].type === "retail") {
      setCurrentMenu("retail");
    }
    if (offsets[0].type === "port") {
      setCurrentMenu("port");
    }
    if (offsets[0].type === "trend") {
      setCurrentMenu("trend");
    }

    const currentMenuStyle = (e: any) => {
      wScroll = e.srcElement.scrollingElement.scrollTop;
      console.log("wScroll", wScroll);

      if (offsets.length === 0) {
        console.log("아무것도 없음");
      } else if (offsets.length === 1) {
        setCurrentMenu(offsets[0].type);
      } else if (offsets.length === 2) {
        if (
          wScroll + 110 >= offsets[0].offset &&
          wScroll + 110 < offsets[1].offset
        ) {
          setCurrentMenu(offsets[0].type);
        } else {
          setCurrentMenu(offsets[1].type);
        }
      } else if (offsets.length === 3) {
        if (
          wScroll + 110 >= offsets[0].offset &&
          wScroll + 110 < offsets[1].offset
        ) {
          setCurrentMenu(offsets[0].type);
        } else if (
          wScroll + 110 >= offsets[1].offset &&
          wScroll + 110 < offsets[2].offset
        ) {
          setCurrentMenu(offsets[1].type);
        } else {
          setCurrentMenu(offsets[2].type);
        }
      } else {
        if (
          wScroll + 110 >= offsets[0].offset &&
          wScroll + 110 < offsets[1].offset
        ) {
          setCurrentMenu(offsets[0].type);
        } else if (
          wScroll + 110 >= offsets[1].offset &&
          wScroll + 110 < offsets[2].offset
        ) {
          setCurrentMenu(offsets[1].type);
        } else if (
          wScroll + 110 >= offsets[2].offset &&
          wScroll + 110 < offsets[3].offset
        ) {
          setCurrentMenu(offsets[2].type);
        } else {
          setCurrentMenu(offsets[3].type);
        }
      }
    };

    window.addEventListener("scroll", currentMenuStyle);

    return () => {
      window.removeEventListener("scroll", currentMenuStyle);
    };
  }, [wholeOffset, retailOffset, portOffset, offsets]);

  return (
    <>
      <NavigationBlock>
        <NavTop>
          <PrevBtn onClick={() => Router.replace("/")}>
            <img src="back.png" alt="뒤로가기" />
          </PrevBtn>
          <NavTitle>{keyword}</NavTitle>
          <SearchBtn
            onClick={isSearch ? onClickSearch : onClickSearchFormOpenButton}
          >
            <img src="search.png" alt="검색 버튼" />
          </SearchBtn>
        </NavTop>
        <nav>
          {(wholeOffset || retailOffset || portOffset) && (
            <NavBot>
              {wholeOffset && (
                <li>
                  <MenuButton
                    onClick={() => onClickQuickMenuButton("whole")}
                    active={currentMenu === "whole" && true}
                  >
                    도매
                  </MenuButton>
                </li>
              )}
              {retailOffset && (
                <li>
                  <MenuButton
                    onClick={() => onClickQuickMenuButton("retail")}
                    active={currentMenu === "retail" && true}
                  >
                    소매
                  </MenuButton>
                </li>
              )}
              {portOffset && (
                <li>
                  <MenuButton
                    onClick={() => onClickQuickMenuButton("port")}
                    active={currentMenu === "port" && true}
                  >
                    수출입
                  </MenuButton>
                </li>
              )}
              {trendOffset && (
                <li>
                  <MenuButton
                    onClick={() => onClickQuickMenuButton("trend")}
                    active={currentMenu === "trend" && true}
                  >
                    트렌드
                  </MenuButton>
                </li>
              )}
            </NavBot>
          )}
        </nav>
        <UnderLine />
      </NavigationBlock>
    </>
  );
};

export default Navigation;

const MenuButton = styled.button<SCprops>`
  cursor: pointer;
  margin: 0;
  padding: 0.5rem 1.7rem;
  margin-right: 0.4rem;
  background-color: #eaeaea;
  border: none;
  outline: none;
  font-weight: 300;
  color: #333;
  font-family: "Noto Sans KR", sans-serif;

  ${(props) =>
    props.active &&
    css`
      font-weight: 700;
      background-color: #4eac62;
      color: #fff;
    `}
`;

const NavBot = styled.div`
  display: flex;
  height: 4.5rem;
  align-items: center;
  padding: 0 1rem;
  background: #fff;
  & li {
  }
`;

const NavTop = styled.div`
  padding: 1rem 0;
  display: flex;

  justify-content: space-between;
  align-items: center;
`;
const NavTitle = styled.div`
  color: #fff;
  font-size: 1.4rem;
`;

const PrevBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 50%;
    display: block;
  }
`;

const SearchBtn = styled.div`
  cursor: pointer;
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
  background: #4eac62;
  z-index: 100;

  /* 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px; */
`;
