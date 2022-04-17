import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { generateRandomNumbers, arrayShuffler } from "../../utils/randomizer";
import { colors } from "../../constants";
import styled from "styled-components";

import Piece from "../atoms/Piece";

interface PropsType {
  setPlayer: (playerNumber: number) => void;
  currentPlayer: number;
  setPlayerScore: (score: number, key: string) => void;
  playerScore: {
    [propName: string]: number;
  };
  timeToNormalise: number;
  timeToHide: number;
  showResultModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LocationState {
  gameConfig: {
    theme: string;
    players: number;
    grid: number;
    timeToNormalise: number;
    timeToStart: number;
    gameTimer: number;
  };
}

const StyledSection = styled.section`
  width: 100%;

  .timer {
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
    color: ${colors.charcoal};
  }
  .row {
    display: flex;
    justify-content: center;

    > button {
      margin: 10px;
    }
  }
`;

const GameBoard: React.FC<PropsType> = ({
  setPlayer,
  currentPlayer,
  setPlayerScore,
  playerScore,
  showResultModal,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { gameConfig } = location.state as LocationState;
  const col = gameConfig.grid || 4;
  const numberToRandomize = (col * col) / 2;

  const matchedPieceCount = useRef(0);

  const piecesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedPieces, setSelectedPieces] = useState<HTMLButtonElement[]>([]);
  const [piecesValue, setPiecesValue] = useState<number[]>([]);
  const [countDown, setCountDown] = useState(gameConfig.timeToStart);

  //using DOM to render value onto the pieces without changing state
  const showHidePieces = (show: boolean, pieces: number[]) => {
    if (piecesRef.current.length) {
      piecesRef.current.forEach((element, index) => {
        if (element) {
          if (show) {
            element.classList.add("active");
            element.innerHTML = pieces[index].toString();
          } else {
            element.classList.remove("active");
            element.classList.remove("selected");
            element.innerHTML = "";
          }
        }
      });
    }
  };

  //if gameConfig is not available, return user to menu screen
  useEffect(() => {
    if (!gameConfig) {
      navigate("/");
    } else {
      const halfPieces = generateRandomNumbers(numberToRandomize);
      setPiecesValue(arrayShuffler([...halfPieces, ...halfPieces]));
    }
  }, [gameConfig, navigate, numberToRandomize]);

  //after values of the pieces are calculated, reveal them for a short period
  useEffect(() => {
    showHidePieces(true, piecesValue);
  }, [piecesValue]);

  //setup countdown timer to hide pieces
  useEffect(() => {
    if (countDown > 0) {
      const revealIntervalPtr = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      return () => clearInterval(revealIntervalPtr);
    } else {
      showHidePieces(false, piecesValue);
    }
  }, [countDown, piecesValue]);

  //update board pieces once items are selected
  useEffect(() => {
    if (selectedPieces.length >= 2) {
      let isCorrect = false;

      if (
        selectedPieces[0].innerHTML === selectedPieces[1].innerHTML &&
        gameConfig.players > 1
      ) {
        isCorrect = true;

        setPlayerScore(
          playerScore[`player${currentPlayer}`] + 1,
          `player${currentPlayer}`
        );

        selectedPieces.forEach((element) => {
          element.classList.add("active");
        });
      } else if (gameConfig.players > 1) {
        if (currentPlayer >= gameConfig.players) {
          setPlayer(1);
        } else {
          setPlayer(currentPlayer + 1);
        }
      }

      if (gameConfig.players === 1) {
        if (selectedPieces[0].innerHTML !== selectedPieces[1].innerHTML) {
          setPlayerScore(
            playerScore[`player${currentPlayer}`] + 1,
            `player${currentPlayer}`
          );
        } else {
          isCorrect = true;

          selectedPieces.forEach((element) => {
            element.classList.add("active");
          });
        }
      }

      if (isCorrect) {
        matchedPieceCount.current += 1;

        if (matchedPieceCount.current === numberToRandomize) {
          showResultModal(true);
        }
      }

      setTimeout(() => {
        selectedPieces[0].classList.remove("selected");
        selectedPieces[1].classList.remove("selected");

        if (!isCorrect) {
          selectedPieces[0].innerHTML = "";
          selectedPieces[1].innerHTML = "";
        }
      }, gameConfig.timeToNormalise);

      setSelectedPieces([]);
    }
  }, [
    selectedPieces,
    currentPlayer,
    gameConfig.players,
    gameConfig.timeToNormalise,
    playerScore,
    setPlayer,
    setPlayerScore,
  ]);

  const onPieceClickHandler = (id: number) => {
    const targetElement = piecesRef.current[id];
    const number = piecesValue[id];

    if (targetElement && !targetElement.classList.contains("active")) {
      setSelectedPieces([...selectedPieces, targetElement]);
      targetElement.classList.add("selected");
      targetElement.innerHTML = number.toString();
    }
  };

  return (
    <StyledSection>
      {countDown > 0 && (
        <h2 className='timer'>Game starting in... {countDown}</h2>
      )}
      {piecesValue.length
        ? [...Array(col)].map((e, i) => {
            return (
              <div key={i} className='row'>
                {piecesValue
                  .filter((ele, index) => {
                    return index >= i * col && index < i * col + col;
                  })
                  .map((number: number, index: number) => {
                    const rowIndex = i * col + index;
                    return (
                      <Piece
                        pieceRef={(ref: HTMLButtonElement) =>
                          (piecesRef.current[rowIndex] = ref)
                        }
                        key={index}
                        id={rowIndex}
                        onClick={() => onPieceClickHandler(rowIndex)}
                      />
                    );
                  })}
              </div>
            );
          })
        : ""}
    </StyledSection>
  );
};

export default GameBoard;
