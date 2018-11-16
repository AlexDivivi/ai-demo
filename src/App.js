import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import PredictiveModel from './PredictiveModel'

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 55px;
  height: 100vh;
  background: whitesmoke;
`

class App extends Component {
  render() {
    return (
      <Router>
        <Grid>
          <div>
            <Route path="/" exact render={() => <PredictiveModel />} />
          </div>
          <NavLink exact to="/">
            PredictiveModel
          </NavLink>
        </Grid>
      </Router>
    )
  }
}

export default App
