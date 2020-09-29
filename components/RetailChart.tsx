import React from "react";
import styled from "styled-components";

const RetailChart = () => {
  return (
    <RetailChartBlock>
      <ChartBlock>
        <ChartTitle>소매 가격 추이</ChartTitle>
        <ChartCanvas></ChartCanvas>
      </ChartBlock>
      <ChartBlock>
        <ChartTitle>수입 월간 추이</ChartTitle>
        <ChartCanvas></ChartCanvas>
      </ChartBlock>
      <ChartBlock>
        <ChartTitle>수출 월간 추이</ChartTitle>
        <ChartCanvas></ChartCanvas>
      </ChartBlock>
    </RetailChartBlock>
  );
};

export default RetailChart;

const RetailChartBlock = styled.div``;

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
