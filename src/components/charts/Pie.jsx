import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie as Chart } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Pie = ({ score, theme }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Target Sizes",
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
        label: "# of sessions played",
        data: score?.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Chart data={data} options={options} />;
};

export default Pie;
