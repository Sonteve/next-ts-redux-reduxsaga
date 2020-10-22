import React, { useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import News from "./News";
import Youtube from "./Youtube";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import InnerCircle from "./InnerCircle";

const MediaTrendBlock = styled.div`
  padding-top: 2rem;
`;
const MediaTabList = styled.ul`
  display: flex;
  padding: 1rem;
  box-sizing: border-box;
`;
const MediaTabItem = styled.li<SCprops>`
  cursor: pointer;
  padding: 0.7rem 0.9rem;
  background: #eaeaea;
  border-radius: 0.6rem;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 500;
  &:first-child {
    margin-right: 1rem;
  }
  flex: 1;

  ${(props) =>
    props.active &&
    css`
      color: #fff;
      font-weight: 700;
      background-color: #4eac62;
    `}
`;
const MediaTrendTitle = styled.div`
  font-size: 1.4rem;
  color: #555;
  align-items: center;
  padding: 1rem;
`;

interface SCprops {
  active?: boolean;
}

const MediaTrend = () => {
  const [currentTab, setCurrentTab] = useState<string>("news");
  const onClickTabItem = useCallback((currentTab: string) => {
    setCurrentTab(currentTab);
  }, []);
  const { news, youtube } = useSelector(({ media }: RootState) => ({
    news: media.news,
    getNewsDone: media.getNewsDone,
    youtube: media.youtube,
    getYoutubeDone: media.getYoutubeDone,
  }));

  useEffect(() => {
    console.log("currentTab", currentTab);
  }, [currentTab]);

  if (!news && !youtube) {
    return null;
  }
  return (
    <MediaTrendBlock>
      <MediaTrendTitle>
        <InnerCircle />
        트랜드
      </MediaTrendTitle>
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
        {currentTab === "news" && <News datas={news} />}
        {currentTab === "youtube" && <Youtube datas={youtube} />}
      </MediaContents>
    </MediaTrendBlock>
  );
};

export default MediaTrend;

const MediaContents = styled.div``;
