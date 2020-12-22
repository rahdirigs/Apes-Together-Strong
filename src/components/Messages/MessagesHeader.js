import React, { Component } from "react"
import { Segment, Header, Icon, Input } from "semantic-ui-react"

class MessagesHeader extends Component {
  render() {
    return (
      <Segment clearing>
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            Channel
            <Icon name="star outline" color="black" />
          </span>

          <Header.Subheader>69 Users</Header.Subheader>
        </Header>

        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="SearchMessages"
          />
        </Header>
      </Segment>
    )
  }
}

export default MessagesHeader
