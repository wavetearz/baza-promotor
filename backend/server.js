const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/promotors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb://127.0.0.1:27017/promotory`, {}).then(() => console.log("connected"))

app.use("/promotors", mainRouter);

app.listen(4000, () => console.log("backend working"));