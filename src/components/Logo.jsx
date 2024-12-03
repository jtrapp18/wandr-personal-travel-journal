import { StyledNavLink } from "../MiscStyling";
import styled from "styled-components";
import { HoverZoom } from "../MiscStyling";

const LogoContainer = styled.div` 
  text-align: left;

  img {
    ${HoverZoom}
  }
`

function Logo() {
  return (
      <LogoContainer>
        <StyledNavLink
          to="/"
          className="home"
        >
          <img src="/images/logos/wandr.png" alt="home"/>
        </StyledNavLink>
      </LogoContainer>
  );
};

export default Logo;