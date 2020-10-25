import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import styled, { createGlobalStyle } from "styled-components";
import { RootState } from "../reducers";
import Router from "next/router";
import {
  T3AuctionVolumeData,
  T3ExportData,
  T3ImportData,
} from "../interfaces/top3Contents";

const Global = createGlobalStyle`

.slick-slider {
    /* overflow:hidden; */
}
.slick-dots {
  bottom: -30px;
}
.slick-dots li button:before {
  color: green;
}

.slick-dots li.slick-active button:before {
  color: green;
}
`;

const Top3Contents = () => {
  const { t3ImportData, t3ExportData, t3AuctionData } = useSelector(
    ({ top3Contents }: RootState) => top3Contents
  );

  const onClickTop3Item = useCallback(
    (data: T3AuctionVolumeData | T3ExportData | T3ImportData) => {
      Router.push(
        `/product?keyword=${data.StdItemName}&itemcode=${data.StdItemCode}`
      );
    },
    []
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Top3ContentsBlock>
      <Global />
      <Slider {...settings}>
        {t3AuctionData && (
          <div>
            <Top3Title>
              거래량 상위3순위
              <span>TOP3</span>
            </Top3Title>
            {t3AuctionData.map((data, index) => (
              <div key={index}>
                <T3Item /* key={index} */ onClick={() => onClickTop3Item(data)}>
                  <Left>
                    <Rank>{index + 1}</Rank>
                    <ItemName>{data.StdItemName}</ItemName>
                  </Left>
                  <Right>
                    <Value>{Math.floor(Number(data.AccQy))}톤</Value>
                  </Right>
                </T3Item>
              </div>
            ))}
          </div>
        )}
        {t3ImportData && (
          <div>
            <Top3Title>
              수입량 상위3순위<span>TOP3</span>
            </Top3Title>
            {t3ImportData.map((data, index) => (
              <div key={index}>
                <T3Item /* key={index} */ onClick={() => onClickTop3Item(data)}>
                  <Left>
                    <Rank>{index + 1}</Rank>
                    <ItemName>{data.StdItemName}</ItemName>
                  </Left>
                  <Right>
                    <Value>{Math.floor(Number(data.ConvertedWeight))}톤</Value>
                  </Right>
                </T3Item>
              </div>
            ))}
          </div>
        )}
        {t3ExportData && (
          <div>
            <Top3Title>
              수출량 상위3순위<span>TOP3</span>
            </Top3Title>
            {t3ExportData.map((data, index) => (
              <div key={index}>
                <T3Item /* key={index} */ onClick={() => onClickTop3Item(data)}>
                  <Left>
                    <Rank>{index + 1}</Rank>
                    <ItemName>{data.StdItemName}</ItemName>
                  </Left>
                  <Right>
                    <Value>{Math.floor(Number(data.ConvertedWeight))}톤</Value>
                  </Right>
                </T3Item>
              </div>
            ))}
          </div>
        )}
      </Slider>
    </Top3ContentsBlock>
  );
};

export default Top3Contents;

const Top3ContentsBlock = styled.div`
  margin-bottom: 4rem;
`;
const Rank = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  color: #d4d4d4;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d4d4d4;
  margin-right: 1rem;
`;
const Value = styled.div`
  font-size: 1.5rem;
  color: #acacac;
  font-weight: 300;
`;

const ItemName = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;
const Top3Title = styled.div`
  background: #ececec;
  font-size: 1.5rem;
  padding: 1rem 2.5rem;
  border-bottom: 1px solid #d4d4d4;

  & > span {
    margin-left: 1rem;
    color: #fff;
    padding: 0.3rem 0.5rem;
    border-radius: 0.5rem;
    background: #f68d8d;
  }
`;
const T3Item = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 2.5rem;
  border-bottom: 1px solid #d4d4d4;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div``;
