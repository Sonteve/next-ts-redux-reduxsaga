import React from "react";
import styled from "styled-components";

interface Props {
  title: {
    price: string;
    volume: string;
  };
  /*  chart data  */
}

const TrendChart = ({ title }: Props) => {
  return (
    <TrendChartBlock>
      <ChartBlock>
        <ChartTitle>{title.price}</ChartTitle>
        <ChartCanvas></ChartCanvas>
      </ChartBlock>
      <ChartBlock>
        <ChartTitle>{title.volume}</ChartTitle>
        <ChartCanvas></ChartCanvas>
      </ChartBlock>
    </TrendChartBlock>
  );
};

export default TrendChart;

const TrendChartBlock = styled.div``;

const ChartTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartBlock = styled.div`
  padding: 10px;
`;

const ChartCanvas = styled.div`
  width: 100%;
  height: 200px;
  background: #dbdbdb;
  border-radius: 20px;
`;
