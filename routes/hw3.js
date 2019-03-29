const express = require('express');
const router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  const options = {
    url: 'https://api.weather.gov/gridpoints/BOX/70,76/forecast',
    // doc: https://www.weather.gov/documentation/services-web-api
    headers: {
      'User-Agent': 'tli92@bu.edu for project demo'
    }
  };
  request(options, (err, response, body) => {
    let retrieve = () => {
      if (err || response.statusCode != 200)
        return false;
      const {properties} = JSON.parse(body);
      if (!properties)
        return false;
      const {updateTime, periods} = properties;
      if (!updateTime || !periods)
        return false;
      if (!periods[0])
        return false;
      const info = periods[0];
      res.render('hw3', {title: 'Boston Weather', updateTime: updateTime, info: info});
      return true;
    };
    if (!retrieve()){
      res.status(404).send('weather info is not found.');
    }
  })
});

module.exports = router;
