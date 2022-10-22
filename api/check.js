const express = require("express");
const router = express.Router();
const getMatchScoresByUserNames = require("./utils/getMatchScoresByUserNames");
const DataLoader = require('dataloader')

const loader = new DataLoader(usernames => getMatchScoresByUserNames(usernames))
router.get("/", async (req, res) => {
  if(!req.query.usernames) {
    res.status(400);
    return res.send('usernames no specified');
  }
  const usernames = req.query.usernames.split(',').map((u) => `@${u}`);
  const botometerResults = await loader.loadMany(usernames)

  return res.send(botometerResults)
});

module.exports = router;
