import React, { Component } from "react"
import { Segment, Comment } from "semantic-ui-react"
import MessagesHeader from "./MessagesHeader"
import MessageForm from "./MessageForm"

export default class Messages extends Component {
  render() {
    return (
      <>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages"></Comment.Group>
        </Segment>

        <MessageForm />
      </>
    )
  }
}
