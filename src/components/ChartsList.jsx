import React from "react";
import Bar from "../components/charts/Bar";
import Bubble from "../components/charts/Bubble";
import Count from "../components/charts/Count";
import Line from "../components/charts/Line";
import Pie from "../components/charts/Pie";
import Polar from "../components/charts/Polar";
import Radar from "../components/charts/Radar";

const ChartsList = ({ scores, theme }) => {
  return (
    <div className="charts">
      <div className="count-charts">
        {scores?.map((score, idx) => {
          if (score?.chart_type === "count") {
            return <Count score={score} key={idx} theme={theme} />;
          }
        })}
      </div>
      <div className="chart-group">
        <div>
          {scores
            ?.filter((score) => score.chart_type === "bar")
            .map((score) => {
              return <Bar score={score} theme={theme} />;
            })}
        </div>
        <div>
          {scores
            ?.filter((score) => score.chart_type === "pie")
            .map((score) => {
              return <Pie score={score} theme={theme} />;
            })}
        </div>
      </div>
      <div className="chart-group">
        <div>
          {scores
            ?.filter((score) => score.chart_type === "polar")
            .map((score) => {
              return <Polar score={score} theme={theme} />;
            })}
        </div>
        <div>
          {scores
            ?.filter((score) => score.chart_type === "line")
            .map((score) => {
              return <Line score={score} theme={theme} />;
            })}
        </div>
      </div>
      <div className="chart-group">
        <div>
          <Bubble theme={theme} />
        </div>
        <div>
          {scores
            ?.filter((score) => score.chart_type === "radar")
            .map((score) => {
              return <Radar score={score} theme={theme} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ChartsList;
