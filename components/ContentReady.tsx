import React, { useState, useCallback, useEffect } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { FcDocument } from "react-icons/fc";
import styled from "styled-components";
import Inquire from "./Inquire";
import { useDispatch } from "react-redux";
import { initInquire } from "../reducers/inquire";
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
  const dispatch = useDispatch();
  const [inquire, setInquire] = useState(false);

  const {
    wholeRecent,
    wholePrev,
    wholeChart,
    auctionChart,
    retailRecent,
    retailPrev,
    retailChart,
  } = useSelector(({ wholePrice, retailPrice }: RootState) => ({
    wholeRecent: wholePrice.recentPriceDataDone,
    wholePrev: wholePrice.lastYearPriceDataDone,
    wholeChart: wholePrice.wholeChartDataDone,
    auctionChart: wholePrice.auctionVolumeDataDone,
    retailRecent: retailPrice.recentPriceDataDone,
    retailPrev: retailPrice.lastYearPriceDataDone,
    retailChart: retailPrice.retailChartDataDone,
  }));

  const onClickInquire = useCallback(() => {
    console.log("문의하기");
    setInquire(true);
  }, []);

  const onCloseInquire = useCallback(() => {
    console.log("문의하기 닫기");
    dispatch(initInquire());
    setInquire(false);
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
    retailChart
  ) {
    return null;
  }

  return (
    <ContentReadyBlock>
      {inquire && <Inquire onClickClose={onCloseInquire} />}
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
