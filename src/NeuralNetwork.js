import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'

export default class NeuralNetwork extends Component {
  state = {
    result: 0
  }

  loadModel() {
    tf.loadModel('data/model/model.json').then(model =>
      this.makePrediction(model)
    )
  }

  makePrediction(model) {
    const xs = tf.tensor2d([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]])
    const prediction = model.predict(xs, { batchSize: 1 }).flatten()
    const result = prediction.get([0])
    this.setState({
      result: result
    })
  }

  render() {
    return (
      <div>
        {this.loadModel()}
        {this.state.result}
      </div>
    )
  }
}
