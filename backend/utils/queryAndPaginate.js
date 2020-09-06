const queryAndPaginate = async (
  model,
  query,
  documentLimit,
  page = 1,
  additionalQueries = { $match: {} } // default param does nothing
) => {
  // always first page by default

  // determines start and end index of documents to be queries
  const startIndex = parseInt(page - 1) * documentLimit;
  const endIndex = parseInt(page) * documentLimit;

  try {
    [queryData] = await model.aggregate([
      { $match: { $and: query } },
      {
        $facet: {
          matchedData: [
            { $skip: startIndex },
            { $limit: documentLimit },
            additionalQueries,
          ],
          pageData: [{ $count: "count" }],
        },
      },
    ]);
  } catch (err) {
    throw err;
  }

  // add additional info so the frontend knows if it should render the previous and next buttons
  if (queryData) {
    if (queryData.matchedData.length > 0) {
      queryData.pageData = queryData.pageData[0];
      queryData.pageData.currentPage = parseInt(page);

      if (startIndex > 0) {
        queryData.pageData.previousPage = true;
      } else queryData.pageData.previousPage = false;

      if (endIndex < queryData.pageData.count) {
        queryData.pageData.nextPage = true;
      } else queryData.pageData.nextPage = false;
    }
  }

  return queryData;
};

module.exports = queryAndPaginate;
