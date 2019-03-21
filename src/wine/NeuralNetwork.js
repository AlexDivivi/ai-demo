import React, { Component } from 'react'
import styled from 'styled-components'
import uid from 'uid'
import { getPred } from './service'

const Result = styled.div`
  font-weight: bold;
  color: #751d27;
  letter-spacing: 0.1em;
  font-size: 23px;
  padding-bottom: 10px;
`

const SaveButton = styled.button`
  font-size: 14px;
  background: rgb(100, 100, 100);
  color: whitesmoke;
  border-radius: 0 5px 5px 0;
  border: 0;
  width: 30%;
`

const SaveBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 45px;
`

const SaveInput = styled.input`
  border-radius: 5px 0 0 5px;
  border: 0;
  background-color: whitesmoke;
  padding-left: 15px;
  font-size: 14px;
  width: 70%;
  height: 40px;
`

export default class NeuralNetwork extends Component {
  state = {
    result: 0
  }

  async componentWillReceiveProps() {
    let features = this.props.data.map(item => (features = item.value))
    await getPred(features).then(pred => {
      this.setState({
        result: pred
      })
    })

    console.log(this.state.result)
  }

  saveResult(event) {
    event.preventDefault()
    let features = this.props.data.map(item => (features = item))
    const result = this.state.result
    const results = {
      userName: this.textInput.value,
      features,
      result,
      id: uid()
    }
    this.props.callback(results)
    this.textInput.value = ''
  }

  render() {
    return (
      <React.Fragment>
        <Result>
          {typeof this.state.result == 'number'
            ? this.state.result + ' / 10'
            : 'Error ' + this.state.result.status}
        </Result>
        <SaveBox>
          <SaveInput
            ref={el => (this.textInput = el)}
            type="text"
            placeholder="Your Name..."
            required
          />
          <SaveButton
            onClick={event => this.textInput.value && this.saveResult(event)}
          >
            save
          </SaveButton>
        </SaveBox>
      </React.Fragment>
    )
  }
}
