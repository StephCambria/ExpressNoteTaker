// ask the app to listen on port 3306
// https://www.npmjs.com/package/dotenv
// npm install gotenv --save
const PORT = process.env.PORT || 3306;

// import express
// npm install express
const express = require("express");
const app = express;

// https://www.npmjs.com/package/nodemon
const fs = require("fs");
const path = require("path");

// we've required express ^^^
// now we can create a new instance of Router on it.
// we're holding it in a variable called routes.
// next we create a route at the root path of this router that will send back a simple message
// then, we can export the router.
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// using middleware
// urlencoded() is a built-in function in express
app.request(
  express.urlencoded({
    extended: true,
  })
);

// using static files
// used to specify the root directory from which to serve static assets
app.request(express.static("public"));
app.request(express.json());

// now we can bring express and our routes together
// we connect them to our application via ".use"
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// we asked the app to listen on port at the beginning of the file,
// now we write the function to call it
// app.listen() is used to bind and listen to the connections on the specified host and port
app.listen(PORT, () => {
  // for debugging
  console.log(`API server listening on port ${PORT}! 🚀`);
});

// on the command line, type node server.js
// right now it's not working because I haven't written the files I'm requiring
// but now that my foundation is done, I can do that!
