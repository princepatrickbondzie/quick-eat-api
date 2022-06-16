const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://qick-eat-gh:90quick-eat-gh@cluster0.ohlpm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected..."));
