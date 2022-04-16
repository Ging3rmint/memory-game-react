import React from "react";
import styled from "styled-components";
import { colors } from "../constants";

import GameTopNav from "../components/organisms/GameTopNav";
import GameBottomNav from "../components/organisms/GameBottomNav";
import GameBoard from "../components/organisms/GameBoard";

const StyledContainer = styled.section`
  background-color: ${colors.lotion};
  padding-top: 67px;
  height: 100vh;
`;

const Game: React.FC = () => {
  return (
    <StyledContainer>
      <GameTopNav />
      <GameBoard />
      <GameBottomNav />
    </StyledContainer>
  );
};

export default Game;
