import connectDB from "./db/db.js";
import { app } from "./app.js";
import { PORT } from "./config.js";
import setupSocket from "./socket.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${port}/`);
    });
    setupSocket(server);
    console.log("Socket.io server setup complete");
  })
  .catch((err) => {
    console.log("Server not started : ", err);
  });
