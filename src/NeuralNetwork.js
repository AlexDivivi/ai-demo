import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'
import styled from 'styled-components'

const Result = styled.div`
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  letter-spacing: 0.1em;
  color: rgb(100, 100, 100);
`

export default class NeuralNetwork extends Component {
  state = {
    result: 0
  }

  componentDidMount() {
    let features = this.props.data.map(item => (features = item.value))
    console.log(features)
    const xs = tf.tensor2d([features])
    const result = async () => await this.makePrediction(xs)
    result().then(result =>
      this.setState({
        result: result
      })
    )
  }

  async makePrediction(xs) {
    let model = await tf.loadModel('data/model/model.json')
    const prediction = model.predict(xs, { batchSize: 1 }).flatten()
    const result = Math.round(prediction.get([0]))
    return result
  }

  render() {
    return <Result>{this.state.result} / 10</Result>
  }
}
