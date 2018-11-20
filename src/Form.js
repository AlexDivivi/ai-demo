import React, { Component } from 'react'
import styled from 'styled-components'
import NeuralNetwork from './NeuralNetwork'

const Wrapper = styled.label`
  height: 237px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 4px 4px 10px rgba(200, 200, 200, 0.5);
  border-radius: 5px;
  background: white;
  padding: 10px 20px 20px 20px;
`

const ValueBox = styled.div`
  margin-top: auto;
  font-family: 'Noto Serif', serif;
  letter-spacing: 0.1em;
  color: rgb(100, 100, 100);
`

const SectionForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: auto;
  grid-gap: 15px;
  margin-top: 170px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`

const PredictionBox = styled.div`
  height: 237px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 4px 4px 10px rgba(200, 200, 200, 0.5);
  border-radius: 5px;
  background: white;
  padding: 10px 20px 20px 20px;
  font-family: 'Noto Serif', serif;
`

const PredictionButton = styled.button`
  width: 100%;
  height: 50%;
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  letter-spacing: 0.1em;
  color: rgb(100, 100, 100);
  background-color: whitesmoke;
  box-shadow: 4px 4px 10px rgba(200, 200, 200, 0.5);
  border: 0;

  :focus {
    outline: none;
    box-shadow: 4px 4px 2px rgba(200, 200, 200, 1);
  }
`

export default class Form extends Component {
  renderInputs() {
    return this.props.data.map(item => (
      <Wrapper key={item.key}>
        <h3>{item.name}</h3>
        <p>{item.text}</p>
        <ValueBox>{item.value}</ValueBox>
        <input
          type="range"
          onChange={event => this.props.updateValue(event, item.id)}
          step={item.step}
          min={item.min}
          max={item.max}
          defaultValue={item.value}
        />
      </Wrapper>
    ))
  }

  handleClick(event) {
    event.preventDefault()
  }

  render() {
    return (
      <SectionForm>
        {this.renderInputs()}
        <PredictionBox>
          {' '}
          <PredictionButton onClick={event => this.handleClick(event)}>
            <p>Deliver Wine Quality</p>
          </PredictionButton>
          <NeuralNetwork data={this.props.data} />
        </PredictionBox>
      </SectionForm>
    )
  }
}
