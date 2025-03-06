import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { GameState } from "@shared/schema";

const WORK_REWARD = 20;
const LEVEL_REWARD = 1;
const ENERGY_COST = 5;
const WORK_COOLDOWN = 5000;
const REST_DURATION = 60000;
const NIGHT_SHIFT_DURATION = 3600000;
const NIGHT_SHIFT_REWARD = 500;
const NIGHT_SHIFT_LEVEL_REWARD = 30;

interface GameContextType {
  state: GameState;
  work: () => void;
  startNightShift: () => void;
}

const initialState: GameState = {
  money: 0,
  level: 1,
  energy: 100,
  lastWorkTime: 0,
  isResting: false,
  isNightShift: false,
  nightShiftEndTime: 0
};

type GameAction = 
  | { type: "WORK" }
  | { type: "REST_START" }
  | { type: "REST_END" }
  | { type: "NIGHT_SHIFT_START" }
  | { type: "NIGHT_SHIFT_END" }
  | { type: "UPDATE_ENERGY"; payload: number }
  | { type: "LOAD_STATE"; payload: GameState };

const GameContext = createContext<GameContextType | undefined>(undefined);

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "WORK":
      return {
        ...state,
        money: state.money + WORK_REWARD,
        level: state.level + LEVEL_REWARD,
        energy: state.energy - ENERGY_COST,
        lastWorkTime: Date.now()
      };
    case "REST_START":
      return { ...state, isResting: true };
    case "REST_END":
      return { ...state, isResting: false, energy: 100 };
    case "NIGHT_SHIFT_START":
      return {
        ...state,
        isNightShift: true,
        energy: 0,
        nightShiftEndTime: Date.now() + NIGHT_SHIFT_DURATION
      };
    case "NIGHT_SHIFT_END":
      return {
        ...state,
        isNightShift: false,
        money: state.money + NIGHT_SHIFT_REWARD,
        level: state.level + NIGHT_SHIFT_LEVEL_REWARD,
        energy: 100
      };
    case "UPDATE_ENERGY":
      return { ...state, energy: action.payload };
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      dispatch({ type: "LOAD_STATE", payload: JSON.parse(savedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(state));
  }, [state]);

  const work = () => {
    if (state.isResting || state.isNightShift) return;
    
    const now = Date.now();
    if (now - state.lastWorkTime < WORK_COOLDOWN) return;
    
    if (state.energy < ENERGY_COST) {
      dispatch({ type: "REST_START" });
      return;
    }

    dispatch({ type: "WORK" });
  };

  const startNightShift = () => {
    if (state.isResting || state.isNightShift) return;
    dispatch({ type: "NIGHT_SHIFT_START" });
  };

  return (
    <GameContext.Provider value={{ state, work, startNightShift }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
