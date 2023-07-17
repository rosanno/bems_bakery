const paginateResults = async (model, page = 1, perPage = 10) => {
  try {
    // Calculate the number of items to skip based on the page number and items per page
    const skipItems = (page - 1) * perPage;

    // Fetch the paginated results
    const results = await model.find().skip(skipItems).limit(perPage);

    // Get the total count of items
    const totalCount = await model.countDocuments();

    return { results, totalCount };
  } catch (error) {
    throw error;
  }
};

export default paginateResults;
