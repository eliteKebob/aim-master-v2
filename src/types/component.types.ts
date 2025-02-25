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
  gameRunning: boolean;
  gameOver: boolean;
  targetSize: number;
  position: any;
  aimed: any;
}

export interface IStartGame extends WithTheme, WithGameState {
  setIsChallenge: SetState<boolean>;
  isLoggedIn: () => boolean;
  setShowMemberForm: SetState<boolean>;
}

export interface IScoreboard extends WithTheme {
  score: number;
  secs: number;
  spm: number;
  isChallenge: boolean;
}

export interface IGame
  extends WithTheme,
    WithGameConfig,
    WithGameSession,
    WithGameState,
    Target {
  user: IAuthResponse;
  isChallenge: boolean;
  setShowMemberForm: SetState<boolean>;
  sensitivity: number;
}

export interface ILanding
  extends WithTheme,
    WithGameConfig,
    WithGameState,
    Target,
    SetTarget {
  setTheme: SetState<Themes>;
  setIsChallenge: SetState<boolean>;
  setClickToHit: SetState<boolean>;
  clearGameSession: () => void;
  isLoggedIn: () => boolean;
  setShowMemberForm: SetState<boolean>;
  sensitivity: number;
  setSensitivity: SetState<number>;
}

export interface IProfile extends WithTheme {}

export interface IMouseCoordinates {
  x: number;
  y: number;
}

export interface ICustomizeMouse extends WithTheme {
  sensitivity: number;
  setSensitivity: SetState<number>;
  setClickToHit: SetState<boolean>;
  clickToHit: boolean;
}
