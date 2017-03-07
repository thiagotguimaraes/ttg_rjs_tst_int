import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// require("bootstrap/less/bootstrap.less");

export default class App extends Component {

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>

), document.getElementById('root'))
