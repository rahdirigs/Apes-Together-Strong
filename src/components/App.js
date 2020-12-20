import React from "react"
import { Grid } from "semantic-ui-react"
import "../styles/App.css"
import ColorPanel from "./ColorPanel/ColorPanel"
import Messages from "./Messages/Messages"
import MetaPanel from "./MetaPanel/MetaPanel"
import SidePanel from "./SidePanel/SidePanel"
import { connect } from "react-redux"

const App = ({ currentUser }) => (
  <Grid columns="equal" className="app" style={{ background: "#eeeeee" }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
)

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App)
