import React, { Component } from 'react'
import { SiteTopImg } from './GlobalStyle'
import styled from 'styled-components'
import uid from 'uid'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 500px);
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, 300px);
  }
  grid-auto-rows: auto;
  grid-gap: 15px;
  margin-top: 170px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`
const WineBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 50%);
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, 100%);
  }
  grid-auto-rows: auto;
  height: 320px;
  box-shadow: 4px 4px 10px rgba(200, 200, 200, 0.5);
  border-radius: 5px;
  background: white;
  padding: 10px 20px 20px 20px;
  font-family: 'Noto Serif', serif;
  letter-spacing: 0.05em;
  overflow-y: scroll;
`

const TextElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 20px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  @media only screen and (min-width: 500px) {
    &:nth-child(odd) {
      border-right: 1px solid rgb(220, 220, 220);
    }
  }
`

const FeatureValue = styled.span`
  font-family: 'Noto Serif', serif;
  letter-spacing: 0.1em;
  color: rgb(100, 100, 100);
  font-size: 15px;
  padding: 0 10px 0 0;
`

const QualityValue = styled.span`
  font-family: 'Noto Serif', serif;
  color: rgb(100, 100, 100);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  @media only screen and (max-width: 500px) {
    margin-bottom: 15px;
  }
`

const UserName = styled.h3`
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  letter-spacing: 0.1em;
  color: rgb(100, 100, 100);
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class MyWines extends Component {
  renderWines() {
    return this.props.wines.map(item => (
      <WineBox key={uid()}>
        <UserName>{item.userName}'s Wine </UserName>
        {item.userName === 'Frauke' ? (
          <QualityValue>{item.result} &copy;</QualityValue>
        ) : (
          <QualityValue>{item.result}</QualityValue>
        )}
        {item.features.map(item => (
          <TextElement key={uid()}>
            {item.name}
            <FeatureValue>{item.value}</FeatureValue>
          </TextElement>
        ))}
      </WineBox>
    ))
  }

  render() {
    return (
      <Wrapper>
        {' '}
        <SiteTopImg src="images/redwine.jpeg" alt="my-wines-cover" />
        {this.renderWines()}
      </Wrapper>
    )
  }
}
