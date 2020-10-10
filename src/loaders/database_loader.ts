import config from "../config";
import { connect } from "mongoose";

export default async (): Promise<any> => {
  const connection = await connect(config.database_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${connection.connection.host}`);

  return connection.connection.db;
};
