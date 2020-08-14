import React from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  Accordion,
  Card,
  Button,
} from "react-bootstrap";
import "./SearchFilters.css";

const SearchFilters = (props) => {
  return (
    <Navbar
      bg="light"
      className="justify-content-around search-filters-container"
    >
      <NavDropdown title="Platform" id="nav-dropdown">
        <NavDropdown.Item>Xbox One</NavDropdown.Item>
        <NavDropdown.Item>Playstation 4</NavDropdown.Item>
        <NavDropdown.Item>Nintendo Switch</NavDropdown.Item>
      </NavDropdown>
      <Accordion className="filter-accordion">
        <div>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Platform
          </Accordion.Toggle>
        </div>
        <div>
          <Accordion.Collapse eventKey="0">
            <Form>
              <Form.Group>
                <Form.Check type="checkbox" label="Xbox One" />
                <Form.Check type="checkbox" label="Playstation 4" />
                <Form.Check type="checkbox" label="Nintendo Switch" />
              </Form.Group>
            </Form>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </Navbar>
  );
};

export default SearchFilters;
