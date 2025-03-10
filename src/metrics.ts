import { Histogram, Registry } from "prom-client";
import { Request, Response, NextFunction } from "express";

const register = new Registry();

const httpRequestDuration: Histogram<string> = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "code"],
  registers: [register],
});

export function setupMetrics(app: any): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const end = httpRequestDuration.startTimer();
    res.on("finish", () => {
      end({
        method: req.method,
        route: req.path,
        code: res.statusCode.toString(),
      });
    });
    next();
  });

  app.get("/metrics", async (_req: Request, res: Response) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  });
}
