import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

  // function for setting filters
  const setFilters = () => {
    // set both to zero
    setPlatformFilters([]);
    setTypeFilters([]);

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
  };

  // set filters on mount
  useEffect(() => {
    setFilters();
  }, []);

  // handler if checkbox is changed
  const checkChangeHandler = (label, event) => {
    let newPlatformFilters = platformFilters;
    let newTypeFilters = typeFilters;

    switch (event.target.name) {
      case "platform":
        if (newPlatformFilters.includes(label)) {
          // remove
          newPlatformFilters = newPlatformFilters.filter(
            (value) => value !== label
          );
        } else {
          // add
          newPlatformFilters = [...newPlatformFilters, label];
        }
        break;
      case "listingtype":
        if (newTypeFilters.includes(label)) {
          // remove
          newTypeFilters = newTypeFilters.filter((value) => value !== label);
        } else {
          // add
          newTypeFilters = [...newTypeFilters, label];
        }
        break;
    }

    // generate new path
    const platformPath =
      newPlatformFilters.length > 0
        ? `platform=${newPlatformFilters.join("%")}`
        : "";
    const typePath =
      newTypeFilters.length > 0
        ? `listingtype=${newTypeFilters.join("%")}`
        : "";
    const newPath = `${window.location.pathname}?${platformPath}${
      platformPath && typePath ? "&" : ""
    }${typePath}`;

    history.replace(newPath);
    setFilters();
  };

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
                        name="platform"
                        onChange={checkChangeHandler.bind(
                          this,
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
                        name="listingtype"
                        onChange={checkChangeHandler.bind(
                          this,
                          label.replace(/ /g, "-")
                        )}
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
