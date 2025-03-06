import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameStats } from "./GameStats";
import { LeaderboardPanel } from "./LeaderboardPanel";
import { DonatePanel } from "./DonatePanel";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";

export function GameContainer() {
  const [showPanel, setShowPanel] = useState<"leaderboard" | "donate" | null>(null);
  const { state, work, startNightShift } = useGame();

  return (
    <div className="min-h-screen bg-[#17181C] flex items-center justify-center font-sans">
      <div className="w-[340px] h-[680px] bg-[#1a1a1a] rounded-[45px] relative shadow-xl border-2 border-[#2a2a2a] p-4 box-border">
        <div className="absolute w-[150px] h-[25px] bg-[0a0a0a] top-0 left-1/2 -translate-x-1/2 rounded-b-[15px]" />
        <div className="absolute w-[40px] h-[40px] bg-[#0a0a0a] bottom-[10px] left-1/2 -translate-x-1/2 rounded-full" />

        <div className="w-full h-full bg-[#17181C] rounded-[35px] overflow-hidden relative text-white">
          <GameStats onShowLeaderboard={() => setShowPanel("leaderboard")} />

          <div className="p-4 flex flex-col gap-4">
            <Button onClick={() => setShowPanel("donate")}>
              💎 Донат
            </Button>

            <div className="mt-auto">
              <Button 
                className="w-full mb-2" 
                onClick={work}
                disabled={state.isResting || state.isNightShift}
              >
                Работать (+20💰 +1🏆)
              </Button>

              <Button 
                className="w-full bg-gradient-to-r from-[#2c3e50] to-[#3498db]"
                onClick={startNightShift}
                disabled={state.isResting || state.isNightShift}
              >
                {state.isNightShift ? (
                  <>Ночная смена ({Math.floor((state.nightShiftEndTime - Date.now()) / 60000)}:
                    {String(Math.floor((state.nightShiftEndTime - Date.now()) / 1000) % 60).padStart(2, '0')})
                  </>
                ) : (
                  'Ночная смена (x2)'
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showPanel === "leaderboard" && (
              <LeaderboardPanel onClose={() => setShowPanel(null)} />
            )}
            {showPanel === "donate" && (
              <DonatePanel onClose={() => setShowPanel(null)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}