// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================

const { createProxyMiddleware } = require("http-proxy-middleware");

const compression = require("compression");
var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "../dist/paradise/browser/index.html"));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
var db = require("./models");
var session = require("express-session");
const { create } = require("domain");
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// Routes
// =============================================================
require("./routes/api-routes")(app);
var PORT = process.env.PORT || 8081;
const server = require("http").createServer(app);
var db = require("./models");


var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    // methods: ["GET", "POST"],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  //when a user connects, add them to the array
  socket.on("savePainting", () => {
    console.log("savePainting");
    io.emit("paintingSaved");
  });
  socket.on("joinGame", (data) => {
    console.log("joingame", data);
    if (users.find((user) => user.name === data.username)) {
      //set it back to the ip that sent the message
      socket.emit("error", "Username already exists");
    } else {
      socket.emit("gameJoined"); //add the user to the array
    }
  });
  socket.on("gameStart", (data) => {
    // console.log("gamestart", data);
    console.log("socket.id", socket.id);
    createNewUser(data, socket.id);
    io.emit("gameStart", users); //add the user to the array
  });
  socket.on("keyPressed", (data) => {
    // console.log("keyPressed", data);
    io.emit("changeHtml", data);
  });
  socket.on("disconnect", () => {
    console.log("disconnect socket", socket.id);
    //remove the user from the array
    users = users.filter((user) => user.socketid !== socket.id);
    io.emit("updateUsers", users);
  });

  //setinterval that sends the result of a generatesplath over to all users
});


db.sequelize.sync().then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});

// db.sequelize.sync().then(function() {
//   server.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);

//   });
// });
