import React, { Component } from "react"
import {
  Icon,
  Menu,
  Modal,
  Input,
  Form,
  Button,
  Message,
} from "semantic-ui-react"
import firebase from "../../firebase"
import { connect } from "react-redux"
import { setCurrentChannel } from "../../actions"

class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    errors: [],
    firstLoad: true,
    activeChannel: "",
  }

  setFirstChannel = () => {
    if (this.state.firstLoad && this.state.channels.length > 0) {
      const firstChannel = this.state.channels[0]
      this.props.setCurrentChannel(firstChannel)
      this.setActiveChannel(firstChannel)
    }
    this.setState({ firstLoad: false })
  }

  addListeners = () => {
    let loadedChannels = []
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val())
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel())
    })
  }

  removeListeners = () => {
    this.state.channelsRef.off()
  }

  componentDidMount() {
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  closeModal = () => {
    this.setState({ modal: false })
  }

  openModal = () => {
    this.setState({ modal: true })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  isFormValid = ({ channelName, channelDetails }) => {
    return channelName && channelDetails
  }

  addChannel = () => {
    const { user, channelName, channelDetails, channelsRef } = this.state

    const key = channelsRef.push().key
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    }
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" })
        this.closeModal()
        console.log("Channel added")
      })
      .catch(err => {
        this.setState({ errors: this.state.errors.concat(err) })
      })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.isFormValid(this.state)) {
      this.addChannel()
    } else {
      let error
      let errors = []
      error = { message: "Please fill out all fields..." }
      this.setState({ errors: errors.concat(error) })
    }
  }

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>)

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }

  changeChannel = channel => {
    this.props.setCurrentChannel(channel)
    this.setActiveChannel(channel)
  }

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ))

  render() {
    const { channels, channelName, channelDetails, modal, errors } = this.state

    return (
      <>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS{" "}
            </span>
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>

          {this.displayChannels(channels)}
        </Menu.Menu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>

          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Channel Name"
                  name="channelName"
                  value={channelName}
                  onChange={this.handleChange}
                />

                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  value={channelDetails}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          {errors.length && (
            <Message error>{this.displayErrors(errors)}</Message>
          )}

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" />
              Add
            </Button>

            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

export default connect(null, { setCurrentChannel })(Channels)
