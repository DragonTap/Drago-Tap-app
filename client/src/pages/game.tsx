import { GameProvider } from "@/context/GameContext";
import { GameContainer } from "@/components/game/GameContainer";

export default function GamePage() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}
