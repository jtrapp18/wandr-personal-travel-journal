import Logo from "./Logo";
import NavLinks from "./NavLinks"

function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <NavLinks />
    </nav>
  );
};

export default NavBar;