import { NavLink } from "react-router-dom";

function Logo() {
  return (
      <div id="logo-container">
        <NavLink
          to="/"
          className="nav-link home"
        >
          <img src="/images/logos/wandr.png" alt="home"/>
        </NavLink>
      </div>
  );
};

export default Logo;