import React, { Component } from 'react'
import styled from 'styled-components'
import uid from 'uid'
import { postMessage } from './service'
import { SiteTopImg } from '../GlobalStyle'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: 'Noto Sans SC', sans-serif;
`

const ChatBox = styled.div`
  height: 450px;
  width: 400px;
  background: white;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  overflow-y: scroll;
  box-shadow: 4px 4px 10px rgba(200, 200, 200, 0.5);
  border-radius: 5px;
  background: white;
  margin-top: 170px;
  margin-bottom: 40px;
`

const ChatAnswer = styled.span`
  margin: 0 0 10px 20px;
  margin-right: auto;
  background: whitesmoke;
  padding: 2px 5px 2px 5px;
  border-radius: 5px;
  max-width: 45%;
`

const ChatUserMessage = styled.span`
  margin: 0 20px 10px 0;
  margin-left: auto;
  background: whitesmoke;
  padding: 2px 5px 2px 5px;
  border-radius: 5px;
  max-width: 45%;
`

const ChatInput = styled.input`
  width: 90%;
  height: 30px;
  text-align: center;
  font-size: 18px;
  font-family: 'Noto Sans SC', sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 0;
`

export default class Chatbot extends Component {
  state = {
    context: ['Hello', 'Hello', 'Hello'],
    chatLog: []
  }

  async handleInput(event) {
    if (event.key === 'Enter' && this.textInput.value) {
      await this.updateContext()
      this.getResponse(this.state.context)
    }
  }

  getResponse(context) {
    postMessage(context).then(message => {
      this.setState({
        message: message.response
      })
    })
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
          {this.state.message}
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
        <SiteTopImg
          src="images/sergi-kabrera-705414-unsplash.jpg"
          alt="chatbot-cover"
        />
        <ChatBox>
          <ChatInput
            ref={el => (this.textInput = el)}
            type="text"
            placeholder="Your message ... "
            required
            onKeyUp={event => this.handleInput(event)}
          />
          {this.renderChat()}
        </ChatBox>
      </Wrapper>
    )
  }
}
