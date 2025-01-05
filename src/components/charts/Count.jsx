import React from "react";

const INDICATOR_TITLE = {
  "challenge_game_count": "Challenge Games Played",
  "chill_game_count": "Chill Games Played",
  "average_spm": "Average SPM",
  "total_seconds": "Total Seconds Played"
}

const Count = ({ score, theme }) => {
  return (
    <div className="count-chart-wrapper" style={{ border: `0.25vh solid ${theme}` }}>
      <p>{INDICATOR_TITLE[score?.indicator]}</p>
      <p>{score?.count}</p>
    </div>
  );
};

export default Count;
