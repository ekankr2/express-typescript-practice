import express from "express";
import { env } from "./env";
import { logger } from "./utils/Logger";
import { useSentry } from "./utils/Sentry";
import cors from "cors";
import helmet from "helmet";
import routes from "./api";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRouter();
  }

  private setMiddlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
  }

  private setRouter(): void {
    this.app.get("/", (req, res) => res.send("OK"));
    this.app.use(env.app.apiPrefix, routes());
  }

  public async createExpressServer(port: number) {
    try {
      useSentry(this.app);

      this.app.listen(port, () => {
        logger.info(`Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
