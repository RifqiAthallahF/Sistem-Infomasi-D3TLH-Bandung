import { Navbar, Container, Nav } from "react-bootstrap";
import { navLinks } from "../data/index";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="navbar custom-navbar sticky-navbar">
      <Container fluid>
        {/* Logo di kiri */}
        <Navbar.Brand href="/">
          <img src="/Si Akang.svg" alt="Si Akang Logo" height="45" />
        </Navbar.Brand>

        {/* Hamburger menu untuk mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Menu di kanan */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.text}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
