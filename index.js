const exampleBulkUserData = ["@SVecerinka", "@sasha_khivrych"];

const getMatchScoresByUserNames = require("./server/getMatchScoresByUserNames");

(async () => {
  const botometerResults = await getMatchScoresByUserNames(exampleBulkUserData);

  console.log(botometerResults);
})()
