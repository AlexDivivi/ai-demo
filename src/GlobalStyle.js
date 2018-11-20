import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  text-align: center;
  background: whitesmoke;
}

h3{
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  letter-spacing: 0.1em;
  color: rgb(100,100,100);
}

p{
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  overflow-y: scroll;
}
`
