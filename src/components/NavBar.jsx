import Logo from "./Logo";
import NavLinks from "./NavLinks"
import styled from "styled-components";

const StyledNavBar = styled.nav`
  position: fixed;
  padding-top: 10px;
  background-color: var(--green);
  height: 45px;
  display: flex;
  width: 100%;
`

function NavBar() {
  return (
    <StyledNavBar>
      <Logo />
      <NavLinks />
    </StyledNavBar>
  );
};

export default NavBar;