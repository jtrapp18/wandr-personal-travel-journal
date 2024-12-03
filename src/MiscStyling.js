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

export {ConditionalHighlight, HoverZoom, StyledNavLink};
