
const express = require("express");
const morgan = require("morgan");
const dotEnv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");
const app = express();

// Routes import
const userRoute = require("./routes/v1/user.route");

const { errors } = require("celebrate");

// Config env file
dotEnv.config();

// Body parser
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Enable cors
app.use(
  cors({
    origin: "*",
  })
);

// Connect MongoDB
connectDB();

// Request Logger
if (process.env.NODE_ENV == "dev") {
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
}

app.use((err, req, res, next) => {
  console.log("err", err);
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      message: err.error.toString(),
    });
  }
});

// Routes
app.use("/api/v1/user", userRoute);

app.all('*', function (req, res) {
  res.sendFile(__dirname+'/public/error.html');
})

// Joi error handling
app.use(errors());

// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

module.exports = app;



