var React = require('react');
var Input = require('./Input');
var NavLink = require('react-router-dom').NavLink;
var pattern = require('../images/pattern.svg');

var bodyStyle = {
  backgroundImage: 'url(' + pattern + ')',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center'
};

class Home extends React.Component {
  render () {
    return (
      <div className='bodyClass' id='home' style={bodyStyle}>
        <p id='home-text'>Enter a Place</p>
        <Input id='home-input'/>
      </div>
      )
  }
}

module.exports = Home;