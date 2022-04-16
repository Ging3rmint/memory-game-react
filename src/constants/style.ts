import { createGlobalStyle } from "styled-components";

import "font-awesome/css/font-awesome.min.css";

export const GlobalStyle = createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Atkinson Hyperlegible', sans-serif;
  }

  #root{
    margin:0 auto;
  }

  img{
      display: block;
  }

`;
