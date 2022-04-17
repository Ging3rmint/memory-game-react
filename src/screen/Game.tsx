import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { colors } from "../constants";

import GameTopNav from "../components/organisms/GameTopNav";
import GameBottomNav from "../components/organisms/GameBottomNav";
import GameBoard from "../components/organisms/GameBoard";

interface playersScoreType {
  [propName: string]: any;
}

interface LocationState {
  gameConfig: {
    theme: string;
    players: number;
    grid: number;
  };
}

const StyledContainer = styled.section`
  background-color: ${colors.lotion};
  padding-top: 67px;
  height: 100vh;
`;

const Game: React.FC = () => {
  const location = useLocation();
  const { gameConfig } = location.state as LocationState;
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerScore, setPlayerScore] = useState<playersScoreType>({});
  const [resultVisible, setResultVisible] = useState(false);

  //init player score
  useEffect(() => {
    const numberOfPlayers = gameConfig.players;
    let playerScoreObj: playersScoreType = {};

    for (let i = 0; i < numberOfPlayers; i++) {
      playerScoreObj[`player${i + 1}`] = 0;
    }

    setPlayerScore(playerScoreObj);
  }, [gameConfig.players]);

  const setPlayerHandler = (playerNumber: number) => {
    setCurrentPlayer(playerNumber);
  };

  const setPlayerScoreHandler = (score: number, key: string) => {
    setPlayerScore({ ...playerScore, [key]: score });
  };

  return (
    <StyledContainer>
      <GameTopNav />
      <GameBoard
        showResultModal={setResultVisible}
        setPlayer={setPlayerHandler}
        currentPlayer={currentPlayer}
        setPlayerScore={setPlayerScoreHandler}
        playerScore={playerScore}
        timeToNormalise={200}
        timeToHide={3}
      />
      <GameBottomNav
        currentPlayer={currentPlayer}
        playerScore={playerScore}
        showResult={resultVisible}
      />
    </StyledContainer>
  );
};

export default Game;
