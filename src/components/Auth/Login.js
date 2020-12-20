import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react"
import firebase from "../../firebase"
import "../../styles/App.css"

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  isFormValid = ({ email, password }) => {
    return email && password
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser)
        })
        .catch((err) => {
          console.log(err)
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          })
        })
    }
  }

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>)

  handleInputErrors = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : ""
  }

  render() {
    const { email, password, errors, loading } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="red" textAlign="center">
            <Icon name="send" color="red" />
            Login to Apes Together Strong
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                value={email}
                placeholder="Enter your e-mail address"
                type="email"
                onChange={this.handleChange}
                className={this.handleInputErrors(errors, "email")}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                value={password}
                placeholder="Enter your password"
                type="password"
                onChange={this.handleChange}
                className={this.handleInputErrors(errors, "password")}
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                fluid
                color="red"
                size="large"
              >
                Login
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>Error: {this.displayErrors(errors)}</Message>
          )}

          <Message>
            New user? <Link to="/register">signup here</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
