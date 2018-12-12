import React, { Component } from 'react'
import { SiteTopImg } from '../GlobalStyle'
import styled from 'styled-components'

const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 500px);
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, 300px);
  }
  @media only screen and (min-width: 1200px) {
    width: 1200px;
  }
  grid-auto-rows: auto;
  grid-gap: 15px;
  margin-top: 170px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
`

const WineBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 50%);
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, 100%);
    height: 370px;
  }
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(107, 101, 98, 0.5);
  grid-auto-rows: auto;
  height: 320px;
  letter-spacing: 0.05em;
  padding: 10px 20px 20px 20px;
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
  letter-spacing: 0.1em;
  color: rgb(100, 100, 100);
  font-size: 15px;
  padding: 0 10px 0 0;
`

const QualityValue = styled.span`
  color: #751d27;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 0 0 75px;
  @media only screen and (max-width: 500px) {
    margin-bottom: 15px;
    margin-left: 125px;
  }
`

const UserName = styled.h3`
  font-weight: 100;
  letter-spacing: 0.1em;
  color: #751d27;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 500px) {
    padding-left: 15px;
  }
`

const DeleteButton = styled.button`
  margin-left: auto;
  height: 25px;
  width: 25px;
  background: whitesmoke;
  border: 0;
  border-radius: 5px;
  font-size: 12px;
`

export default class MyWines extends Component {
  renderWines() {
    return this.props.wines.map((item, index) => (
      <WineBox key={index}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <UserName>{item.userName}'s wine </UserName>
          {window.innerWidth < 500 && (
            <DeleteButton onClick={() => this.props.onClick(item.id)}>
              X
            </DeleteButton>
          )}
        </div>
        <div style={{ display: 'flex' }}>
          {item.userName === 'Frauke' ? (
            <QualityValue>{item.result} &copy;</QualityValue>
          ) : (
            <QualityValue>{item.result}</QualityValue>
          )}
          {window.innerWidth >= 500 && (
            <DeleteButton onClick={() => this.props.onClick(item.id)}>
              X
            </DeleteButton>
          )}
        </div>

        {item.features.map(item => (
          <TextElement key={item.id}>
            {item.name}
            <FeatureValue>{item.value}</FeatureValue>
          </TextElement>
        ))}
      </WineBox>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <SiteTopImg src="images/redwine-min.jpeg" alt="my-wines-cover" />
        <GridWrapper>
          <Wrapper> {this.renderWines()}</Wrapper>
        </GridWrapper>
      </React.Fragment>
    )
  }
}
