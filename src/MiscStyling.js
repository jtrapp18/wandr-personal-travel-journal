import styled, {css} from "styled-components";
import { NavLink } from "react-router-dom";

const ConditionalHighlight = css`
    &:hover {
        background-color: var(--yellow)
    };
    
    &:focus {
        border: 3px solid var(--navy);
        background-color: var(--yellow);
    };`

const HoverZoom = css`
    &:hover {
        zoom: 105%;
    }
`

const StyledNavLink = styled(NavLink)`
    color: black;
    font-size: 15px;
    margin: 25px;
    font-weight: bold;
    text-decoration: none;
    text-align: right;

    img {
        height: 30px;
        vertical-align: middle;
    }

    &.active {
        text-decoration: overline;
    }
`

const IndivTripMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
    background-color: var(--gray);
    max-width: 700px; 
    margin: auto;

    h1 {
        color: var(--navy);
    }
`

const StyledButton = styled.button`
    background-color: var(--green);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 200px;
`

const ImageSelector = css`
    opacity: 0;
    position: absolute;
    top: 40%;
    background: transparent;
    color: white;
    font-size: 50px;
    font-weight: bold;
    background-color: rgba(0,0,0,.5);
    border: none;
    cursor: pointer;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 700px;
  min-width: 40%;
  max-width: 90%;
  justify-content: center;
  align-items: center;

  label {
    width: 100%;
    position: relative;
    display: flex;
  }
  
  input, textarea {
    width: 400px;
    max-width: 70%;
    position: absolute;
    right: 0;
    ${ConditionalHighlight};
  }

  textarea {
    height: 100px;
  }

  button:hover {
    background-color: var(--navy);
    color: var(--gray);
  }
`

const PrevButton = styled.button`
    ${ImageSelector};
    left: 10px;
`

const NextButton = styled.button`
    ${ImageSelector};
    right: 10px;
`

const TempMessage = styled.p`
  margin-top: 10px;
  font-size: 20px;
  color: var(--dark-green);
  font-style: italic;
`

const AddPersonBtn = styled.button`
    position: absolute;
    right: 0;
    width: 30px;
    top: 0;
    margin: 0;
    border: 2px solid black;
    background-color: var(--dark-green);
`;

export {ConditionalHighlight, HoverZoom, StyledNavLink, StyledForm, IndivTripMain, StyledButton, PrevButton, NextButton, TempMessage, AddPersonBtn};
