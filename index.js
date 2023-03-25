const express = require("express");
const app = express();

const path = __dirname + "/";
const port = 8080;

app.get("/", (req, res) => {
  res.sendFile(path + "src/index.html");
});

app.use(express.static('src'));

app.listen(port, () => console.log(`Listening on port ${port} ...`));
