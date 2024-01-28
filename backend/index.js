const express = require("express");
const { PORT } = require("./config");
const cors = require("cors");
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5",
  })
);

app.use(bodyParser.json());
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log("Listening on PORT: ", PORT);
});
