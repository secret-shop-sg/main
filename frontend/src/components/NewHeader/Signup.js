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
        <Modal.Title>Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
              Email
            </Form.Label>
            <Col>
              <Form.Control type="email" />
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
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Confirm Password
            </Form.Label>
            <Col>
              <Form.Control type="password" />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Body>
        Already have account?{" "}
        <a href="#" onClick={showLoginHandler}>
          Login
        </a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.toggleSignup}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Signup;
