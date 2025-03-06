import { type Player, type InsertPlayer } from "@shared/schema";

export interface IStorage {
  getPlayer(id: number): Promise<Player | undefined>;
  getPlayerByUsername(username: string): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayer(id: number, data: Partial<Player>): Promise<Player>;
  getLeaderboard(): Promise<Player[]>;
}

export class MemStorage implements IStorage {
  private players: Map<number, Player>;
  private currentId: number;

  constructor() {
    this.players = new Map();
    this.currentId = 1;
  }

  async getPlayer(id: number): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async getPlayerByUsername(username: string): Promise<Player | undefined> {
    return Array.from(this.players.values()).find(
      (player) => player.username === username
    );
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = this.currentId++;
    const player: Player = {
      id,
      ...insertPlayer,
      money: 0,
      level: 1,
      energy: 100
    };
    this.players.set(id, player);
    return player;
  }

  async updatePlayer(id: number, data: Partial<Player>): Promise<Player> {
    const player = await this.getPlayer(id);
    if (!player) throw new Error("Player not found");
    
    const updatedPlayer = { ...player, ...data };
    this.players.set(id, updatedPlayer);
    return updatedPlayer;
  }

  async getLeaderboard(): Promise<Player[]> {
    return Array.from(this.players.values())
      .sort((a, b) => b.money - a.money);
  }
}

export const storage = new MemStorage();
