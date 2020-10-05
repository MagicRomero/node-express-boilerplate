import rateLimit from "express-rate-limit";

export default rateLimit({
  windowMs: 15 * 60 * 100,
  max: 50,
  message: "Too many request attempt detected, please try again after 15 min",
});
