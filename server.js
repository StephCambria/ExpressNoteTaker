// import express
// npm install express --save
const express = require("express");
const app = express();

// ask the app to listen on port 3000
const PORT = 5501;

// we've required express ^^^
// now we can create a new instance of Router on it.
// we're holding it in a variable called routes.
// next we create a route at the root path of this router that will send back a simple message
// then, we can export the router.
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// using static files
// used to specify the root directory from which to serve static assets
app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// now we can bring express and our routes together
// we connect them to our application via ".use"
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// we asked the app to listen on port at the beginning of the file,
// now we write the function to call it
// app.listen() is used to bind and listen to the connections on the specified host and port
app.listen(PORT, () => {
  // for debugging
  console.log(`Server listening on port ${PORT}! 🚀`);
});

// on the command line, type node server.js

// alternatively, type npm start,
// then in your browser, type localhost:3001
