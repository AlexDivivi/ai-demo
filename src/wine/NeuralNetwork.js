import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'
import styled from 'styled-components'
import uid from 'uid'

const Result = styled.div`
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  letter-spacing: 0.1em;
  color: #751d27;
  font-size: 23px;
  padding-bottom: 10px;
`

const SaveButton = styled.button`
  font-family: 'Noto Serif', serif;
  letter-spacing: 0.1em;
  font-size: 14px;
  background: whitesmoke;
  border-radius: 5px;
  border: 0;
`

const SaveBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 45px;
`

export default class NeuralNetwork extends Component {
  state = {
    model: null,
    componentMount: false
  }

  async componentWillMount() {
    let model = await tf.loadModel('data/model/model.json')
    this.setState({
      model: model,
      componentMount: true
    })
  }

  makePrediction() {
    let features = this.props.data.map(item => (features = item.value))
    const xs = tf.tensor2d([features])
    if (this.state.componentMount) {
      let model = this.state.model
      const prediction = model.predict(xs, { batchSize: 1 }).flatten()
      const result = Math.round(prediction.get([0]))
      return result
    }
    const result = 0
    return result
  }

  saveResult(event) {
    event.preventDefault()
    let features = this.props.data.map(item => (features = item))
    const result = this.makePrediction()
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
        <Result>{this.makePrediction()} / 10</Result>
        <SaveBox>
          <input
            style={{ width: '70%', borderRadius: '5px', border: '0' }}
            ref={el => (this.textInput = el)}
            type="text"
            placeholder="Your Name..."
            required
          />
          <SaveButton
            onClick={event => this.textInput.value && this.saveResult(event)}
          >
            Save
          </SaveButton>
        </SaveBox>
      </React.Fragment>
    )
  }
}
