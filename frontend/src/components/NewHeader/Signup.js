import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const Signup = (props) => {
  const showLoginHandler = () => {
    props.toggleSignup();
    props.toggleLogin();
  };
  return (
    <Modal show={props.showSignup} onHide={props.toggleSignup}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="register-form">
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Username
            </Form.Label>
            <Col>
              <Form.Control type="text" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Email
            </Form.Label>
            <Col>
              <Form.Control type="email" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Password
            </Form.Label>
            <Col>
              <Form.Control type="password" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Confirm Password
            </Form.Label>
            <Col>
              <Form.Control type="password" required />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Check
              required
              label="I agree to Link's terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Body>
        Already have account?{" "}
        <a href="#" onClick={showLoginHandler}>
          Login
        </a>
        .
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.toggleSignup}>
          Close
        </Button>
        <Button variant="outline-success" form="register-form" type="submit">
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Signup;
