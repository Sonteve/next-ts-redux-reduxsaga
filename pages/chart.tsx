import React, { useEffect, useState } from "react";
import { getGoogleChartData } from "../utils/dummy";
import Chart from "react-google-charts";

const ChartPage = () => {
  const [data, setData] = useState<(number | Date)[][]>();
  useEffect(() => {
    const test = getGoogleChartData();
    if (test) {
      setData(test);
    }
  }, []);
  return (
    <>
      {data && (
        <>
          <div>chart page</div>
          <Chart
            chartLanguage={"ko"}
            width={"100%"}
            height={"500px"}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[["날짜", "가격"], ...data]}
            options={{
              // Use the same chart area width as the control for axis alignment.
              title: "구글 차트",
              chartArea: { height: "80%", width: "90%" },
              hAxis: { slantedText: false },
              vAxis: { title: "가격" },
              /* vAxis: { viewWindow: { min: 49300, max: 53600 } }, */
              legend: { position: "none" },
              lineWidth: 5,
            }}
            rootProps={{ "data-testid": "3" }}
            chartPackages={["corechart", "controls"]}
            controls={[
              {
                controlType: "ChartRangeFilter",
                options: {
                  filterColumnIndex: 0,
                  ui: {
                    chartType: "LineChart",
                    chartOptions: {
                      chartArea: { width: "90%", height: "50%" },
                      hAxis: { baselineColor: "none" },
                    },
                  },
                },
                controlPosition: "bottom",
                controlWrapperParams: {
                  /* state: {
                    range: {
                      start: new Date(2020, 4, 1),
                      end: new Date(20020, 6, 7),
                    },
                  }, */
                },
              },
            ]}
          />
        </>
      )}
    </>
  );
};

export default ChartPage;
