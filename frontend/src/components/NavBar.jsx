import { Link } from "react-router";

function NavBar() {
  return (
    <nav className="pixel-navbar">
      {/* Logo */}
      <Link to="/login" className="pixel-nav-brand">
        <span className="pixel-brand-paw">🐾</span>

        <span className="pixel-brand-text">
          PET
          <br />
          CONTROLLER
        </span>
      </Link>

      {/* Navigation */}
      <div className="pixel-nav-links">
        <Link to="/login" className="pixel-nav-link">
          LOGIN
        </Link>

        <Link to="/register" className="pixel-nav-register">
          REGISTER
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
