import { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertPlayerSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  app.get("/api/leaderboard", async (_req, res) => {
    const leaderboard = await storage.getLeaderboard();
    res.json(leaderboard);
  });

  app.post("/api/players", async (req, res) => {
    const result = insertPlayerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const player = await storage.createPlayer(result.data);
    res.json(player);
  });

  app.patch("/api/players/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const player = await storage.updatePlayer(id, req.body);
    res.json(player);
  });

  return httpServer;
}
