import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getChartTemplate } from "../utils/getChartTemplate";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const RetailChart = () => {
  const { retailChartData } = useSelector(
    ({ retailPrice }: RootState) => retailPrice
  );
  const [chartData, setChartData] = useState<any>();
  /* const [auctionData, setAuctionData] = useState<any>(); */

  useEffect(() => {
    retailChartData &&
      retailChartData.GraphLine &&
      setChartData(getChartTemplate(retailChartData));
  }, [retailChartData]);

  useEffect(() => {
    console.log("chartData", chartData);
  }, [chartData]);
  return (
    <>
      {chartData && retailChartData && (
        <>
          <ChartBlock>
            <ChartTitle>소비자 가격 추이</ChartTitle>
            <DataChartBlock>
              <Line data={chartData.data} options={chartData.options} />
              <RangeLabelBlock>
                <RangeLabel>{retailChartData.RangeLabel[0]}</RangeLabel>
                <RangeLabel>
                  {
                    retailChartData.RangeLabel[
                      retailChartData.RangeLabel.length - 1
                    ]
                  }
                </RangeLabel>
              </RangeLabelBlock>
            </DataChartBlock>
          </ChartBlock>
        </>
      )}
      {/* {auctionData && auctionVolumeData && (
        <>
          <ChartBlock>
            <ChartTitle>도매시장 경매 거래량 추이</ChartTitle>
            <DataChartBlock>
              <Bar data={auctionData.data} options={auctionData.options} />
              <RangeLabelBlock>
                <RangeLabel>{auctionVolumeData.RangeLabel[0]}</RangeLabel>
                <RangeLabel>
                  {
                    auctionVolumeData.RangeLabel[
                      auctionVolumeData.RangeLabel.length - 1
                    ]
                  }
                </RangeLabel>
              </RangeLabelBlock>
            </DataChartBlock>
          </ChartBlock>
        </>
      )} */}
    </>
  );
};

export default RetailChart;

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
  min-height: 150px;
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
