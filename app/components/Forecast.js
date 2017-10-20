var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var api = require('../utils/api.js');
var dateFormat = require('dateformat');

var cloudsIcon = require('../images/weather-icons/04d.svg');
var rainIcon = require('../images/weather-icons/09d.svg');
var clearIcon = require('../images/weather-icons/01d.svg');
var elseIcon = require('../images/weather-icons/04n.svg');

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: decodeURI(props.location.search.replace('?city=','')),
      error: null,
      loading: true,
      weatherData: null
    };
    this.fetchForecastFromAPI = this.fetchForecastFromAPI.bind(this);
  }
  componentDidMount() {
    this.fetchForecastFromAPI(this.state.city);
  }
  componentWillReceiveProps(nextProps) {
    var newLocation = decodeURI(nextProps.location.search.replace('?city=',''));
    if (newLocation !== this.state.city) {
      this.setState(function () {
        return {
          city: newLocation,
          loading: true
        }
    });
      this.fetchForecastFromAPI(newLocation);
    };
  }
  fetchForecastFromAPI(city) {
    const { setStore } = this.props;

    this.setState(function () {
      return {
        loading: true,
        weatherData: null
      }
    });

    api.getForecast(city)
      .then(function (response) {
        console.log(response);
        setStore({
          response: response,
          city: city
        });
        this.setState(function () {
          return {
            loading: false,
            weatherData: response
          }
        });
    }.bind(this));
  }
  render () {
    const { data } = this.props;

    if (this.state.loading === true) {
      return (
          <div className='bodyClass'>
            <p style={{fontSize:"50px"}}>loading!</p>
          </div>
        )
    }
    return (
        <div id='forecast'>
          <p className='cityTitle'>{this.state.city}</p>
          <ul className='fiveDayForecast'>
            {this.state.weatherData.map((day) => {
              if (day.dt_txt.includes("12:00")) {
                var icon = '', date = Date.parse(day.dt_txt);
                date = dateFormat(date, "dddd, mmmm dS");
                if (day.weather[0].description.includes('clouds')) {
                  icon = cloudsIcon;
                }
                else if (day.weather[0].description.includes('rain')) {
                  icon = rainIcon;
                }
                else if (day.weather[0].description.includes('clear')) {
                  icon = clearIcon;
                }
                else {
                  icon = elseIcon;
                }
                return (
                  <li key={day.dt} className='forecastDay'>
                    <ul className='forecastIconAndDate'>
                      <Link 
                        className='iconToDetail'
                        to={{
                          pathname: '/detail',
                          search: '?city=' + this.state.city + '?param=' + day.dt
                        }}
                        type='submit'>
                        <img
                          className='icon'
                          src={icon}
                          als='alt for icon'
                        />
                      </Link>
                      <li>{date}</li>
                    </ul>
                  </li>
                  )
                }
            })}
          </ul>
        </div>
    )
  }
}

module.exports = Forecast;