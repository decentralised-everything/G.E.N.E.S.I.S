const router = require("./server");
const authUser = require("./auth");
const app = require("express");
const cookieParser = require("cookie-parser");

app.use(cookieParser())
app.use(authUser);
app.use("/", router);
let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`listening at localhost:${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    syncWithRootState();
  }
});
