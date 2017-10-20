var React = require('react');
var PropTypes = require('prop-types');
var dateFormat = require('dateformat');

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: props.location.search.match(/[0-9]/g).join(''),
      weather: {}
    }
  }
  convertTemp(temp) {
    return Math.floor(temp*(9/5)-459.67)
  }
  render() {
    const { data } = this.props;
    if (!data.response) {
      return (
        <div id='error'>
          <p id='errorText'>error!!</p>
        </div>
      )
    }

    else {
      return (
        <div id='forecastDetail'>
          {data.response.map((day) => {
            console.log(day.dt);
            if (day.dt == this.state.ID) {
              console.log('success');
              return (
                <ul id='forecastList'>
                  <li id='forecastCity' className='forecastItem'>
                    {data.city}</li>
                  <li id='forecastDate' className='forecastItem'>
                    {dateFormat(Date.parse(data.dt_txt), "dddd, mmmm dS")}</li>
                  <li id='forecastDescription' className='forecastItem'>
                    Weather: {day.weather[0].description}</li>
                  <li id='forecastTemp' className='forecastItem'>
                    Temp: {this.convertTemp(day.main.temp)}</li>
                  <li id='forecastHumidity' className='forecastItem'>
                    Humidity: {day.main.humidity}</li>
                </ul>
              )
            }
          })}
        </div>
      )
    }
  }
}

module.exports = Detail; 