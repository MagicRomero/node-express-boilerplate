import config from "../config";
import mongoose from "mongoose";

export default async (): Promise<any> => {
  const connection = await mongoose.connect(config.database_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${connection.connection.host}`);

  return connection.connection.db;
};
