import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers";
import { RetailPrice } from "../interfaces/retailPrice";

interface RetailPriceItem {
  date: string;
  name: string;
  unit: string;
  firstGradePrice: {
    MinPrice: number;
    MaxPrice: number;
  };
  secondGradePrice: {
    MinPrice: number;
    MaxPrice: number;
  } | null;
  speciesName: string | null;
}

/* interface Props {
  title: {
    recentTitle: "최신 도매 가격" | "최신 소비자 가격";
    prevTitle: "전년 도매 가격" | "전년 소비자 자격";
  };
} */

const RetailPriceInfo = (/* { title, priceData }: Props */) => {
  const [recentData, setRecentData] = useState<RetailPriceItem[]>();
  const [prevData, setPrevData] = useState<RetailPriceItem[]>();
  /* const [retailData, setRetailData]  */
  const { recentPriceData, lastYearPriceData } = useSelector(
    ({ retailPrice }: RootState) => retailPrice
  );

  const getRetailData = (priceData: RetailPrice[], type: "recent" | "prev") => {
    console.log(priceData, type);
    const list: RetailPriceItem[] = [];
    priceData?.map((ele, stdIndex) => {
      const result = priceData.filter((data, itemIndex) => {
        if (
          data.ExaminSpeciesName === ele.ExaminSpeciesName &&
          data.ExaminItemCode === ele.ExaminItemCode &&
          data.ExaminGradeCode !== ele.ExaminGradeCode &&
          itemIndex > stdIndex
        ) {
          return data;
        }
      });
      if (result && result[0]) {
        list.push({
          date: ele.ExaminDate,
          name: `${ele.ExaminItemName}(${ele.ExaminSpeciesName})`,
          unit: `(${ele.ExaminUnitName})`,
          firstGradePrice:
            {
              MaxPrice: ele.MaxPrice,
              MinPrice: ele.MinPrice,
            } || null,
          secondGradePrice:
            {
              MaxPrice: result[0].MaxPrice,
              MinPrice: result[0].MinPrice,
            } || null,
          speciesName: ele.ExaminSpeciesName,
        });
      } else {
        const check = list.filter(
          (item) => item.speciesName === ele.ExaminSpeciesName
        ).length;
        if (check === 0) {
          // 품종 중복 없을시만 추가
          list.push({
            date: ele.ExaminDate,
            name: `${ele.ExaminItemName}(${ele.ExaminSpeciesName})`,
            unit: `(${ele.ExaminUnitName})`,
            firstGradePrice:
              {
                MaxPrice: ele.MaxPrice,
                MinPrice: ele.MinPrice,
              } || null,
            secondGradePrice: null,
            speciesName: ele.ExaminSpeciesName,
          });
          console.log("retailList", list);
        }
      }
    });
    console.log(list);
    if (type === "recent") {
      setRecentData(list);
    } else if (type === "prev") {
      setPrevData(list);
    }
  };

  useEffect(() => {
    if (recentPriceData) {
      getRetailData(recentPriceData, "recent");
    }
    if (lastYearPriceData) {
      getRetailData(lastYearPriceData, "prev");
    }
  }, [recentPriceData, lastYearPriceData]);

  return (
    <MarketInfoBlock>
      {recentData && (
        <>
          <TableBlock>
            <TableTitle>
              <span>최신 소비자 가격</span>
              <span> {recentData[0].date}</span>
            </TableTitle>
            {recentData && (
              <>
                <TableHeader>
                  <div>품종</div>
                  <div>상급</div>
                  <div>중급</div>
                </TableHeader>
                {recentData.map((data, index) => (
                  <TableRow key={index}>
                    <Unit>
                      <span>{data.name}</span>
                      <span>{data.unit}</span>
                    </Unit>
                    <div>{`${data.firstGradePrice.MinPrice}~${data.firstGradePrice.MaxPrice}`}</div>

                    <div>
                      {data.secondGradePrice
                        ? `${data.secondGradePrice.MinPrice}~${data.secondGradePrice.MaxPrice}`
                        : ""}
                    </div>
                  </TableRow>
                ))}
              </>
            )}
          </TableBlock>
        </>
      )}
      {prevData && (
        <>
          <TableBlock>
            <TableTitle>
              <span>작년 소비자 가격</span>
              <span> {prevData[0].date}</span>
            </TableTitle>
            {prevData && (
              <>
                <TableHeader>
                  <div>품종</div>
                  <div>상급</div>
                  <div>중급</div>
                </TableHeader>
                {prevData.map((data, index) => (
                  <TableRow key={index}>
                    <Unit>
                      <span>{data.name}</span>
                      <span>{data.unit}</span>
                    </Unit>
                    <div>{`${data.firstGradePrice.MinPrice}~${data.firstGradePrice.MaxPrice}`}</div>
                    <div>
                      {data.secondGradePrice
                        ? `${data.secondGradePrice.MinPrice}~${data.secondGradePrice.MaxPrice}`
                        : ""}
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

export default RetailPriceInfo;

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
