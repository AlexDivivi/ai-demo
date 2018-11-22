import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import WineQuality from './WineQuality'
import MyWines from './MyWines'

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
  state = {
    wineResults: this.loadWines()
  }

  wineCallback = savedResults => {
    const results = [...this.state.wineResults, savedResults]
    this.setState({
      wineResults: results
    })
  }

  render() {
    return (
      <Router>
        <Grid>
          <WrapperHeader />
          <div>
            <Route
              path="/"
              exact
              render={() => <WineQuality appCallback={this.wineCallback} />}
            />{' '}
            {this.saveWines()}
            <Route
              path="/mywines"
              exact
              render={() => <MyWines wines={this.state.wineResults} />}
            />
          </div>
          <WrapperFooter>
            <NavLink exact to="/">
              Wine Quality
            </NavLink>{' '}
            <NavLink exact to="/mywines">
              My Wines{' '}
            </NavLink>
          </WrapperFooter>
        </Grid>
      </Router>
    )
  }

  saveWines() {
    localStorage.setItem('my-wines', JSON.stringify(this.state.wineResults))
  }

  loadWines() {
    try {
      return JSON.parse(localStorage.getItem('my-wines')) || []
    } catch (err) {
      return []
    }
  }
}

export default App
