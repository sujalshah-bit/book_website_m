import "../../styles/Nav.css";
import { FaHeart } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include", // Important: to include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // "Logged out successfully"
        setIsLoggedIn(false);
      })
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    // Check for token in local storage
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav>
      <div>
        <h3>World of Books</h3>
      </div>
      <div className="input_section">
        <input type="text" placeholder="Search" />
        <div id="searchBtn">
          <FaSearch fill="#000" />
        </div>
      </div>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <FaHeart style={{ cursor: "pointer" }} fill="#937DC2" />
            </li>
            <li>
              <IoPerson style={{ cursor: "pointer" }} fill="#937DC2" />
            </li>
            <li style={{ cursor: "pointer" }}>
              <button>Feedback</button>
            </li>
            <li style={{ cursor: "pointer" }}>
              <button onClick={() => handleLogout()}>Log out</button>
            </li>
          </>
        ) : (
          <>
            <li style={{ cursor: "pointer" }}>
              <button>
                <Link className="signup_login" to={"/user/signup"}>Sign up</Link>
              </button>
            </li>
            <li style={{ cursor: "pointer" }}>
              <button>
                <Link className="signup_login" to={"/login"}>Login</Link>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
