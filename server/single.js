const axios = require("axios");
const exampleUserData = require("./exampleuser.json");

const requestUserScores = (userData) => {
  const options = {
    method: 'POST',
    url: 'https://botometer-pro.p.rapidapi.com/4/check_account',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '82dbbc8ae6msh227f257d810b049p15dec8jsnee0be1a5dddb',
      'X-RapidAPI-Host': 'botometer-pro.p.rapidapi.com'
    },
    data: userData
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

requestUserScores(exampleUserData);