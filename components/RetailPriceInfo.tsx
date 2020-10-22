import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers";
import { RetailPrice } from "../interfaces/price";
import InnerCircle from "./InnerCircle";
import { numberFormat } from "../utils/numberFormat";

interface RetailPriceItem {
  date: string;
  name: string;
  unit: string;
  firstGradePrice: {
    MinPrice: number;
    MaxPrice: number;
  } | null;
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
  const [recentData, setRecentData] = useState<RetailPriceItem[] | null>();
  const [prevData, setPrevData] = useState<RetailPriceItem[] | null>();
  /* const [retailData, setRetailData]  */
  const { recentPriceData, lastYearPriceData } = useSelector(
    ({ retailPrice }: RootState) => retailPrice
  );

  const getRetailData = (
    priceData: RetailPrice[] | null,
    type: "recent" | "prev"
  ) => {
    if (priceData === null && type === "recent") {
      setRecentData(null);
      return;
    }

    if (priceData === null && type === "prev") {
      setPrevData(null);
      return;
    }

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
          name: ele.ExaminSpeciesName,
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
          console.log("ele", ele);
          // 품종 중복 없을시만 추가
          list.push({
            date: ele.ExaminDate,
            name: ele.ExaminSpeciesName,
            unit: `(${ele.ExaminUnitName})`,
            firstGradePrice:
              ele.ExaminGradeCode === "1"
                ? {
                    MaxPrice: ele.MaxPrice,
                    MinPrice: ele.MinPrice,
                  }
                : null,
            secondGradePrice:
              ele.ExaminGradeCode === "2"
                ? {
                    MaxPrice: ele.MaxPrice,
                    MinPrice: ele.MinPrice,
                  }
                : null,
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
    } else {
      getRetailData(null, "recent");
    }
    if (lastYearPriceData) {
      getRetailData(lastYearPriceData, "prev");
    } else {
      getRetailData(null, "prev");
    }
  }, [recentPriceData, lastYearPriceData]);

  return (
    <MarketInfoBlock>
      {recentData && (
        <>
          <TableBlock>
            <TableTitle>
              <SubTitle>
                <InnerCircle />
                최신 소비자 가격
              </SubTitle>
              <Date> {recentData[0].date}</Date>
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
                    <div>
                      {data.firstGradePrice &&
                        `${numberFormat(
                          data.firstGradePrice.MinPrice
                        )}~${numberFormat(data.firstGradePrice.MaxPrice)}`}
                    </div>
                    <div>
                      {data.secondGradePrice &&
                        `${numberFormat(
                          data.secondGradePrice.MinPrice
                        )}~${numberFormat(data.secondGradePrice.MaxPrice)}`}
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
              <SubTitle>
                <InnerCircle />
                작년 소비자 가격
              </SubTitle>
              <Date> {prevData[0].date}</Date>
            </TableTitle>
            {prevData && (
              <>
                <TableHeader style={{ opacity: 0.5 }}>
                  <div>품종</div>
                  <div>상급</div>
                  <div>중급</div>
                </TableHeader>
                {prevData.map((data, index) => (
                  <TableRow key={index} style={{ opacity: 0.5 }}>
                    <Unit>
                      <span>{data.name}</span>
                      <span>{data.unit}</span>
                    </Unit>
                    <div>
                      {data.firstGradePrice &&
                        `${numberFormat(
                          data.firstGradePrice.MinPrice
                        )}~${numberFormat(data.firstGradePrice.MaxPrice)}`}
                    </div>
                    <div>
                      {data.secondGradePrice &&
                        `${numberFormat(
                          data.secondGradePrice.MinPrice
                        )}~${numberFormat(data.secondGradePrice.MaxPrice)}`}
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

const SubTitle = styled.span`
  font-size: 1.4rem;
  color: #555;
  display: flex;
  align-items: center;
`;

const Date = styled.span`
  font-size: 1.2rem;
  color: #999;
`;

const TableTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 1rem;
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
  padding: 1rem 0;
  background: #ececec;
  & > div {
    color: #555;
    font-size: 1.2rem;
    flex: 1;
    box-sizing: border-box;
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
    color: #333;
    font-size: 1.4rem;
    font-weight: 700;
    flex: 1;
    padding: 1rem 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ececec;
  }
`;

const TableBlock = styled.div`
  /* &:not(:last-child) {
    margin-bottom: 20px;
  } */
  margin-bottom: 20px;
`;

const MarketInfoBlock = styled.div``;
