import { StyledNavLink } from "../MiscStyling";
import styled from "styled-components";

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  margin-right: 70px;
`;

function NavLinks() {
  return (
    <LinkContainer>
      <StyledNavLink to="/new-trip">
        <img src="/images/icons/suitcase.png" alt="suitcase" />
        Add to Bucket List
      </StyledNavLink>
    </LinkContainer>
  );
}

export default NavLinks;