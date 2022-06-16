require("dotenv").config();
require("./config/dbConnect");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", authRoutes);

app.listen(7200, () => console.log("Listening..."));