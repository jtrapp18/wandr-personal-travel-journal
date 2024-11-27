import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <div id="link-container">
      <NavLink
        to="/page-1"
        className="nav-link"
      >
        Page1
      </NavLink>
      <NavLink
        to="/page-2"
        className="nav-link"
      >
        Page2
      </NavLink>
    </div>
  );
};

export default NavLinks;