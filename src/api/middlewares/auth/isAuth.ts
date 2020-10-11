import { Request } from "express";
import jwt from "express-jwt";
import config from "../../../config";

const getTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  } else {
    return null;
  }
};

export default jwt({
  secret: config.token_secret,
  userProperty: "token", // this is where the next middleware can find the encoded data generated in services/auth:generateToken
  getToken: getTokenFromHeader,
  algorithms: ["HS256"],
});
