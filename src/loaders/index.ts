import express_loader from "./express_loader";

export default async ({ app }) => {
  await express_loader({ app });
};
