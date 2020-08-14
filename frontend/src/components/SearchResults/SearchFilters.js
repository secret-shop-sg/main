import React, { useState, useEffect } from "react";
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
  const [platformFilters, setPlatformFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);

  // set filters on mount
  useEffect(() => {
    // substring(8) because path starts with /search?
    let query = window.location.search.substring(1);

    // populate filters
    while (query.includes("=")) {
      const equalsIndex = query.indexOf("=");
      const keyword = query.substring(0, equalsIndex);
      query = query.substring(equalsIndex + 1);

      // filtervalues is an array containing values of checked checkboxes
      let filterValues;
      const andIndex = query.indexOf("&");
      // index is -1 if character cannot be found
      if (andIndex > -1) {
        filterValues = query.substring(0, andIndex);
        query = query.substring(andIndex + 1);
      } else {
        filterValues = query;
      }
      filterValues = filterValues.split("%");

      // assign to correct filter label
      switch (keyword) {
        case "platform":
          setPlatformFilters(filterValues);
          break;
        case "listingtype":
          setTypeFilters(filterValues);
          break;
      }
    }
  }, []);

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
                      <Form.Check
                        type="checkbox"
                        label={label}
                        key={index}
                        checked={platformFilters.includes(
                          label.replace(/ /g, "-")
                        )}
                      />
                    ))}
                  </FormGroup>
                </Form>
              </Col>
              <Col md="auto">
                <Form>
                  <FormGroup>
                    <Form.Label>Listing Type</Form.Label>
                    {LISTINGS_TYPE.map((label, index) => (
                      <Form.Check
                        type="checkbox"
                        label={label}
                        key={index}
                        checked={typeFilters.includes(label.replace(/ /g, "-"))}
                      />
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
