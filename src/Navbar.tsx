/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./css/nav.css";
import { logout } from "./store/userSlice";
import { AppDispatch, RootState } from "./store/types";

interface NavbarProps {
  loggedIn: boolean;
}

function Navbar({ loggedIn }: NavbarProps) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const name = useSelector((state: RootState) => state.user.name);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="nav-link" to="/home" id="nav-all">
          Hack or Snooze
        </Link>
      </div>
      {loggedIn ? (
        <div className="main-nav-links">
          |
          <Link className="nav-link" to="/submit" id="nav-submit-story">
            submit
          </Link>
          |
          <Link className="nav-link" to="/favorites" id="nav-favorites">
            favorites
          </Link>
          |
          <Link className="nav-link" to="/mystories" id="nav-my-stories">
            my stories
          </Link>
        </div>
      ) : null}
      <div className="nav-right">
        {loggedIn ? null : (
          <Link className="nav-link" to="/login" id="nav-login">
            login
          </Link>
        )}
        {loggedIn ? (
          <Link className="nav-link" to="#" id="nav-user-profile">
            {name}
          </Link>
        ) : null}
        {loggedIn ? (
          <Link
            id="nav-logout"
            className="nav-link"
            to="/home"
            onClick={() => {
              dispatch(logout());
              navigate("/home")
            }}
          >
            | logout
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
