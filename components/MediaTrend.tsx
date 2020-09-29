import { current } from "immer";
import React, { useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import News from "./News";
import Youtube from "./Youtube";

const MediaTrendBlock = styled.div`
  padding: 0 15px;
  background: #eee;
`;
const MediaTabList = styled.ul`
  display: flex;
  margin-bottom: 15px;
`;
const MediaTabItem = styled.li<SCprops>`
  padding: 5px 15px;
  border: 1px solid #666;
  border-radius: 10px;
  background: #dbdbdb;
  color: white;

  ${(props) =>
    props.active &&
    css`
      background: black;
    `}
`;
const MediaTrendTitle = styled.h3``;

interface SCprops {
  active?: boolean;
}

const MediaTrend = () => {
  const [currentTab, setCurrentTab] = useState<string>("news");
  const onClickTabItem = useCallback((currentTab: string) => {
    setCurrentTab(currentTab);
  }, []);

  useEffect(() => {
    console.log("currentTab", currentTab);
  }, [currentTab]);
  return (
    <MediaTrendBlock>
      <MediaTrendTitle>트랜드</MediaTrendTitle>
      <MediaTabList>
        <MediaTabItem
          active={currentTab === "news" ? true : false}
          onClick={() => onClickTabItem("news")}
        >
          뉴스
        </MediaTabItem>
        <MediaTabItem
          active={currentTab === "youtube" ? true : false}
          onClick={() => onClickTabItem("youtube")}
        >
          유튜브
        </MediaTabItem>
      </MediaTabList>
      <MediaContents>
        {currentTab === "news" && <News />}
        {currentTab === "youtube" && <Youtube />}
      </MediaContents>
    </MediaTrendBlock>
  );
};

export default MediaTrend;

const MediaContents = styled.div``;
