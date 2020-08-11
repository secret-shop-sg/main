// Page includes different methods of checking for errors
const details = require("../constants/details");

const searchControllerErrorHandler = (queries) => {
  let hasError;
  hasError = checkEmptyParamsError(queries);
  if (hasError) {
    return hasError;
  }
  hasError = checkRepeatedParamsError(queries);
  if (hasError) {
    return hasError;
  }

  hasError = checkUnknownLabelsError(queries);
  if (hasError) {
    return hasError;
  }

  return false;
};

const checkUnknownLabelsError = (queries) => {
  for (key of Object.keys(queries)) {
    if (!details.QUERY_LABELS.includes(key)) {
      const error = new Error(
        "You have entered labels that are not recorded on the backend. Check your URL"
      );
      error.status = 400;
      return error;
    }

    if (key === "listingtype") {
      for (value of queries[key].split("%")) {
        if (!details.LISTING_TYPES.includes(value)) {
          const error = new Error(
            "You have entered labels that are not recorded on the backend. Check your URL"
          );
          error.status = 400;
          return error;
        }
      }
    } else if (key === "platform") {
      for (value of queries[key].split("%")) {
        value = value.replace(/-/g, " ");
        if (!details.PLATFORMS_SUPPORTED.includes(value)) {
          const error = new Error(
            "You have entered labels that are not recorded on the backend. Check your URL"
          );
          error.status = 400;
          return error;
        }
      }
    } else if (key === "page") {
      // checks that the page property contains a valid value
      if (!Number.isInteger(parseInt(queries.page))) {
        const error = new Error(
          "The page you have entered is not valid. Please check your URL"
        );
        error.status = 400;
        return error;
      }
    }
  }
  return false;
};

const checkRepeatedParamsError = (queries) => {
  for (value of Object.values(queries)) {
    if (Array.isArray(value)) {
      const error = new Error(
        "You have inserted multiple instances of the same filter. Check that you have a valid URL/ API endpoint"
      );
      error.status = 400;
      return error;
    }
  }
  return false;
};

const checkEmptyParamsError = (queries) => {
  let keys = Object.keys(queries);
  for (key of keys) {
    if (key && !queries[key]) {
      const error = new Error(
        "You have left out the value for one of the filters. Check that you have a valid URL/ API endpoint"
      );
      error.status = 400;
      return error;
    }
  }
  return false;
};

module.exports = searchControllerErrorHandler;
