import { NavLink } from "react-router-dom";

const Footer = () => {

    return (
        <footer>
            <img id="footer-divider" src="/images/plane.png" alt="airplane"/>
            <img id="landmarks" src="/images/landmarks.png" alt="landmarks"></img>
            <span id="end-note">
                <NavLink to="/" >
                    <img className="logo" src="/images/logos/logo_transparent.png" alt="logo" />
                </NavLink>
                <div>
                    <a href="mailto:jacqueline.trapp18@gmail.com; second@mail.example">About</a>
                    <a href="mailto:jacqueline.trapp18@gmail.com; second@mail.example">Contact Us</a>
                    <p>This site was designed in 2024 for an end of phase project for Flatiron school</p>
                </div>
            </span>
        </footer>
    );
}

export default Footer;
