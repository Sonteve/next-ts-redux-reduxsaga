import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getChartTemplate,
  getAuctionVolumeChartTemplate,
} from "../utils/getChartTemplate";
import { Line, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const WholeChart = () => {
  const { wholeChartData, auctionVolumeData } = useSelector(
    ({ wholePrice }: RootState) => wholePrice
  );
  const [chartData, setChartData] = useState<any>();
  const [auctionData, setAuctionData] = useState<any>();

  useEffect(() => {
    wholeChartData && wholeChartData.GraphLine
      ? setChartData(getChartTemplate(wholeChartData))
      : setChartData(null);
    auctionVolumeData && auctionVolumeData.GraphBar
      ? setAuctionData(getAuctionVolumeChartTemplate(auctionVolumeData))
      : setAuctionData(null);
  }, [wholeChartData, auctionVolumeData]);

  useEffect(() => {
    console.log("chartData", chartData);
    console.log("auctionData", auctionData);
  }, [chartData, auctionData]);

  return (
    <>
      {chartData && wholeChartData && (
        <>
          <ChartBlock>
            <ChartTitle>도매 가격 추이</ChartTitle>
            <DataChartBlock>
              <Line
                height={250}
                data={chartData.data}
                options={chartData.options}
              />
              <RangeLabelBlock>
                <RangeLabel>
                  {wholeChartData.RangeLabel && wholeChartData.RangeLabel[0]}
                </RangeLabel>
                <RangeLabel>
                  {wholeChartData.RangeLabel &&
                    wholeChartData.RangeLabel[
                      wholeChartData.RangeLabel.length - 1
                    ]}
                </RangeLabel>
              </RangeLabelBlock>
            </DataChartBlock>
          </ChartBlock>
        </>
      )}
      {/* {stackedData && (
        <>
          <ChartBlock>
            <ChartTitle>도매시장 경매 거래량 추이</ChartTitle>
            <DataChartBlock>
              <Bar
                height={250}
                data={stackedData.data}
                options={stackedData.options}
              />
              
            </DataChartBlock>
          </ChartBlock>
        </>
      )} */}

      {auctionData && auctionVolumeData && (
        <>
          <ChartBlock>
            <ChartTitle>도매시장 경매 거래량 추이</ChartTitle>
            <DataChartBlock>
              <Bar data={auctionData.data} options={auctionData.options} />
              <RangeLabelBlock>
                <RangeLabel>
                  {auctionVolumeData.RangeLabel &&
                    auctionVolumeData.RangeLabel[0]}
                </RangeLabel>
                <RangeLabel>
                  {auctionVolumeData.RangeLabel &&
                    auctionVolumeData.RangeLabel[
                      auctionVolumeData.RangeLabel.length - 1
                    ]}
                </RangeLabel>
              </RangeLabelBlock>
            </DataChartBlock>
          </ChartBlock>
        </>
      )}
    </>
  );
};

export default WholeChart;

/* const WholeChartBlock = styled.div``; */

const ChartTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartBlock = styled.div`
  padding: 10px;
`;

const DataChartBlock = styled.div`
  height: auto;
  min-height: 200px;
  margin-bottom: 4rem;
`;

const RangeLabelBlock = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  color: #999;
`;

const RangeLabel = styled.span`
  font-weight: 600;
  display: inline-block;
  padding: 1rem;
  font-size: 1.5rem;
`;
