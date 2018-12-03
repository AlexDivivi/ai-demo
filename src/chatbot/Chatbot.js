import React, { Component } from 'react'
import styled from 'styled-components'
import uid from 'uid'
import ChatbotAnswer from './ChatbotAnswer'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`

const ChatBox = styled.div`
  height: 500px;
  width: 400px;
  background: white;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
`

const ChatAnswer = styled.span`
  margin-right: auto;
`

const ChatUserMessage = styled.span`
  margin-left: auto;
`

export default class Chatbot extends Component {
  state = {
    context: ['Hello', 'Hello', 'Hello'],
    chatLog: []
  }

  updateContext() {
    const moveContext1 = this.state.context[1]
    const moveContext2 = this.state.context[2]

    const newContext = [moveContext1, moveContext2, this.textInput.value]

    this.setState({
      context: newContext
    })

    this.updateChatLog()
  }

  updateChatLog() {
    const newLog = [
      { user: true, message: this.textInput.value },
      { user: false, message: this.response.innerText },
      ...this.state.chatLog
    ]
    this.textInput.value = ''

    this.setState({
      chatLog: newLog
    })
  }

  renderChat() {
    return (
      <React.Fragment>
        <ChatAnswer ref={el => (this.response = el)}>
          <ChatbotAnswer context={this.state.context} />
        </ChatAnswer>
        {this.renderChatLog()}
      </React.Fragment>
    )
  }

  renderChatLog() {
    return this.state.chatLog.map(entry =>
      entry.user ? (
        <ChatUserMessage key={uid()}>{entry.message}</ChatUserMessage>
      ) : (
        <ChatAnswer key={uid()}>{entry.message}</ChatAnswer>
      )
    )
  }

  render() {
    return (
      <Wrapper>
        <ChatBox>
          <input
            ref={el => (this.textInput = el)}
            type="text"
            placeholder="Your message ... "
            required
            onKeyUp={event =>
              event.key === 'Enter' &&
              this.textInput.value &&
              this.updateContext()
            }
          />
          {this.renderChat()}
          {console.log(this.state.context)}
        </ChatBox>
      </Wrapper>
    )
  }
}
