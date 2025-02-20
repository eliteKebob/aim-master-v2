import React, { useState, useEffect } from "react";
import { getScores } from "../requests/score";
import ChartsList from "../components/ChartsList";
import { Themes } from "../constants/themes";
import { IScoreResponse } from "../types/score.types";

type IProfileProps = {
  theme: Themes;
};

const Profile = (props: IProfileProps) => {
  const [scores, setScores] = useState<IScoreResponse[] | null>(null);

  useEffect(() => {
    const _request = async () => {
      await getScores(setScores);
    };
    _request();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {scores && <ChartsList scores={scores} theme={props.theme} />}
    </div>
  );
};

export default Profile;
