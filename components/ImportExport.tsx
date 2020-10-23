import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers";
import { getImportExportChartTemplate } from "../utils/getChartTemplate";
import { Line } from "react-chartjs-2";
import UnderLine from "./UnderLine";
import InnerCircle from "./InnerCircle";

const ImportExport = () => {
  const { importData, exportData } = useSelector(
    ({ importExport }: RootState) => importExport
  );
  const [importChartData, setImportChartData] = useState<any>();
  const [exportChartData, setExportChartData] = useState<any>();

  useEffect(() => {
    importData && importData.GraphLine
      ? setImportChartData(getImportExportChartTemplate(importData))
      : setImportChartData(null);
    exportData && exportData.GraphLine
      ? setExportChartData(getImportExportChartTemplate(exportData))
      : setExportChartData(null);
  }, [importData, exportData]);

  return (
    <>
      {importChartData && importData && (
        <>
          <ChartBlock>
            <ChartTitle>
              <InnerCircle />
              수입 월간 추이
            </ChartTitle>
            <DataChartBlock>
              <Line
                height={250}
                data={importChartData.data}
                options={importChartData.options}
              />
              <UnderLine height={0.2} />
              <RangeLabelBlock>
                <RangeLabel>
                  {importData.RangeLabel && importData.RangeLabel[0]}
                </RangeLabel>
                <RangeLabel>
                  {importData.RangeLabel &&
                    importData.RangeLabel[importData.RangeLabel.length - 1]}
                </RangeLabel>
              </RangeLabelBlock>
            </DataChartBlock>
          </ChartBlock>
        </>
      )}
      {exportChartData && exportData && (
        <>
          <ChartBlock>
            <ChartTitle>
              <InnerCircle />
              수출 월간 추이
            </ChartTitle>
            <DataChartBlock>
              <Line
                height={250}
                data={exportChartData.data}
                options={exportChartData.options}
              />
              <UnderLine height={0.2} />
              <RangeLabelBlock>
                <RangeLabel>
                  {exportData.RangeLabel && exportData.RangeLabel[0]}
                </RangeLabel>
                <RangeLabel>
                  {exportData.RangeLabel &&
                    exportData.RangeLabel[exportData.RangeLabel.length - 1]}
                </RangeLabel>
              </RangeLabelBlock>
            </DataChartBlock>
          </ChartBlock>
        </>
      )}
    </>
  );
};

/* const WholeChartBlock = styled.div``; */

const ChartTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: #555;
  padding: 1rem 0;
`;

const ChartBlock = styled.div`
  padding: 0 1rem;
`;

const DataChartBlock = styled.div`
  height: auto;
  min-height: 200px;
  margin-bottom: 4rem;
`;

const RangeLabelBlock = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: #999;
`;

const RangeLabel = styled.span`
  font-weight: 300;
  display: inline-block;
  padding: 1rem;
  font-size: 1.2rem;
`;

export default ImportExport;
