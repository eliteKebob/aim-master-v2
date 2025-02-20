import { ChartTypes } from "../constants/charts";
import { Themes } from "../constants/themes";
import { IScoreResponse } from "../types/score.types";
import Bar from "./charts/Bar";
import Bubble from "./charts/Bubble";
import Count from "./charts/Count";
import Line from "./charts/Line";
import Pie from "./charts/Pie";
import Polar from "./charts/Polar";
import Radar from "./charts/Radar";

type IChartsListProps = {
  scores: IScoreResponse[];
  theme: Themes;
};

const ChartsList = (props: IChartsListProps) => {
  const counts = props.scores.filter((score) => score.chart_type === ChartTypes.Count);

  return (
    <div className="charts">
      <div className="count-charts">
        {counts.map((score, idx) => (<Count score={score} key={idx} theme={props.theme} />))}
      </div>
      <div className="chart-group">
        <div>
          {props.scores
            ?.filter((score) => score.chart_type === ChartTypes.Bar)
            .map((score, idx) => {
              return <Bar score={score} theme={props.theme} key={idx} />;
            })}
        </div>
        <div>
          {props.scores
            ?.filter((score) => score.chart_type === ChartTypes.Pie)
            .map((score, idx) => {
              return <Pie score={score} theme={props.theme} key={idx} />;
            })}
        </div>
      </div>
      <div className="chart-group">
        <div>
          {props.scores
            ?.filter((score) => score.chart_type === ChartTypes.Polar)
            .map((score, idx) => {
              return <Polar score={score} theme={props.theme} key={idx} />;
            })}
        </div>
        <div>
          {props.scores
            ?.filter((score) => score.chart_type === ChartTypes.Line)
            .map((score, idx) => {
              return <Line score={score} theme={props.theme} key={idx} />;
            })}
        </div>
      </div>
      <div className="chart-group">
        <div>
          <Bubble theme={props.theme} />
        </div>
        <div>
          {props.scores
            ?.filter((score) => score.chart_type === ChartTypes.Radar)
            .map((score, idx) => {
              return <Radar score={score} theme={props.theme} key={idx} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ChartsList;
