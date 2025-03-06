import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface GameStatsProps {
  onShowLeaderboard: () => void;
}

export function GameStats({ onShowLeaderboard }: GameStatsProps) {
  const { state } = useGame();

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>💰</span>
          <strong>{state.money}</strong>
        </div>
        <Button variant="outline" size="sm" onClick={onShowLeaderboard}>
          🏆 Рейтинг
        </Button>
        <div className="flex items-center gap-2">
          <span>🏆</span>
          <strong>{state.level}</strong>
        </div>
      </div>

      <div className="relative">
        <Progress value={state.energy} />
        <div className="absolute top-1/2 left-4 -translate-y-1/2 flex items-center gap-2 text-sm">
          ⚡ {Math.floor(state.energy)}/100
        </div>
      </div>
    </div>
  );
}