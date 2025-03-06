import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface FriendsPanelProps {
  onClose: () => void;
}

export function FriendsPanel({ onClose }: FriendsPanelProps) {
  const { toast } = useToast();
  const referralLink = "https://Empire-Rating.com/ref123";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Ссылка скопирована!",
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="absolute inset-0 bg-background/95 p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Пригласи друзей</h2>
        <Button variant="ghost" onClick={onClose}>×</Button>
      </div>

      <div className="text-center">
        <p className="mb-4">Твоя реферальная ссылка:</p>
        
        <div className="flex gap-2 mb-6">
          <Input readOnly value={referralLink} />
          <Button onClick={copyLink}>
            Копировать
          </Button>
        </div>

        <p className="mb-2">За каждого приглашенного друга ты получишь:</p>
        <div className="bg-white/10 p-4 rounded-lg">
          <p>💰 1000 монет</p>
          <p>🏆 50 рейтинга</p>
        </div>
      </div>
    </motion.div>
  );
}
