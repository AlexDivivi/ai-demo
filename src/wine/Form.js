import React, { Component } from 'react'
import styled from 'styled-components'
import NeuralNetwork from './NeuralNetwork'

const boxHeight = '290px'

const Wrapper = styled.label`
  height: ${boxHeight};
  @media only screen and (max-width: 500px) {
    height: auto;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px rgba(107, 101, 98, 0.5);
  border-radius: 5px;
  background: white;
  opacity: 0.96;
  padding: 10px 20px 20px 20px;
`

const ValueBox = styled.div`
  margin-top: auto;
  letter-spacing: 0.1em;
  color: rgb(100, 100, 100);
`

const FormHelper = styled.div`
  display: flex;
  justify-content: center;
`

const SectionForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: auto;
  grid-gap: 15px;
  margin-bottom: 40px;
  margin-top: 170px;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 1200px) {
    width: 1000px;
  }
`

const PredictionBox = styled.div`
  height: ${boxHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 4px 4px 10px rgba(200, 200, 200, 0.5);
  border-radius: 5px;
  background: white;
  opacity: 0.96;
  padding: 10px 20px 20px 20px;
`

const FeatureInput = styled.input`
  width: 70%;
`

const NNWrapper = styled.div`
  width: 90%;
  font-size: 20px;
`

export default class Form extends Component {
  renderInputs() {
    return this.props.data.map(item => (
      <Wrapper key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.text}</p>
        <ValueBox>{item.value}</ValueBox>
        <FeatureInput
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

  callback = savedResults => {
    this.props.wqCallback(savedResults)
  }

  render() {
    return (
      <FormHelper>
        <SectionForm>
          {this.renderInputs()}
          <PredictionBox>
            <h3>your wine quality:</h3>
            <NNWrapper>
              <NeuralNetwork data={this.props.data} callback={this.callback} />
            </NNWrapper>
          </PredictionBox>
        </SectionForm>
      </FormHelper>
    )
  }
}
