import { Application } from "express";
import express_loader from "./express_loader";
import database_loader from "./database_loader";

export default async (app: Application) => {
  await database_loader();
  await express_loader({ app });
};
