import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background-color: #0f0f1a;
    color: #ffffff;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;