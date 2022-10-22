const requestUserScores = require("./single")
const exampleUserData = require("./exampleuser.json")
const exampleBulkUserData = new Array(100).fill(exampleUserData)

const requestBulkUserScores = (bulkUserData) => {
  Promise
    .all(bulkUserData.map((userData) => requestUserScores(userData)))
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

requestBulkUserScores(exampleBulkUserData)