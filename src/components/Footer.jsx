import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HoverZoom } from "../MiscStyling";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  border-top: 2px solid gray;
`

const FooterDivider = styled.img` 
    max-width: 700px;
`;

const LandMarks = styled.img`
  max-width: 100%;
`

const EndNote = styled.span`
    background-color: var(--blue);
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 30px;

    * {
      color: white;
    }

    div {
        display: flex;
        flex-direction: column;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    p {
        font-size: 10px;
        margin-top: 10px;
    }

    a:hover {
        color: var(--navy);    
    }
`

const LogoImg = styled.img`
    width: 75px;

    ${HoverZoom};
`

const Footer = () => {

    return (
        <StyledFooter>
            <FooterDivider src="/images/plane.png" alt="airplane"/>
            <LandMarks src="/images/landmarks.png" alt="landmarks" />
            <EndNote>
                <NavLink to="/" >
                    <LogoImg src="/images/logos/logo_transparent.png" alt="logo" />
                </NavLink>
                <div>
                    <a href="example.com">About</a>
                    <a href="mailto:jacqueline.trapp18@gmail.com; second@mail.example">Contact Us</a>
                    <p>This site was designed in 2024 for an end of phase project for Flatiron school</p>
                </div>
            </EndNote>
        </StyledFooter>
    );
}

export default Footer;
