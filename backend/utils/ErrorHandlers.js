// Page includes different methods of checking for errors

const checkFilterLabelError = (inputs, filterValues) => {
  for (input of inputs) {
    input = input.replace("-", " ");
    if (!filterValues.includes(input)) {
      const error = new Error(
        "You have inserted filters with labels that are not recorded on the backend. Note that these values are case sensitive"
      );
      error.status = 400;
      throw error;
    }
  }
};

const checkRepeatedParamsError = (param) => {
  if (Array.isArray(param)) {
    const error = new Error(
      "You have inserted multiple instances of the same filter. Check that you have a valid URL/ API endpoint"
    );
    error.status = 400;
    throw error;
  }
};

const checkEmptyParamsError = (queries) => {
  let keys = Object.keys(queries);
  keys.forEach((key) => {
    if (key && !queries[key]) {
      const error = new Error(
        "You have left out the value for one of the filters. Check that you have a valid URL/ API endpoint"
      );
      error.status = 400;
      throw error;
    }
  });
};

exports.checkFilterLabelError = checkFilterLabelError;
exports.checkRepeatedParamsError = checkRepeatedParamsError;
exports.checkEmptyParamsError = checkEmptyParamsError;
