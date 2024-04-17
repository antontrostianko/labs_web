const fs = require("fs");
const { app } = require("./app");

app.get("/info", async (req, res) => {
  console.log("sdgsdg");
  const data = fs.readFileSync("info.json", {});
  console.log(data);

  //   res.send(data);
});
