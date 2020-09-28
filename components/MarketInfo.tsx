import React from "react";
import styled from "styled-components";
import { WholePriceDatas, RetailPriceDatas } from "../interfaces/dummy";

interface Props {
  title: {
    recent: string;
    prev: string;
  };
  wholePrice?: WholePriceDatas;
  retailPrice?: RetailPriceDatas;
}

const MarketInfo = ({ title, wholePrice, retailPrice }: Props) => {
  return (
    <MarketInfoBlock>
      {wholePrice && (
        <>
          <TableBlock>
            <TableTitle>
              <span>{title.recent}</span>
              <span> 2020.00.00</span>
            </TableTitle>
            {wholePrice.recent && (
              <>
                <TableHeader>
                  <div>품종</div>
                  <div>상급</div>
                  <div>중급</div>
                </TableHeader>
                {wholePrice.recent.map((data, index) => (
                  <TableRow key={index}>
                    <Unit>
                      <span>{data.kind}</span>
                      <span>{`(${data.unit})`}</span>
                    </Unit>
                    {}
                    <div>{data.high ? data.high : "-"}</div>
                    <div>{data.middle ? data.middle : "-"}</div>
                  </TableRow>
                ))}
              </>
            )}
          </TableBlock>
          <TableBlock>
            <TableTitle>
              <span>{title.prev}</span>
              <span> 2020.00.00</span>
            </TableTitle>
            {wholePrice.prev && (
              <>
                <TableHeader>
                  <div>품종</div>
                  <div>상급</div>
                  <div>중급</div>
                </TableHeader>
                {wholePrice.prev.map((data, index) => (
                  <TableRow key={index}>
                    <Unit>
                      <span>{data.kind}</span>
                      <span>{`(${data.unit})`}</span>
                    </Unit>
                    <div>{data.high ? data.high : "-"}</div>
                    <div>{data.middle ? data.middle : "-"}</div>
                  </TableRow>
                ))}
              </>
            )}
          </TableBlock>
        </>
      )}
      {retailPrice && (
        <>
          <TableBlock>
            <TableTitle>
              <span>{title.recent}</span>
              <span> 2020.00.00</span>
            </TableTitle>
            {retailPrice.recent && (
              <>
                <TableHeader>
                  <div>품종</div>
                  <div>상급</div>
                  <div>중급</div>
                </TableHeader>
                {retailPrice.recent.map((data, index) => (
                  <TableRow key={index}>
                    <Unit>
                      <span>{data.kind}</span>
                      <span>{`(${data.unit})`}</span>
                    </Unit>
                    <div>
                      {data.high?.min
                        ? `${data.high.min}~${data.high?.max}`
                        : "-"}
                    </div>
                    <div>
                      {data.middle?.min
                        ? `${data.middle.min}~${data.middle?.max}`
                        : "-"}
                    </div>
                  </TableRow>
                ))}
              </>
            )}
          </TableBlock>
          <TableBlock>
            <TableTitle>
              <span>{title.prev}</span>
              <span> 2020.00.00</span>
            </TableTitle>
            {retailPrice.prev && (
              <>
                <TableHeader>
                  <div>품종</div>
                  <div>상급</div>
                  <div>중급</div>
                </TableHeader>
                {retailPrice.prev.map((data, index) => (
                  <TableRow key={index}>
                    <Unit>
                      <span>{data.kind}</span>
                      <span>{`(${data.unit})`}</span>
                    </Unit>
                    <div>
                      {data.high?.min
                        ? `${data.high.min}~${data.high?.max}`
                        : "-"}
                    </div>
                    <div>
                      {data.middle?.min
                        ? `${data.middle.min}~${data.middle?.max}`
                        : "-"}
                    </div>
                  </TableRow>
                ))}
              </>
            )}
          </TableBlock>
        </>
      )}
    </MarketInfoBlock>
  );
};

export default MarketInfo;

const TableTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Unit = styled.div`
  display: flex;
  flex-direction: column;
`;
const TableHeader = styled.div`
  box-sizing: border-box;
  text-align: center;
  display: flex;
  background: #fff;
  & > div {
    flex: 1;
    margin: 2px;
    box-sizing: border-box;
    background: #bababa;
    padding: 3px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TableRow = styled.div`
  box-sizing: border-box;
  text-align: center;
  display: flex;
  background: #fff;
  & > div {
    flex: 1;
    margin: 2px;
    box-sizing: border-box;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:nth-child(2n) > div {
    background: #eee;
  }

  &:nth-child(2n + 1) > div {
    background: #dadada;
  }
`;

const TableBlock = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const MarketInfoBlock = styled.div`
  padding: 10px;
`;
