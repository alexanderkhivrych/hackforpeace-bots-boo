/* Express App */
const express = reqiure("express");
const cors = reqiure("cors");
const bodyParser = reqiure("body-parser");
const compression = reqiure("compression");

const getMatchScoresByUserNames = reqiure("./getMatchScoresByUserNames");


/* My express App */
export default function expressApp(functionName) {
  const app = express()
  const router = express.Router()

  // gzip responses
  router.use(compression())

  // Set router base path for local dev
  const routerBasePath = process.env.NODE_ENV !== 'production' ? `/${functionName}` : `/.netlify/functions/${functionName}/`


  router.get('/check/users', async (req, res) => {
    const exampleBulkUserData = ["@SVecerinka", "@sasha_khivrych"];
     const botometerResults = await getMatchScoresByUserNames(exampleBulkUserData);


    res.json(botometerResults)
  })


  // Setup routes
  app.use(routerBasePath, router)

  // Apply express middlewares
  router.use(cors())
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: true }))

  return app
}
