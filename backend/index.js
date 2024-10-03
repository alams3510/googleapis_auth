const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;
const authRouter = require("./routes/authRouter");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

require("./model/dbConnection");

app.use("/auth", authRouter);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(port, () => {
  console.log("server is running on port : ", port);
});
