/* Express App */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");

const getMatchScoresByUserNames = require("./getMatchScoresByUserNames");


/* My express App */
function expressApp(functionName) {
  const app = express()
  const router = express.Router()

  // gzip responses
  router.use(compression())

  // Set router base path for local dev
  const routerBasePath = process.env.NODE_ENV !== 'production' ? `/${functionName}` : `/.netlify/functions/${functionName}/`


  router.get('/users', async (req, res) => {
    // const exampleBulkUserData = ["@SVecerinka", "@sasha_khivrych"];
    //  const botometerResults = await getMatchScoresByUserNames(exampleBulkUserData);


    res.json([])
  })


  // Setup routes
  app.use(routerBasePath, router)

  // Apply express middlewares
  router.use(cors())
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: true }))

  return app
}

module.exports = expressApp;
