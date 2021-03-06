import React, { Component } from 'react'
import uid from 'uid'
import { SiteTopImg } from '../GlobalStyle'

import Form from './Form'

export default class WineQuality extends Component {
  state = {
    wineData: [
      {
        name: 'fixed acidity',
        text:
          'most acids involved with wine or fixed or nonvolatile (do not evaporate readily)',
        min: 4.6,
        max: 15.9,
        value: 7.0,
        step: 0.1,
        id: uid()
      },
      {
        name: 'volatile acidity',
        text:
          'the amount of acetic acid in wine, which at too high of levels can lead to an unpleasant, vinegar taste',
        min: 0.12,
        max: 1.58,
        value: 0.6,
        step: 0.01,
        id: uid()
      },
      {
        name: 'citric acid',
        text:
          'found in small quantities, citric acid can add freshness and flavor to wines',
        min: 0.0,
        max: 1.0,
        value: 0.5,
        step: 0.1,
        id: uid()
      },
      {
        name: 'residual sugar',
        text:
          'the amount of sugar remaining after fermentation stops, its rare to find wines with less than 1 gram/liter and wines with greater than 45 grams/liter are considered sweet ',
        min: 0.9,
        max: 15.5,
        value: 2.5,
        step: 0.1,
        id: uid()
      },
      {
        name: 'chlorides',
        text: 'the amount of salt in the wine',
        min: 0.01,
        max: 0.61,
        value: 0.1,
        step: 0.01,
        id: uid()
      },
      {
        name: 'free sulfur dioxide',
        text:
          'the free form of SO2 exists in equilibrium between molecular SO2 (as a dissolved gas) and bisulfite ion; it prevents microbial growth and the oxidation of wine',
        min: 1,
        max: 72,
        value: 20,
        step: 1,
        id: uid()
      },
      {
        name: 'total sulfur dioxide',
        text:
          'amount of free and bound forms of S02; in low concentrations, SO2 is mostly undetectable in wine, but at free SO2 concentrations over 50 ppm, SO2 becomes evident in the nose and taste of wine',
        min: 6,
        max: 289,
        value: 60,
        step: 2,
        id: uid()
      },
      {
        name: 'density',
        text:
          'the density of water is close to that of water depending on the percent alcohol and sugar content',
        min: 0.9901,
        max: 1.0,
        value: 0.995,
        step: 0.0001,
        id: uid()
      },
      {
        name: 'pH',
        text:
          'describes how acidic or basic a wine is on a scale from 0 (very acidic) to 14 (very basic); most wines are between 3-4 on the pH scale',
        min: 2.74,
        max: 4.01,
        value: 3.1,
        step: 0.01,
        id: uid()
      },
      {
        name: 'sulphates',
        text:
          'a wine additive which can contribute to sulfur dioxide gas (S02) levels, wich acts as an antimicrobial and antioxidant',
        min: 0.33,
        max: 2.0,
        value: 0.5,
        step: 0.01,
        id: uid()
      },
      {
        name: 'alcohol',
        text: 'the percent alcohol content of the wine',
        min: 8.4,
        max: 14.9,
        value: 9.5,
        step: 0.1,
        id: uid()
      }
    ]
  }

  updateValue = (event, id) => {
    const { wineData } = this.state
    const index = wineData.findIndex(data => id === data.id)
    const updateValue = [
      ...wineData.slice(0, index),
      { ...wineData[index], value: event.target.value },
      ...wineData.slice(index + 1)
    ]
    this.setState({
      wineData: updateValue
    })
  }

  callback = savedResults => {
    this.props.appCallback(savedResults)
  }

  render() {
    return (
      <section>
        <SiteTopImg src="images/redwine-min.jpeg" alt="wine-qualtiy-cover" />
        <Form
          data={this.state.wineData}
          updateValue={this.updateValue}
          wqCallback={this.callback}
        />
      </section>
    )
  }
}
