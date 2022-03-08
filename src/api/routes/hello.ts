import { Router, Request, Response } from "express";

const router = Router();

export default (app: Router) => {
  app.use("/hello", router);

  router.get("/me", (req: Request, res: Response) => {
    res.send("hello, world");
  });
};
