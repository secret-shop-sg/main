// add to listings action
export const addToListings = (listingData /* js object (?) */) => {
  return { type: "ADD_TO_LISTINGS", listingData: listingData };
};
