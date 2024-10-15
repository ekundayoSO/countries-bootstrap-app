import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { useAuthState } from "react-firebase-hooks/auth";
import { LinkContainer } from "react-router-bootstrap";
import { auth, logout } from "../auth/firebase";
import travel from "/travel.png";
import "../custom.css";

const Layout = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="sticky-top">
      <Container fluid className="p-0">
        <Row>
          <Navbar bg="light" variant="light" expand="lg" className="w-100">
            <Container fluid>
              <LinkContainer to="/">
                <Navbar.Brand className="mx-4">
                  <img src={travel} alt="travel" style={{ maxWidth: "50px" }} />
                  <span
                    className="m-1"
                    style={{ color: "orange", fontSize: "20px" }}
                  >
                    Your travel guide....
                  </span>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
              >
                <Nav className="mx-4">
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/countries">
                    <Nav.Link>Countries</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/favourites">
                    <Nav.Link>Favourites</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>

                  {!user ? (
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  ) : (
                    <div className="d-flex align-items-center ms-2">
                      <div>{user?.email}</div>
                      <Button
                        className="ms-2"
                        size="sm"
                        style={{ border: "none" }}
                        variant="outline-primary"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
