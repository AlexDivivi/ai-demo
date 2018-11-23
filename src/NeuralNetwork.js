import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'
import styled from 'styled-components'

const Result = styled.div`
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  letter-spacing: 0.1em;
  color: #751d27;
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

  saveResult(userName, event) {
    event.preventDefault()
    let features = this.props.data.map(item => (features = item))
    const result = this.makePrediction()
    const results = { userName: userName, features, result }

    this.props.callback(results)
  }

  render() {
    const textInput = React.createRef()
    return (
      <React.Fragment>
        <Result>{this.makePrediction()} / 10</Result>{' '}
        <SaveBox>
          <input
            style={{ borderRadius: '5px', border: '0' }}
            ref={textInput}
            type="text"
            placeholder="Your Name..."
            required
          />
          <SaveButton
            onClick={event =>
              textInput.current.value &&
              this.saveResult(textInput.current.value, event)
            }
          >
            Save
          </SaveButton>
        </SaveBox>
      </React.Fragment>
    )
  }
}
