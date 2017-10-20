var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Header = require('./Header');
var Home = require('./Home');
var Forecast = require('./Forecast');
var Detail = require('./Detail');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.setStore = this.setStore.bind(this);
  }
  setStore(data) {
    this.setState({ data });
  }
  render() {
    const { setStore } = this;
    const { data } = this.state;

    return (
      <Router>
        <div id='app-container'>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/forecast' render={props => <Forecast {...props} {...{ setStore, data }} />} />
            <Route path='/detail' render={props => <Detail {...props} {...{ data }} />} />
          </Switch>
        </div>
      </Router>
      )
  }
}

module.exports = App;
