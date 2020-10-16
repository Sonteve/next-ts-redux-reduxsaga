import Chart from "chart.js";
import { ChartData, AuctionVolumeData } from "../interfaces/price";

const dotColor = [
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
  "#567339",
  "#91A644",
  "#F2BF27",
  "#D98032",
  "#F2D6BD",
  "#F9C2B6",
];

export function getChartTemplate(datas: ChartData): any {
  // 차트 세로선 그어주는 부분
  Chart.pluginService.register({
    // plugin 이름 선택에 따라 canvas상에서의 z-index가 바뀌는 효과가 있다.
    afterDatasetDraw: function (chart: any, easing) {
      if (chart.config.type === "bar") {
        return;
      }

      if (chart.tooltip._active && chart.tooltip._active.length) {
        const activePoint = chart.controller.tooltip._active[0];
        const ctx = chart.ctx;
        const x = activePoint.tooltipPosition().x;
        const topY = chart.scales["y-axis-0"].top;
        const bottomY = chart.scales["y-axis-0"].bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(27,191,1,1)";
        ctx.stroke();
        ctx.restore();
      }
    },
  });

  const lineData: any = [];
  const { RangeLabel } = datas;
  datas.GraphLine.map((line, index) => {
    // 시장 이름에 시장,도매,소매가 들어갈경우 그부분 제거한 부분 을 label로 넣어준다.

    const filteredData: any = [];
    RangeLabel.map((range) => {
      const existValue = line.GraphData.filter((data) => data.X === range)[0];
      existValue
        ? filteredData.push({ x: existValue.X, y: existValue.Y })
        : filteredData.push({ x: range, y: null });
    });

    /* let filteredMarketName = "";
    if (
      ["시장", "도매", "소매"].includes(
        line.MarketName.substring(
          line.MarketName.length - 2,
          line.MarketName.length
        )
      )
    ) {
      filteredMarketName = line.MarketName.slice(0, line.MarketName.length - 2);
    } else {
      filteredMarketName = line.MarketName;
    } */
    /* console.log("line", line); */
    lineData.push({
      label: `${line.ExaminSpeciesName}(${line.ExaminGradeName})`, // 그 선에 해당하는 시장 이름.
      data: filteredData, // 그 선에 들어가는 가격값 배열.
      fill: false,
      borderColor: dotColor[index],
      lineTension: 0.4,
      pointRadius: 0,
      borderWidth: 2,
      backgroundColor: dotColor[index],
      cubicInterpolationMode: "monotone",
    });
  });

  /* const minMaxStep = {
    RangeMin: datas.RangeMin,
    RangeMax: datas.RangeMax,
    RangeStep: datas.RangeStep,
  }; */

  return {
    data: {
      labels: Range,
      datasets: lineData,
    },
    options: {
      maintainAspectRatio: false,
      cutoutPercentage: 50,

      animation: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },

      tooltips: {
        position: "nearest",
        mode: "index",
        intersect: false,
        titleSpacing: 100,
        xPadding: 10,
        yPadding: 10,
        backgroundColor: "rgba(255,255,255,0.9)",
        titleFontColor: "#666",
        bodyFontFamily: "Noto Sans KR",
        bodyFontColor: "#666",
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        pointStyle: "circular",
        bodySpacing: 5,

        callbacks: {
          label: function (tooltipitem: any, data: any) {
            const ItemName = data.datasets[tooltipitem.datasetIndex].label;
            let value: string | string[] = parseInt(
              tooltipitem.value
            ).toString();
            value = value.split(/(?=(?:...)*$)/);
            value = `${ItemName} : ${value.join(",")}원`;

            return value;
          },
        },
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      legend: {
        labels: {
          usePointStyle: true,
          fontSize: 12,
          fontFamily: "Noto Sans KR",
          fontColor: "#999",
          boxWidth: 8,
        },
      },
      scales: {
        xAxes: [
          {
            type: "time",
            display: false,
            ticks: {
              display: true,
              maxTicksLimit: 1,
            },
          },
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: false,
              maxTicksLimit: 5,
              display: false,
            },
          },
        ],
      },
    },
  };
}

export function getAuctionVolumeChartTemplate(datas: AuctionVolumeData): any {
  const lineData: any = [];
  const { RangeLabel } = datas;
  datas.GraphLine.map((line, index) => {
    // 시장 이름에 시장,도매,소매가 들어갈경우 그부분 제거한 부분 을 label로 넣어준다.

    const filteredData: any = [];
    RangeLabel.map((range) => {
      const existValue = line.GraphData.filter((data) => data.X === range)[0];
      existValue
        ? filteredData.push({ x: existValue.X, y: Number(existValue.Y) })
        : filteredData.push({ x: range, y: 0 });
    });

    /* const filteredData: any = [];
    RangeLabel.map((range) => {
      const existValue = line.GraphData.filter((data) => data.X === range)[0];
      existValue
        ? filteredData.push({ x: existValue.X, y: Number(existValue.Y) })
        : filteredData.push({ x: range, y: null });
    }); */

    /* let filteredMarketName = "";
      if (
        ["시장", "도매", "소매"].includes(
          line.MarketName.substring(
            line.MarketName.length - 2,
            line.MarketName.length
          )
        )
      ) {
        filteredMarketName = line.MarketName.slice(0, line.MarketName.length - 2);
      } else {
        filteredMarketName = line.MarketName;
      } */
    lineData.push({
      label: `${line.StdSpeciesName}(${line.StdGradeName})`, // 그 선에 해당하는 시장 이름.
      data: filteredData, // 그 선에 들어가는 가격값 배열.
      fill: false,
      borderColor: dotColor[index],
      lineTension: 0.4,
      pointRadius: 0,
      borderWidth: 2,
      backgroundColor: dotColor[index],
      cubicInterpolationMode: "monotone",
    });
  });

  /* const minMaxStep = {
      RangeMin: datas.RangeMin,
      RangeMax: datas.RangeMax,
      RangeStep: datas.RangeStep,
    }; */

  return {
    data: {
      labels: Range,
      datasets: lineData,
    },
    options: {
      maintainAspectRatio: false,
      cutoutPercentage: 50,

      animation: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },

      tooltips: {
        position: "nearest",
        mode: "index",
        intersect: false,
        titleSpacing: 100,
        xPadding: 10,
        yPadding: 10,
        backgroundColor: "rgba(255,255,255,0.9)",
        titleFontColor: "#666",
        bodyFontFamily: "Noto Sans KR",
        bodyFontColor: "#666",
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        pointStyle: "circular",
        bodySpacing: 5,

        callbacks: {
          label: function (tooltipitem: any, data: any) {
            const ItemName = data.datasets[tooltipitem.datasetIndex].label;

            let value: string | string[] = parseInt(
              tooltipitem.value
            ).toString();
            value = value.split(/(?=(?:...)*$)/);
            value = `${ItemName} : ${value}kg`;

            return value;
          },
        },
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      legend: {
        labels: {
          usePointStyle: true,
          fontSize: 12,
          fontFamily: "Noto Sans KR",
          fontColor: "#999",
          boxWidth: 8,
        },
      },
      scales: {
        xAxes: [
          {
            type: "time",
            display: false,
            ticks: {
              display: true,
              maxTicksLimit: 1,
            },
          },
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: false,
              maxTicksLimit: 5,
              display: false,
            },
          },
        ],
      },
    },
  };
}
