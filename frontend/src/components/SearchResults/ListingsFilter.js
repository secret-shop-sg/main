import React from "react";
import { useHistory } from "react-router-dom";
import { PLATFORMS_SUPPORTED, LISTINGS_TYPE } from "../../constants/Details";
import "./ListingsFilter.css";

// function that determines which checkbox should be checked based on url
const getCheckBoxState = (filterLabel) => {
  // substring(8) because path starts with /search?
  let query = window.location.search.substring(1);

  while (query.includes("=")) {
    const keyword = query.substring(0, query.indexOf("="));
    query = query.substring(query.indexOf("=") + 1);

    // filtervalues is an array containing values of checked checkboxes
    let filterValues;
    if (query.includes("&")) {
      filterValues = query.substring(0, query.indexOf("&"));
      query = query.substring(query.indexOf("&") + 1);
    } else {
      filterValues = query;
    }
    filterValues = filterValues.split("%");

    if (keyword === filterLabel.toLowerCase()) {
      return filterValues;
      //returns undefined if no checkboxes values from the filter needs to be checked
    }
  }
};

// Component similar to a form
const ListingsFilter = (props) => {
  let title;
  let elementLabels;

  // gets the checkbox in a filter that should be checked based on the filter
  let filterValues = getCheckBoxState(props.filterLabel);
  if (!filterValues) {
    filterValues = [];
  }

  switch (props.filterLabel) {
    case "platform":
      title = "Platform";
      elementLabels = PLATFORMS_SUPPORTED;
      break;
    case "listingtype":
      title = "Listing Type";
      elementLabels = LISTINGS_TYPE;
      break;
    default:
      break;
  }

  return (
    <div className="listingsFilter">
      <h3>{title}</h3>
      {elementLabels.map((label, index) => (
        <Checkbox
          label={label}
          key={index}
          filterLabel={props.filterLabel}
          isChecked={filterValues.includes(label.replace(" ", "-"))}
        />
      ))}
    </div>
  );
};

// determines the URL that user should go to when he clicks on the checkbox
const getNewURL = (filterLabel, label, isChecked) => {
  let newPath = window.location.pathname; // /search
  let query = window.location.search; // ?platform=Nintendo-Switch

  const remove = (string, index, charsToDelete) => {
    return string.substring(0, index) + string.substring(index + charsToDelete);
  };

  if (isChecked) {
    // if checkbox is currently checked, it should remove its label from the url
    const index = query.indexOf(label);
    query = remove(query, index, label.length);

    if (query.charAt(index) === "%") {
      // if there are other checkboxes checked in its filter
      query = remove(query, index, 1);
    } else if (query.charAt(index - 1) === "%") {
      query = remove(query, index - 1, 1);
    } else if (query.charAt(index - 1) === "=") {
      // if it is the only checked checkbox in its filter
      const filterIndex = query.indexOf(filterLabel + "=");
      query = remove(query, filterIndex, filterLabel.length + 1);
      if (!query.filterIndex) {
        if (query.charAt(filterIndex) === "&") {
          query = remove(query, filterIndex, 1);
        } else if (query.charAt(filterIndex - 1) === "&") {
          query = remove(query, filterIndex - 1, 1);
        }
      }
    }

    newPath = newPath + query;
  } else {
    // if checkbox is not checked
    if (!query) {
      // if no other checkboxes are checked
      newPath = newPath + "?" + filterLabel + "=" + label;
    } else {
      // if there are other checkboxes that are checked
      if (
        // if another checkbox in the same filter is checked
        query.includes("?" + filterLabel + "=") ||
        query.includes("&" + filterLabel + "=")
      ) {
        const index = query.indexOf(filterLabel + "=") + filterLabel.length + 1;
        newPath =
          newPath +
          query.substring(0, index) +
          label +
          "%" +
          query.substring(index);
      } else {
        // if checked checkboxes are from another filter
        newPath = query + "&" + filterLabel + "=" + label;
      }
    }
  }
  return newPath;
};

const Checkbox = (props) => {
  const history = useHistory();
  const newURL = getNewURL(
    props.filterLabel,
    props.label.replace(" ", "-"),
    props.isChecked
  );

  const onClickHandler = (event) => {
    history.replace(newURL);
    event.preventDefault();
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={props.isChecked}
        onChange={onClickHandler}
      />
      <span>{props.label}</span>
    </div>
  );
};

export default ListingsFilter;
