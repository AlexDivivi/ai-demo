import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import WineQuality from './wine/WineQuality'
import MyWines from './wine/MyWines'
import Chatbot from './chatbot/Chatbot'

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
  display: flex;
  bottom: 0;
  position: sticky;
  opacity: 0.8;

  a:any-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;
    font-family: 'Noto Serif', serif;
    font-weight: 100;
    letter-spacing: 0.1em;
    width: 100%;
    background: #efefef;

    &.active {
      background: ${colorGrey};
      color: white;
    }
  }
`

class App extends Component {
  state = {
    wineResults: this.loadWines(),
    chatbotActive: false
  }

  wineCallback = savedResults => {
    const results = [...this.state.wineResults, savedResults]
    this.setState({
      wineResults: results
    })
  }

  wineDelete = id => {
    const { wineResults } = this.state
    const index = wineResults.findIndex(data => id === data.id)
    const updateValue = [
      ...wineResults.slice(0, index),
      ...wineResults.slice(index + 1)
    ]
    this.setState({
      wineResults: updateValue
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
            />
            {this.saveWines()}
            <Route
              path="/mywines"
              exact
              render={() => (
                <MyWines
                  wines={this.state.wineResults}
                  onClick={this.wineDelete}
                />
              )}
            />
            {this.state.chatbotActive && (
              <Route path="/chatbot" exact render={() => <Chatbot />} />
            )}
          </div>
          <WrapperFooter>
            <NavLink exact to="/">
              Wine Quality
            </NavLink>
            <NavLink exact to="/mywines">
              My Wines
            </NavLink>
            {this.state.chatbotActive && (
              <NavLink exact to="/chatbot">
                Chatbot
              </NavLink>
            )}
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
