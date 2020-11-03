var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


var usersRouter = require("./routes/users");
var movieRouter = require("./routes/movie");
var cinemaRouter = require("./routes/cinemas");
var cors = require("cors");
var app = express();
var mongoose = require("mongoose");
app.use(cors());

require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://thang:thang@cluster0-q8vge.mongodb.net/SUN?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(Error, err.message);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


app.use("/users", usersRouter);
app.use("/movies", movieRouter);
app.use("/cinemas", cinemaRouter);

module.exports = app;
