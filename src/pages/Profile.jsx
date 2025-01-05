import React, { useState, useEffect } from "react";
import { getScores } from "../requests/score";
import ChartsList from "../components/ChartsList";

const Profile = ({ theme }) => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    const _request = async () => {
      await getScores(null, setScores);
    };
    _request();
    // eslint-disable-next-line
  }, []);

  // new Date(Date.parse("2024-12-20T12:31:50Z")).toLocaleString()

  return (
    <div>
      <ChartsList scores={scores} theme={theme} />
    </div>
  );
};

export default Profile;

// count charts: challenge session count, chill session count, average spm, total seconds played
// 1 bar chart:
// 1 pie chart:
// 1 line chart:
// 1 polar area chart:


// 1 radar chart:
// 1 bubble chart:
