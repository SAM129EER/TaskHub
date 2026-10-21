import app from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 TaskHub Backend running on http://localhost:${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/health`);
});


const handleShutdown = (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down server gracefully...`);
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
