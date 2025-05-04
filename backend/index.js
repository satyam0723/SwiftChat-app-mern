import connectDB from "./db/db.js";
import { app } from "./app.js";
import { PORT } from "./config.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log("Server not started : ", err);
  });
