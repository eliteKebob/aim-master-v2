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
            .map((score) => {
              return <Bar score={score} theme={props.theme} />;
            })}
        </div>
        <div>
          {props.scores
            ?.filter((score) => score.chart_type === ChartTypes.Pie)
            .map((score) => {
              return <Pie score={score} theme={props.theme} />;
            })}
        </div>
      </div>
      <div className="chart-group">
        <div>
          {props.scores
            ?.filter((score) => score.chart_type === ChartTypes.Polar)
            .map((score) => {
              return <Polar score={score} theme={props.theme} />;
            })}
        </div>
        <div>
          {props.scores
            ?.filter((score) => score.chart_type === ChartTypes.Line)
            .map((score) => {
              return <Line score={score} theme={props.theme} />;
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
            .map((score) => {
              return <Radar score={score} theme={props.theme} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ChartsList;
