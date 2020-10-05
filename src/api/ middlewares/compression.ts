import { Request, Response } from "express";
import compression from "compression";

export default compression({
  filter: (req: Request, res: Response) => {
    return req.headers["x-no-compression"]
      ? false
      : compression.filter(req, res);
  },
});
