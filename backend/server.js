const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5003;
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const { connectDB } = require("./config/db");

connectDB();

const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ limit:'50mb', extended: false }));

app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));


app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port:${port}`);
});
