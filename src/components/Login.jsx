import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import "../custom.css"; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithEmailAndPassword(email, password).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="background">
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
      >
        <Row>
          <Col xs={12} className="text-center mb-4">
            <h2 className="title">Login</h2>
          </Col>
          <Col xs={12}>
            <Form className="mx-auto formContainer form-style">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="input"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="input"
                />
              </Form.Group>
              <Button className="button mb-1" onClick={handleLogin}>
                Login
              </Button>
              <Button className="button" onClick={() => navigate("/register")}>
                Don't have an account?
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
