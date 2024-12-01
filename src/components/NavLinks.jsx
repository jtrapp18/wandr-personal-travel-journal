import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <div id="link-container">
      <NavLink
        to="/"
        className="nav-link home"
      >
        <img src="/images/passport.png" alt="passport"/>My Trips
      </NavLink>
      <NavLink
        to="/new-trip"
        className="nav-link"
      >
          <img src="/images/suitcase.png" alt="suitcase"/>Add to Bucketlist
      </NavLink>
    </div>
  );
};

export default NavLinks;