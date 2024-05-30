import { createExpressApp } from "./app.js";

async function startServer() {
  const { env } = await import("./env.js");

  const app = createExpressApp();

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server error", error);
});
