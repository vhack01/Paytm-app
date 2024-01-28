const express = require("express");
const { PORT } = require("./config");
const apiRouter = require("./routes/index");
const app = express();

app.use(express.json());
app.use("/api/v1", apiRouter);

app.listen(PORT, () => {
  console.log("Listening on PORT: ", PORT);
});
