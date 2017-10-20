var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('entered text: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form id={this.props.id} onSubmit={this.handleSubmit} >
        <input
            className='input'
            placeholder='location'
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
            autoComplete='off' />
        <Link
          className='button'
          to={{
            pathname: '/forecast',
            search: '?city=' + this.state.value
          }}
          type='submit'>
            Get Weather
        </Link>
      </form>
    );
  }
}

module.exports = Input; 