var React = require('react');
var Input = require('./Input');

class Header extends React.Component {
  render () {
    return (
      <div id='header'>
        <p id='header-text'>Simple Weather App</p>
        <Input id='header-input'/>
      </div>
      )
  }
}

module.exports = Header;