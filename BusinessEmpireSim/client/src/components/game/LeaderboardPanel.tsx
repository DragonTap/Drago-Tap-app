import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";

interface LeaderboardPanelProps {
  onClose: () => void;
}

interface LeaderboardEntry {
  name: string;
  money: number;
  level: number;
}

const generateRandomName = () => {
  const names = ['Александр', 'Мария', 'Иван', 'Елена', 'Дмитрий', 'Анна', 'Сергей', 'Ольга'];
  const surnames = ['Иванов', 'Петров', 'Смирнов', 'Кузнецов', 'Попов', 'Соколов'];
  return `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
};

const generateRandomLeaderboard = () => {
  return Array.from({ length: 100 }, () => ({
    name: generateRandomName(),
    money: Math.floor(Math.random() * 1000000),
    level: Math.floor(Math.random() * 1000)
  })).sort((a, b) => b.money - a.money);
};

export function LeaderboardPanel({ onClose }: LeaderboardPanelProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const updateLeaderboard = () => {
      setLeaderboard(generateRandomLeaderboard());
    };

    updateLeaderboard();
    const interval = setInterval(updateLeaderboard, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="absolute inset-0 bg-background/95 p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Рейтинг игроков</h2>
        <Button variant="ghost" onClick={onClose}>×</Button>
      </div>

      <ScrollArea className="h-[calc(100%-60px)]">
        <div className="space-y-2">
          {leaderboard.map((player, i) => (
            <div
              key={i}
              className="bg-white/10 p-3 rounded-lg flex justify-between items-center"
            >
              <span className="text-blue-400">#{i + 1}</span>
              <span>{player.name}</span>
              <div className="flex gap-4">
                <span>💰 {player.money}</span>
                <span>🏆 {player.level}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
}