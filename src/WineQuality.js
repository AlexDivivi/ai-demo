import React, { Component } from 'react'
import NeuralNetwork from './NeuralNetwork'

export default class WineQuality extends Component {
  render() {
    return (
      <div>
        <img src="images/dataset-cover.jpg" alt="dateset-cover" />
        <NeuralNetwork />
      </div>
    )
  }
}
