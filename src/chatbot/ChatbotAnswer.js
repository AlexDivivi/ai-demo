import React, { Component } from 'react'
import { postMessage } from './service'

export default class ChatbotAnswer extends Component {
  state = {
    message: null
  }

  componentWillReceiveProps() {
    postMessage(this.props.context).then(message => {
      this.setState({
        message: message.response
      })
    })
  }

  render() {
    return <React.Fragment>{this.state.message}</React.Fragment>
  }
}
