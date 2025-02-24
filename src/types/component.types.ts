import { Themes } from "../constants/themes";
import { IAuthResponse } from "./auth.types";
import { IScoreResponse } from "./score.types";
import { SetState, WithTheme } from "./global";

interface WithAuth {
  setUser: SetState<IAuthResponse>;
  setShowMemberForm: SetState<boolean>;
}

interface WithGameState {
  setGameRunning: SetState<boolean>;
}

interface WithGameConfig {
  clickToHit: boolean;
}

interface Target {
  targets: number;
  targetSize: number;
}

interface SetTarget {
  setTargets: SetState<number>;
  setTargetSize: SetState<number>;
}

interface WithGameSession {
  score: number;
  gameRunning: boolean;
  startTime: number;
  gameOver: boolean;
  setStartTime: SetState<number>;
  setScore: SetState<number>;
  setGameOver: SetState<boolean>;
}

export interface IChartsList extends WithTheme {
  scores: IScoreResponse[];
}

export interface ICustomizeTargets extends WithTheme, Target, SetTarget {}

export interface IGameOver extends WithTheme, WithGameState, Target {
  gameLength: number;
  setSecs: SetState<number>;
  setSpm: SetState<number>;
  setGameOver: SetState<boolean>;
  score: number;
  setScore: SetState<number>;
  setStartTime: SetState<number>;
}

export interface IHeader extends WithTheme, WithAuth, WithGameState {
  showMemberForm: boolean;
  isLoggedIn: () => boolean;
}

export interface ILogin extends WithTheme, WithAuth {}

export interface ISetTheme extends WithTheme {
  setTheme: SetState<Themes>;
}

export interface ISingleTarget extends WithTheme, WithGameConfig {
  setScore: SetState<number>;
  score: number;
  gameRunning: boolean;
  gameOver: boolean;
  targetSize: number;
}

export interface IStartGame extends WithTheme, WithGameState {
  setIsChallenge: SetState<boolean>;
  isLoggedIn: () => boolean;
  setShowMemberForm: SetState<boolean>;
}

export interface IGame
  extends WithTheme,
    WithGameConfig,
    WithGameSession,
    WithAuth,
    WithGameState,
    Target {
  user: IAuthResponse;
  isLoggedIn: () => boolean;
  isChallenge: boolean;
}

export interface ILanding
  extends WithTheme,
    WithGameConfig,
    WithAuth,
    WithGameState,
    Target,
    SetTarget {
  setTheme: SetState<Themes>;
  setIsChallenge: SetState<boolean>;
  setClickToHit: SetState<boolean>;
  clearGameSession: () => void;
  isLoggedIn: () => boolean;
}

export interface IProfile extends WithTheme {}
