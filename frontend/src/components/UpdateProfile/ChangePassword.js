import React from "react";
import { useAPI } from "../../utils/useAPI";
import { Modal, Form, Button } from "react-bootstrap";

const ChangePassword = (props) => {
  const [sendRequest] = useAPI();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const responseData = await sendRequest(
      `/api/user/update/password`,
      "PATCH",
      // todo: change text below to be data collected from the fields
      { oldPassword: "qwerty1", newPassword: "qwerty" },
      true
    );
    if (responseData) {
      if (responseData.dataUpdated) {
        // todo: Change to something more visually appealing
        alert("Password changed");
      } else alert("old password invalid");
    }
  };
  return (
    <Modal show={props.show} onHide={props.toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Old Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.toggle}>
          Close
        </Button>
        <Button variant="outline-dark" onClick={onSubmitHandler}>
          Change Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePassword;
