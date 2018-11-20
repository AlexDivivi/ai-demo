import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import WineQuality from './WineQuality'

const colorGrey = '#242424'

const Grid = styled.div`
  display: grid;
  grid-template-rows: 50px auto 50px;
  height: 100vh;
`

const WrapperHeader = styled.header`
  background: ${colorGrey};
  opacity: 0.8;
`

const WrapperFooter = styled.footer`
  background: ${colorGrey};
`

class App extends Component {
  render() {
    return (
      <Router>
        <Grid>
          <WrapperHeader />
          <div>
            <Route path="/" exact render={() => <WineQuality />} />
          </div>
          <WrapperFooter>
            <NavLink exact to="/">
              Wine Quality
            </NavLink>
          </WrapperFooter>
        </Grid>
      </Router>
    )
  }
}

export default App
