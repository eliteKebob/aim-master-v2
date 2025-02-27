import { IScoreRequest } from "../types/score.types";

export const saveLocalSession = ({
  game_length,
  target_size,
  total_target,
  target_hit,
  tz_offset,
  mode,
}: IScoreRequest) => {
  localStorage.setItem(
    mode,
    JSON.stringify({
      tz_offset: tz_offset,
      game_length: game_length,
      target_size: target_size,
      total_target: total_target,
      target_hit: target_hit,
      mode: mode,
    })
  );
};
