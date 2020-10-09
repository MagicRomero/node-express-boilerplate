import mongoSanitize from "express-mongo-sanitize";

export default mongoSanitize({
  replaceWith: "_",
});
