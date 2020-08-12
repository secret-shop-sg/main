const changePageHandler = (currentApiPath, currentPage, buttonType) => {
  let value;
  let newApiPath;

  if (buttonType === "nextPage") {
    value = 1;
  } else if (buttonType === "previousPage") {
    value = -1;
  }

  const startingIndex = currentApiPath.indexOf(`page=`);

  // checks if page is indicated in the current apiPath
  if (startingIndex === -1) {
    let symbol;
    if (currentApiPath.includes("?")) {
      symbol = "&";
    } else symbol = "?";

    newApiPath = currentApiPath + symbol + `page=${currentPage + value}`;
  } else {
    newApiPath =
      currentApiPath.substring(0, startingIndex + 5) + (currentPage + value);

    // checks if apiPath ends with page=x
    const lengthOfNumber = currentApiPath
      .substring(startingIndex + 5)
      .indexOf("&");
    if (lengthOfNumber !== -1) {
      newApiPath =
        newApiPath +
        currentApiPath.substring(startingIndex + 5 + lengthOfNumber);
    }
  }

  return newApiPath;
};

export default changePageHandler;
