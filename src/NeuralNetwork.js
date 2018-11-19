import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'

export default class NeuralNetwork extends Component {
  state = {
    result: 0
  }

  async makePrediction(xs) {
    let model = await tf.loadModel('data/model/model.json')
    const prediction = model.predict(xs, { batchSize: 1 }).flatten()
    const result = Math.round(prediction.get([0]))
    return result
  }
  componentDidMount() {
    const xs = tf.tensor2d([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]])
    const result = async () => await this.makePrediction(xs)
    result().then(result =>
      this.setState({
        result: result
      })
    )
  }

  render() {
    return <div>{this.state.result}</div>
  }
}
