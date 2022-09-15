const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5003;
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const { connectDB } = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/authRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port:${port}`);
});
