import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="pixel-navbar">
      <Link to="/" className="pixel-nav-link">
        PET CONTROLLER
      </Link>

      {isLoggedIn ? (
        <button onClick={handleLogout} className="pixel-nav-logout">
          LOGOUT
        </button>
      ) : (
        <>
          <Link to="/login" className="pixel-nav-link">
            LOGIN
          </Link>

          <Link to="/register" className="pixel-nav-link">
            REGISTER
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
