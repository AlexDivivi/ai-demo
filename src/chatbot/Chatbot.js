import React, { Component } from 'react'
import styled from 'styled-components'
import uid from 'uid'
import { postMessage } from './service'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: 'Noto Sans SC', sans-serif;
`

const ChatBox = styled.div`
  height: 80%;
  width: 40%;
  opacity: 0.9;
  background: white;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  overflow-y: scroll;
  border-radius: 8px;
  background: rgb(10, 10, 10);
  margin-bottom: 40px;
  padding: 30px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  @media only screen and (max-width: 1040px) {
    width: 95%;
    height: 90%;
  }
`

const ChatAnswer = styled.div`
  margin-right: auto;
  opacity: 1;
  margin-bottom: 15px;
  background: whitesmoke;
  padding: 15px;
  border-radius: 15px 15px 15px 0;
  max-width: 45%;
  text-align: left;
  line-height: 1.2em;
  font-size: 0.9em;
  color: black;
`

const ChatUserMessage = styled.div`
  margin-left: auto;
  opacity: 1;
  margin-bottom: 15px;
  background: whitesmoke;
  padding: 15px;
  border-radius: 15px 15px 0 15px;
  max-width: 45%;
  text-align: left;
  line-height: 1.2em;
  font-size: 0.9em;
  text-align: right;
  color: black;
`

const ChatInput = styled.input`
  width: 70%;
  font-size: 14px;
  font-family: 'Noto Sans SC', sans-serif;
  border-radius: 5px;
  border: 0;
  border-radius: 5px 0 0 5px;
  background-color: whitesmoke;
  padding-left: 15px;
  height: 40px;

  ::placeholder {
    color: black;
  }
`

const ChatInputWrapper = styled.div`
  display: block;
  opacity: 1;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(255, 255, 255, 1);
`

const ChatInputButton = styled.button`
  font-family: 'Noto Sans SC', sans-serif;
  height: 40px;
  font-size: 14px;
  background: #414141;
  color: whitesmoke;
  border-radius: 0 5px 5px 0;
  border: 0;
  width: 30%;

  :focus {
    border: none;
  }
`

const SiteImg = styled.img`
  top: 0;
  left: 0;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 100%;
`

export default class Chatbot extends Component {
  state = {
    context: ['Hello', 'Hello', 'Hello'],
    chatLog: [
      {
        user: false,
        message: 'Hi and welcome! You can talk to me about small things.'
      }
    ]
  }

  async handleInput() {
    await this.updateContext()
    this.getResponse(this.state.context)
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
      <React.Fragment>
        <SiteImg src="images/chat.jpg" />
        <Wrapper>
          <ChatBox>
            <ChatInputWrapper>
              <ChatInput
                ref={el => (this.textInput = el)}
                type="text"
                placeholder="Your message ... "
                required
                onKeyUp={event =>
                  event.key === 'Enter' &&
                  this.textInput.value &&
                  this.handleInput()
                }
              />
              <ChatInputButton
                onClick={() => this.textInput.value && this.handleInput()}
              >
                SEND
              </ChatInputButton>
            </ChatInputWrapper>
            {this.renderChat()}
          </ChatBox>
        </Wrapper>
      </React.Fragment>
    )
  }
}
