import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar as Chart } from "react-chartjs-2";
import { colorKeywordToRGB } from "../../utils/color";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const Radar = ({ score, theme }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Best Grades",
      },
    },
  };
  const data = {
    labels: score?.labels,
    datasets: [
      {
        label: "# grade",
        data: score?.data,
        backgroundColor: colorKeywordToRGB(theme, "0.2"),
        borderColor: colorKeywordToRGB(theme),
        borderWidth: 1,
      },
    ],
  };
  return <Chart data={data} options={options} />;
};

export default Radar;
