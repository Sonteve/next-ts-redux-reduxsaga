import React, { useState, useCallback, useEffect } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { FcDocument } from "react-icons/fc";
import styled from "styled-components";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";

const ContentReadyBlock = styled.div`
  margin: 15px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InquireButton = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
  padding: 5px 20px;
`;

const ContentReady = () => {
  const [inquire, setInquire] = useState(false);

  const {
    wholeRecent,
    wholePrev,
    wholeChart,
    auctionChart,
    retailRecent,
    retailPrev,
    retailChart,
    importChart,
    exportChart,
  } = useSelector(({ wholePrice, retailPrice, importExport }: RootState) => ({
    wholeRecent: wholePrice.recentPriceDataDone,
    wholePrev: wholePrice.lastYearPriceDataDone,
    wholeChart: wholePrice.wholeChartDataDone,
    auctionChart: wholePrice.auctionVolumeDataDone,
    retailRecent: retailPrice.recentPriceDataDone,
    retailPrev: retailPrice.lastYearPriceDataDone,
    retailChart: retailPrice.retailChartDataDone,
    importChart: importExport.importData,
    exportChart: importExport.exportData,
  }));

  const onClickInquire = useCallback(() => {
    console.log("문의하기");
    setInquire(true);
  }, []);

  useEffect(() => {
    if (inquire) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible ";
    }
  });

  if (
    wholeRecent ||
    wholePrev ||
    wholeChart ||
    auctionChart ||
    retailRecent ||
    retailPrev ||
    retailChart ||
    importChart ||
    exportChart
  ) {
    return null;
  }

  return (
    <ContentReadyBlock>
      <GiSandsOfTime style={{ fontSize: "40px" }} />
      <div>정보 준비 중</div>
      <div>현재 해당 정보 제공 준비 중입니다.</div>
      <InquireButton onClick={onClickInquire}>
        <FcDocument />
        문의하기
      </InquireButton>
    </ContentReadyBlock>
  );
};

export default ContentReady;
