import React from "react";
import "./Login.css";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const Login = (props) => {
  const loginHandler = () => {};
  const showSignupHandler = () => {
    props.toggleLogin();
    props.toggleSignup();
  };

  return (
    <Modal show={props.showLogin} onHide={props.toggleLogin}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="login-form">
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Username
            </Form.Label>
            <Col>
              <Form.Control type="text" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Password
            </Form.Label>
            <Col>
              <Form.Control type="password" />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Body>
        New to Link?{" "}
        <a href="#" onClick={showSignupHandler}>
          Create an account
        </a>
        .
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.toggleLogin}>
          Close
        </Button>
        <Button
          variant="outline-success"
          onClick={loginHandler}
          type="submit"
          form="login-form"
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
