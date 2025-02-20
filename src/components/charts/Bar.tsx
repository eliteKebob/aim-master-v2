import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar as Chart } from "react-chartjs-2";
import { DAYS } from "../../constants/date";
import faker from "faker";
import { colorKeywordToRGB } from "../../utils/color";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Bar = ({ score, theme }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Last SPMs",
      },
      scales: {
        xAxes: [
          {
            beginAtZero: true,
            ticks: {
              autoSkip: false,
            },
          },
        ],
      },
    },
  };
  const data = {
    labels: score?.labels,
    datasets: [
      {
        label: "Challenge Date / SPM",
        data: score?.data,
        backgroundColor: colorKeywordToRGB(theme),
      },
    ],
  };
  return <Chart options={options} data={data} />;
};

export default Bar;
