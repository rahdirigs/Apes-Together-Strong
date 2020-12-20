import React, { Component } from "react"
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react"
import firebase from "../../firebase"

export default class UserPanel extends Component {
  state = { user: this.props.currentUser }

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed Out..."))
  }

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignOut}>SignOut</span>,
    },
  ]

  render() {
    const { user } = this.state

    return (
      <Grid style={{ background: "#5600eb" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "0.25em", margin: 0 }}>
            <Header inverted floated="left" as="h3">
              <Icon name="send" />
              <Header.Content>Apes Together Strong</Header.Content>
            </Header>
          </Grid.Row>

          <Header style={{ padding: "0.5em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={user.photoURL} spaced="right" avatar />
                  {user.displayName}
                </span>
              }
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    )
  }
}
