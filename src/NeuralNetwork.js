import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'
import styled from 'styled-components'

const Result = styled.div`
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  letter-spacing: 0.1em;
  color: rgb(100, 100, 100);
`

const SaveButton = styled.button``

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
        <input ref={textInput} type="text" placeholder="Your Name..." />
        <SaveButton
          onClick={event => this.saveResult(textInput.current.value, event)}
        >
          Save
        </SaveButton>
      </React.Fragment>
    )
  }
}
