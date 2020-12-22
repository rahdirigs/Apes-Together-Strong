import React, { Component } from "react"
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react"

export default class ColorPanel extends Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
        color="black"
      >
        <Divider />
        <Button icon="add" size="small" color="blue"></Button>
      </Sidebar>
    )
  }
}
