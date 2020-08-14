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
import { PLATFORMS_SUPPORTED, LISTINGS_TYPE } from "../../constants/Details";

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
              <Col md="auto">
                <Form>
                  <FormGroup>
                    <Form.Label>Platforms</Form.Label>
                    {PLATFORMS_SUPPORTED.map((label, index) => (
                      <Form.Check type="checkbox" label={label} key={index} />
                    ))}
                  </FormGroup>
                </Form>
              </Col>
              <Col md="auto">
                <Form>
                  <FormGroup>
                    <Form.Label>Listing Type</Form.Label>
                    {LISTINGS_TYPE.map((label, index) => (
                      <Form.Check type="checkbox" label={label} key={index} />
                    ))}
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
