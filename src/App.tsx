import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./screen/Game";
import Menu from "./screen/Menu";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
