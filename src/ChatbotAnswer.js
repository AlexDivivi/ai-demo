import React, { Component } from 'react'
import { postMessage } from './service'

export default class ChatbotAnswer extends Component {
  state = {
    message: null
  }

  componentWillMount() {
    postMessage().then(message => {
      this.setState({
        message: message.response
      })
    })
  }

  render() {
    return <div>{this.state.message}</div>
  }
}
