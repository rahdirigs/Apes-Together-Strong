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
import md5 from "md5"
import "../../styles/App.css"

export default class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    )
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }

  isFormValid = () => {
    let errors = []
    let error

    if (this.isFormEmpty(this.state)) {
      error = { message: "Please Fill out all Fields before submitting" }
      this.setState({ errors: errors.concat(error) })
      return false
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "The passwords entered are invalid!!!" }
      this.setState({ errors: errors.concat(error) })
      return false
    } else {
      return true
    }
  }

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser)
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("User Saved")
                //this.setState({ loading: false })
              })
            })
            .catch((err) => {
              console.error(err)
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false,
              })
            })
        })
        .catch((err) => {
          console.error(err)
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
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading,
    } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="red" textAlign="center">
            <Icon name="send" color="red" />
            Register for Apes Together Strong
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Enter your username"
                value={username}
                type="text"
                onChange={this.handleChange}
              />

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

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                value={passwordConfirmation}
                placeholder="Confirm your password"
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
                Register
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>Error: {this.displayErrors(errors)}</Message>
          )}

          <Message>
            Existing user? <Link to="/login">login here</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
