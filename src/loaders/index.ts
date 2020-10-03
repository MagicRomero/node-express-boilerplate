import { Application } from "express";
import express_loader from "./express_loader";

export default async (app: Application) => {
  await express_loader({ app });
};
