import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { roiInputsSchema, platformCompareSchema, prdInputSchema } from "@shared/validation";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fromError } from "zod-validation-error";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" },
});

const roiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many ROI calculations, please try again later" },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  const isDev = process.env.NODE_ENV === "development";
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: isDev 
          ? ["'self'", "https:", "ws:", "wss:"] 
          : ["'self'", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  app.use("/api", apiLimiter);
  
  try {
    await setupAuth(app);
    registerAuthRoutes(app);
  } catch (error) {
    console.warn("Auth setup skipped (not in Replit environment):", error instanceof Error ? error.message : error);
  }
  
  app.get("/api/platforms", async (_req: Request, res: Response) => {
    try {
      const platforms = await storage.getAllPlatforms();
      res.json(platforms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch platforms" });
    }
  });

  app.get("/api/platforms/:id", async (req: Request, res: Response) => {
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

  app.post("/api/platforms/compare", async (req: Request, res: Response) => {
    try {
      const parseResult = platformCompareSchema.safeParse(req.body);
      if (!parseResult.success) {
        const error = fromError(parseResult.error);
        return res.status(400).json({ message: error.toString() });
      }
      
      const { ids } = parseResult.data;
      const platforms = await storage.getPlatformsByIds(ids);
      
      if (platforms.length === 0) {
        return res.status(404).json({ message: "No valid platforms found" });
      }
      
      if (platforms.length !== ids.length) {
        const foundIds = platforms.map(p => p.id);
        const missingIds = ids.filter(id => !foundIds.includes(id));
        return res.status(400).json({ 
          message: `Invalid platform IDs: ${missingIds.join(", ")}`,
          validPlatforms: platforms,
        });
      }
      
      res.json(platforms);
    } catch (error) {
      res.status(500).json({ message: "Failed to compare platforms" });
    }
  });

  app.get("/api/strategy", async (_req: Request, res: Response) => {
    try {
      const tiers = await storage.getStrategyTiers();
      res.json(tiers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch strategy tiers" });
    }
  });

  app.post("/api/roi/calculate", roiLimiter, async (req: Request, res: Response) => {
    try {
      const parseResult = roiInputsSchema.safeParse(req.body);
      if (!parseResult.success) {
        const error = fromError(parseResult.error);
        return res.status(400).json({ message: error.toString() });
      }
      
      const results = await storage.calculateROI(parseResult.data);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate ROI" });
    }
  });

  app.post("/api/prd/generate", async (req: Request, res: Response) => {
    try {
      const parseResult = prdInputSchema.safeParse(req.body);
      if (!parseResult.success) {
        const error = fromError(parseResult.error);
        return res.status(400).json({ message: error.toString() });
      }
      
      const prd = await storage.generatePRD(parseResult.data);
      res.json(prd);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate PRD" });
    }
  });

  return httpServer;
}
