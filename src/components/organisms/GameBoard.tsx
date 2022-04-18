import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  generateRandomNumbers,
  arrayShuffler,
  getShuffledIcons,
} from "../../utils/randomizer";
import { colors, breakpoints } from "../../constants";
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

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        margin: 5px;
      }
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
  const totalUniquePieces = (col * col) / 2;

  const matchedPiecesParams = useRef<{ [propName: string]: any }[]>([]);
  const [piecesParams, setPiecesParams] = useState<
    { [propName: string]: any }[]
  >([]);
  const [countDown, setCountDown] = useState(gameConfig.timeToStart);
  const [showAnswers, setShowAnswers] = useState(false);

  //setup pieces object parameter
  useEffect(() => {
    let randomValuesArr: any[] = [];
    const randomNumberArrObj: { [propName: string]: any }[] = [];

    if (!gameConfig) {
      //if gameConfig is not available, return user to menu screen
      navigate("/");
    } else if (gameConfig.theme === "numbers") {
      const halfPieces = generateRandomNumbers(totalUniquePieces);
      randomValuesArr = arrayShuffler([...halfPieces, ...halfPieces]);

      randomValuesArr.forEach((value: any, index: number) => {
        randomNumberArrObj.push({
          id: index,
          text: value,
          isShow: false,
          isReveal: false,
        });
      });
    } else if (gameConfig.theme === "icons") {
      randomValuesArr = getShuffledIcons(col);

      randomValuesArr.forEach((value: any, index: number) => {
        randomNumberArrObj.push({
          id: index,
          icon: value,
          isShow: false,
          isReveal: false,
        });
      });
    }

    setPiecesParams(randomNumberArrObj);
    //reveal all pieces
    setShowAnswers(true);
  }, [gameConfig, navigate, totalUniquePieces, col]);

  //setup countdown timer to hide pieces
  useEffect(() => {
    if (countDown > 0) {
      const revealIntervalPtr = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      return () => clearInterval(revealIntervalPtr);
    } else {
      setShowAnswers(false);
    }
  }, [countDown]);

  const onPieceClickHandler = (
    id: number,
    revealed: boolean,
    isShown: boolean
  ) => {
    if (showAnswers || revealed || isShown) {
      return;
    }

    let shownPieces: { [propName: string]: any }[] = [];
    const newPiecesParams = [...piecesParams];

    newPiecesParams.map((param) => {
      const matchedPieceIndex = matchedPiecesParams.current.findIndex(
        (matched) => matched.id === param.id
      );

      if (param.isShow && matchedPieceIndex < 0) {
        shownPieces.push(param);
      }

      if (param.id === id) {
        shownPieces.push(param);
        param.isShow = true;
      }
      return param;
    });

    setPiecesParams(newPiecesParams);
    let valueKey = "text";

    if (gameConfig.theme === "icons") valueKey = "icon";

    if (
      shownPieces.length === 2 &&
      !shownPieces.every(
        (piece) => piece[valueKey] === shownPieces[0][valueKey]
      )
    ) {
      if (gameConfig.players === 1) {
        setPlayerScore(playerScore["player1"] + 1, "player1");
      } else {
        if (currentPlayer >= gameConfig.players) {
          setPlayer(1);
        } else {
          setPlayer(currentPlayer + 1);
        }
      }

      setTimeout(() => {
        newPiecesParams.map((param) => {
          const matchedPieceIndex = matchedPiecesParams.current.findIndex(
            (matched) => matched.id === param.id
          );

          if (matchedPieceIndex < 0) {
            param.isShow = false;
          }

          return param;
        });

        //spread to change pointer which triggers state change
        setPiecesParams([...newPiecesParams]);
      }, gameConfig.timeToNormalise);
    } else if (
      shownPieces.length === 2 &&
      shownPieces.every((piece) => piece[valueKey] === shownPieces[0][valueKey])
    ) {
      if (gameConfig.players > 1) {
        setPlayerScore(
          playerScore[`player${currentPlayer}`] + 1,
          `player${currentPlayer}`
        );
      }

      //reveal the piece permanently
      newPiecesParams.map((param) => {
        if (param.id === shownPieces[0].id || param.id === shownPieces[1].id) {
          param.isShow = false;
          param.isReveal = true;
        }
        return param;
      });

      //add revealed pieces into persistent var
      shownPieces.forEach((piece) => {
        matchedPiecesParams.current.push(piece);
      });

      //show result modal if matchedPieces = total  unqiue pieces
      if (matchedPiecesParams.current.length / 2 >= totalUniquePieces) {
        showResultModal(true);
      }

      setPiecesParams([...newPiecesParams]);
    }
  };

  return (
    <StyledSection>
      {countDown > 0 && (
        <h2 className='timer'>Game starting in... {countDown}</h2>
      )}

      {piecesParams.length
        ? [...Array(col)].map((e, i) => {
            return (
              <div key={i} className='row'>
                {piecesParams.length &&
                  piecesParams
                    .filter((object, index: number) => {
                      return index >= i * col && index < i * col + col;
                    })
                    .map((object, index: number) => {
                      const rowIndex = i * col + index;

                      return (
                        <Piece
                          key={index}
                          id={rowIndex}
                          isBig={gameConfig.grid === 4}
                          isReveal={showAnswers || object.isReveal}
                          isShow={object.isShow}
                          text={object.text ? object.text : ""}
                          iconName={object.icon ? object.icon : null}
                          onClick={() =>
                            onPieceClickHandler(
                              rowIndex,
                              object.isReveal,
                              object.isShow
                            )
                          }
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
