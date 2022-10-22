const getBotometrMatchScoreData = require("./getBotometrMatchScoreData")

const getMatchScoresByUserNames = (usernames = []) =>
  Promise
    .all(usernames.map(getBotometrMatchScoreData))
    .catch(err => console.log(err))


module.exports = getMatchScoresByUserNames;
