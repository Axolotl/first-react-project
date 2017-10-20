var axios = require('axios');
var React = require('react');

var id = '12872d763c0bc573a8c67f8bfd8c030c';
var url = 'http://api.openweathermap.org/data/2.5/';

//don't use getWeather(), not wired up properly

function getWeather (city) {
  return axios.get(url + 'weather?q=' + city + '&type=accurate&APPID=' + id)
}

function getForecast (city) {
  return axios.get(url + 'forecast?q=' + city + '&type=accurate&APPID=' + id /*+ '&cnt=5'*/)
    .then(function (response) {
      return response.data.list;
    })
}

module.exports = {
  getWeather: function (city) {
    return getWeather(city)
  },
  getForecast: function (city) {
    return getForecast(city)
  }
}