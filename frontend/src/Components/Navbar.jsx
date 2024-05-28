import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/navbar.css"; // CSS file for styling
import { jwtDecode } from "jwt-decode";
const role = false;
const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const t= localStorage.getItem("token") || "";
  const [userData, setUserData] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : ""
  );
  
  console.log(userData);
  const isLoggedIn = token ===  "" ? false : true;
  const isSeller = userData.role === "seller" ?true:false;
  console.log(isLoggedIn, isSeller);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserData("");
  };

  useEffect(() => {
    // Do something on token or userData change
  }, [token, userData]);
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-left">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <h1>Rentify</h1>
          </Link>
        </div>
        <ul className="nav-items navbar-right">
          {isLoggedIn && !isSeller && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/items">View Items</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          )}
          {isLoggedIn && isSeller && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add-property">Add Property</Link>
              </li>
              <li>
                <Link to="/items">View Items</Link>
              </li>
              <li>
                <Link to="/own-property">OwnProperty</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
