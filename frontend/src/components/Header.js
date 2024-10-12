import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    if (storedPreference === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode and store preference in localStorage
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        expand="lg"
        collapseOnSelect
        className="shadow-md transition-all duration-300"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-xl font-bold text-gray-900 dark:text-white">
              StockEcom
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto items-center">
              <LinkContainer to="/cart">
                <Nav.Link className="text-gray-700 dark:text-gray-200 flex items-center">
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  className="text-gray-700 dark:text-gray-200"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="text-gray-700 dark:text-gray-200 flex items-center">
                    <i className="fas fa-user mr-2"></i>
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  className="text-gray-700 dark:text-gray-200"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="ml-4 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              >
                {darkMode ? (
                  <i className="fas fa-sun"></i>
                ) : (
                  <i className="fas fa-moon"></i>
                )}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
