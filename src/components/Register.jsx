import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import "../custom.css"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Name is required");
      return;
    }
    registerWithEmailAndPassword(name, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert(error.message);
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
            <h2 className="title">
              Register
            </h2>
          </Col>
          <Col xs={12}>
            <Form
              className="mx-auto formContainer form-style"
            >
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="input"
                />
              </Form.Group>
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
              <Button
              className="button"
                onClick={handleRegister}
                variant="primary"
                type="submit"
              >
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
