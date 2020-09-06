// used in error checking for invalid api calls for now
const QUERY_LABELS = ["phrase", "platform", "listingtype", "page", "sortby"];
const PLATFORMS_SUPPORTED = ["Xbox-One", "PlayStation-4", "Nintendo-Switch"];
const LISTING_TYPES = ["Trade", "Rent", "Buy"];
const SORTBY_DROPDOWN = ["popularity", "recent"];
const DEFAULT_PROFILE_PIC = "/images/profile/default_profile.png";
// to be converted to randomly generated string
const LOG_IN_DURATION = 10800000; // time in ms for how long cookies last. Converts to 3hr
const SECRET_JWT_HASH = "secrethashingkey";

exports.SORTBY_DROPDOWN = SORTBY_DROPDOWN;
exports.LOG_IN_DURATION = LOG_IN_DURATION;
exports.SECRET_JWT_HASH = SECRET_JWT_HASH;
exports.QUERY_LABELS = QUERY_LABELS;
exports.PLATFORMS_SUPPORTED = PLATFORMS_SUPPORTED;
exports.LISTING_TYPES = LISTING_TYPES;
exports.DEFAULT_PROFILE_PIC = DEFAULT_PROFILE_PIC;
