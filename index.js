const DataLoader = require('dataloader')
const getMatchScoresByUserNames = require("./server/getMatchScoresByUserNames");

const loader = new DataLoader(usernames => getMatchScoresByUserNames(usernames))
const exampleBulkUserData = ["@SVecerinka", "@sasha_khivrych"];

const run = async () => {
  const botometerResults = await loader.loadMany(exampleBulkUserData)

  // console.log(botometerResults);
}

(async () => {
  for (i = 1; i < 4; i++) {
    console.time(`time taken for run ${i}`)
    await run()
    console.timeEnd(`time taken for run ${i}`)
  }
})()
