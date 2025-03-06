import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DonatePanelProps {
  onClose: () => void;
}

interface Payment {
  name: string;
  amount: number;
  timestamp: Date;
}

const randomName = () => {
  const names = ['Александр', 'Мария', 'Иван', 'Елена', 'Дмитрий', 'Анна', 'Сергей', 'Ольга'];
  const surnames = ['Иванов', 'Петров', 'Смирнов', 'Кузнецов', 'Попов', 'Соколов'];
  return `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
};

export function DonatePanel({ onClose }: DonatePanelProps) {
  const [payments, setPayments] = useState<Payment[]>([]);

  const handlePurchase = () => {
    const address = "UQC0qtm_kHr2JL_edA9SMpbHAE-2BFf-D4g0kzelc5IviWbC";
    const walletUrl = `https://t.me/wallet?startattach=payment&amount=1000000000&address=${address}`;
    window.open(walletUrl, '_blank');
  };

  useEffect(() => {
    const updatePayments = () => {
      const newPayment = {
        name: randomName(),
        amount: Math.random() * 15,
        timestamp: new Date()
      };
      setPayments(prev => [newPayment, ...prev].slice(0, 10));
    };

    const interval = setInterval(updatePayments, 1000);
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
        <h2 className="text-lg font-bold">Донат 🔥</h2>
        <Button variant="ghost" onClick={onClose}>×</Button>
      </div>

      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded-lg mb-4">
          <p className="text-sm mb-2">TON адрес для оплаты:</p>
          <code className="block bg-black/30 p-2 rounded text-xs break-all">
            UQC0qtm_kHr2JL_edA9SMpbHAE-2BFf-D4g0kzelc5IviWbC
          </code>
        </div>

        <div className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
          <div>
            <p>💰 500 монет</p>
            <p>🏆 100 рейтинга</p>
          </div>
          <Button
            onClick={handlePurchase}
            className="bg-green-500 hover:bg-green-600"
          >
            Поддержать
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg mb-3">Последние платежи:</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {payments.map((payment, i) => (
                <div key={i} className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
                  <span>{payment.name}</span>
                  <span>{payment.amount.toFixed(2)} TON</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </motion.div>
  );
}