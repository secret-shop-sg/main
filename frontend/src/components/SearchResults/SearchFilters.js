import React from "react";
import {
  Navbar,
  Form,
  Accordion,
  Button,
  Row,
  Col,
  Container,
  FormGroup,
} from "react-bootstrap";
import "./SearchFilters.css";

const SearchFilters = (props) => {
  return (
    <Navbar bg="light" className="search-filters-container">
      <Accordion className="filter-accordion">
        <div>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Search Filters
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="0">
          <Container fluid>
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <Form.Label>Platforms</Form.Label>
                    <Form.Check type="checkbox" label="Xbox One" />
                    <Form.Check type="checkbox" label="Playstation 4" />
                    <Form.Check type="checkbox" label="Nintendo Switch" />
                  </FormGroup>
                </Form>
              </Col>
              <Col>
                <Form>
                  <FormGroup>
                    <Form.Label>Listing Type</Form.Label>
                    <Form.Check type="checkbox" label="Trade" />
                    <Form.Check type="checkbox" label="Rent" />
                    <Form.Check type="checkbox" label="Buy" />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </Accordion.Collapse>
      </Accordion>
    </Navbar>
  );
};

export default SearchFilters;
