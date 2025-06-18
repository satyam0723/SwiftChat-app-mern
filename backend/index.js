import connectDB from "./db/db.js";
import { app } from "./app.js";
import { PORT } from "./config.js";
import setupSocket from "./socket.js";

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}/`);
    });
    setupSocket(server);
    console.log("Socket.io server setup complete");
  })
  .catch((err) => {
    console.log("Server not started : ", err);
  });
