type GameMode = "C" | "CH"

export interface IScoreRequest {
  tz_offset: number;
  game_length: number;
  target_size: number;
  total_target: number;
  target_hit: number;
  mode: GameMode;
}


