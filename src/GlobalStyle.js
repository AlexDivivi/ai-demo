import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  text-align: center;
}

h1 {
  font-size: 40px;
}

ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 28px;
}
`
