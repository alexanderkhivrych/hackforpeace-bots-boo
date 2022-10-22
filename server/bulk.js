const axios = require("axios");
const exampleUserData = require("./exampleuser.json");

const requestBulkUserScores = (bulkUserData) => {
  const options = {
    method: 'POST',
    url: 'https://botometer-pro.p.rapidapi.com/litev1/check_accounts_in_bulk',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '82dbbc8ae6msh227f257d810b049p15dec8jsnee0be1a5dddb',
      'X-RapidAPI-Host': 'botometer-pro.p.rapidapi.com'
    },
    data: bulkUserData
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}
