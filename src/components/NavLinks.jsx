import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <div id="link-container">
      <NavLink
        to="/new-trip"
        className="nav-link"
      >
          <img src="/images/icons/suitcase.png" alt="suitcase"/>Add to Bucket List
      </NavLink>
    </div>
  );
};

export default NavLinks;