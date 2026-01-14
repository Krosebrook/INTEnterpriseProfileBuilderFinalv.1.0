import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { ROIInputs } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/platforms", async (_req, res) => {
    try {
      const platforms = await storage.getAllPlatforms();
      res.json(platforms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch platforms" });
    }
  });

  app.get("/api/platforms/:id", async (req, res) => {
    try {
      const platform = await storage.getPlatformById(req.params.id);
      if (!platform) {
        return res.status(404).json({ message: "Platform not found" });
      }
      res.json(platform);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch platform" });
    }
  });

  app.post("/api/platforms/compare", async (req, res) => {
    try {
      const { ids } = req.body as { ids: string[] };
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Platform IDs required" });
      }
      if (ids.length > 4) {
        return res.status(400).json({ message: "Maximum 4 platforms for comparison" });
      }
      const platforms = await storage.getPlatformsByIds(ids);
      res.json(platforms);
    } catch (error) {
      res.status(500).json({ message: "Failed to compare platforms" });
    }
  });

  app.get("/api/strategy", async (_req, res) => {
    try {
      const tiers = await storage.getStrategyTiers();
      res.json(tiers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch strategy tiers" });
    }
  });

  app.post("/api/roi/calculate", async (req, res) => {
    try {
      const inputs = req.body as ROIInputs;
      if (!inputs.employees || !inputs.averageSalary) {
        return res.status(400).json({ message: "Invalid ROI inputs" });
      }
      const results = await storage.calculateROI(inputs);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate ROI" });
    }
  });

  return httpServer;
}
