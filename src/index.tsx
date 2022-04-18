import * as React from "react";
import * as ReactDOM from "react-dom";

import "./fontawesomeLib";
import { GlobalStyle } from "./constants";

import App from "./App";

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root") as HTMLElement
);
