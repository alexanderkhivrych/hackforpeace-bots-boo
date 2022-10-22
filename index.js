const express = require("express");
const cors = require('cors')
const app = express();
const checkUser = require("./api/check");
/* example using https://github.com/dougmoscrop/serverless-http */
// const expressApp = require('./server/app');

// We need to define our function name for express routes to set the correct base path
const functionName = 'botsboo'

// Initialize express app
// const app = expressApp(functionName)

// Export lambda handler
app.use("/api/check", checkUser );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  next();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
