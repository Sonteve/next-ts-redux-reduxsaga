import React from "react";
import styled from "styled-components";

const WholeChart = () => {
  return (
    <WholeChartBlock>
      <ChartBlock>
        <ChartTitle>도매 가격 추이</ChartTitle>
        <ChartCanvas></ChartCanvas>
      </ChartBlock>
      <ChartBlock>
        <ChartTitle>도매시장 경매 거래량 추이</ChartTitle>
        <ChartCanvas></ChartCanvas>
      </ChartBlock>
    </WholeChartBlock>
  );
};

export default WholeChart;

const WholeChartBlock = styled.div``;

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
