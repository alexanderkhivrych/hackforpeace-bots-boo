const { Botometer } = require("botometer");

const botometer = new Botometer({
  consumerKey: "mgNyLdAfptsBWaPatkT4ikLbE",
  consumerSecret: "G5woIPH1jPmLdy1J1QTLraSlDBSs3ois0EUQkVoEMh8QWurl9J",
  accessToken: "701377153812791297-9FQ553Gm1TqsxXeYLotp2z7dNJrTb3c",
  accessTokenSecret: "pdmZeVxA4hgEN42vmOouNdZNCGaKJ20vujWApCT66OeeP",
  rapidApiKey: "82dbbc8ae6msh227f257d810b049p15dec8jsnee0be1a5dddb",
  supressLogs: true, // Not required. Defaults to true
  usePro: true,
  returnTwitterData: false,
});


async function getBotometrMatchScoreData(username) {
  const [result] = await botometer.getScores([username]);

  return result
}

module.exports = getBotometrMatchScoreData;
