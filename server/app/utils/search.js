const searchResults = async (model, field, searchTerm, page = 1, perPage = 10) => {
  try {
    const searchRegex = new RegExp(searchTerm, "i");

    // Calculate the number of items to skip based on the page number and items per page
    const skipItems = (page - 1) * perPage;

    // Fetch the paginated results that match the search term
    const results = await model
      .find({ [field]: { $regex: searchRegex } })
      .skip(skipItems)
      .limit(perPage);

    // Get the total count of items that match the search term
    const totalCount = await model.countDocuments({ [field]: { $regex: searchRegex } });

    return { results, totalCount };
  } catch (error) {
    throw error;
  }
};

export default searchResults;
