import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers";

interface PriceItem {
  date: string;
  name: string;
  unit: string;
  firstGradePrice: number;
  secondGradePrice: number | null;
  speciesName: string | null;
}

interface Props {
  title: {
    recent: string;
    prev: string;
  };
}

const MarketInfo = ({ title }: Props) => {
  const [processedData, setProcessedData] = useState<PriceItem[]>();
  const { recentPriceData } = useSelector(
    ({ wholePrice }: RootState) => wholePrice
  );
  const getProcessedData = () => {
    const list: PriceItem[] = [];
    recentPriceData?.map((ele, stdIndex) => {
      const result = recentPriceData.filter((data, itemIndex) => {         
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
          firstGradePrice: ele.Price,
          secondGradePrice: result[0].Price || null,
          speciesName: ele.ExaminSpeciesName
        });
      }else{
        const check =list.filter(item => item.speciesName === ele.ExaminSpeciesName).length;        
        if(check === 0 ){ // 품종 중복 없을시만 추가
          list.push({
            date: ele.ExaminDate,
            name: `${ele.ExaminItemName}(${ele.ExaminSpeciesName})`,
            unit: `(${ele.ExaminUnitName})`,
            firstGradePrice: ele.Price,
            secondGradePrice: null,
            speciesName: ele.ExaminSpeciesName
          });
        }
        
      }
    });
    console.log(list);
    setProcessedData(list);
  };
  useEffect(() => {
    if (recentPriceData) {
      getProcessedData();
    }
  }, [recentPriceData]);
  return (
    <MarketInfoBlock>
      {processedData && (
        <>
          <TableBlock>
            <TableTitle>
              <span>{title.recent}</span>
              <span> {processedData[0].date}</span>
            </TableTitle>
            {processedData && (
              <>
                <TableHeader>
                  <div>품종</div>
                  <div>상급</div>
                  <div>중급</div>
                </TableHeader>
                {processedData.map((data,index) => (
                  <TableRow key={index}>
                    <Unit>
                      <span>{data.name}</span>
                      <span>{data.unit}</span>
                    </Unit>
                    <div>{data.firstGradePrice}</div>
                    <div>{data.secondGradePrice}</div>
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
