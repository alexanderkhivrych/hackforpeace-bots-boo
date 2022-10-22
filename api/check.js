const express = require("express");
const router = express.Router();
const getMatchScoresByUserNames = require("./utils/getMatchScoresByUserNames");
const DataLoader = require('dataloader')

const loader = new DataLoader(usernames => getMatchScoresByUserNames(usernames))
router.get("/", async (req, res) => {
  const exampleBulkUserData = ["@SVecerinka", "@sasha_khivrych"];
  const botometerResults = await loader.loadMany(exampleBulkUserData)

 return res.json(botometerResults)
});

module.exports = router;
