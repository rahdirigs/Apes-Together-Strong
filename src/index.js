import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import "semantic-ui-css/semantic.min.css"

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()