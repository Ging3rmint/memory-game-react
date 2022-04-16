import React from "react";
import styled from "styled-components";
import { colors } from "../constants";

import GameMenu from "../components/organisms/GameMenu";

const StyledContainer = styled.section`
  background-color: ${colors.charcoal};
  height: 100vh;
  width: 100%;
  padding-top: 154px;

  > p {
    text-align: center;
    font-weight: 700;
    font-size: 40px;
    color: ${colors.lotion};
  }
`;

const Menu: React.FC = () => {
  return (
    <StyledContainer>
      <p>memory</p>
      <GameMenu />
    </StyledContainer>
  );
};

export default Menu;
