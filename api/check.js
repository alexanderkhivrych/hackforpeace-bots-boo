const express = require("express");
const router = express.Router();
const getMatchScoresByUserNames = require("./server/getMatchScoresByUserNames");

/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/", async (req, res) => {
  const exampleBulkUserData = ["@SVecerinka", "@sasha_khivrych"];
  const botometerResults = await getMatchScoresByUserNames(exampleBulkUserData);


 return res.json(botometerResults)
});

module.exports = router;
