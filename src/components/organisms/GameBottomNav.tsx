import React from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

import Player from "../molecules/Player";

interface LocationState {
  gameConfig: {
    theme: string;
    players: number;
    grid: number;
  };
}

const StyledNav = styled.nav`
  display: flex;
  max-width: 1110px;
  padding: 0 20px;
  position: fixed;
  bottom: 35px;
  left: 0px;
  right: 0px;
  margin: 0 auto;
`;

const GameBottomNav: React.FC = () => {
  const location = useLocation();

  const { gameConfig } = location.state as LocationState;

  return (
    <StyledNav>
      {[...Array(gameConfig.players)].map((e, i) => {
        return (
          <Player
            name={`Player ${i + 1}`}
            score={0}
            key={i}
            isActive={i + 1 === 1}
          />
        );
      })}
    </StyledNav>
  );
};

export default GameBottomNav;
