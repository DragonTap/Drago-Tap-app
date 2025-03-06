import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  money: integer("money").notNull().default(0),
  level: integer("level").notNull().default(1),
  energy: integer("energy").notNull().default(100),
});

export const insertPlayerSchema = createInsertSchema(players).omit({ 
  id: true,
  money: true,
  level: true,
  energy: true
});

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;

export interface GameState {
  money: number;
  level: number;
  energy: number;
  lastWorkTime: number;
  isResting: boolean;
  isNightShift: boolean;
  nightShiftEndTime: number;
}

export const leaderboardSchema = z.array(z.object({
  rank: z.number(),
  name: z.string(),
  money: z.number(),
  level: z.number()
}));

export type LeaderboardEntry = z.infer<typeof leaderboardSchema>[number];
