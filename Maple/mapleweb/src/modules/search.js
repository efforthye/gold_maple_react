const TYPE = {
  SEARCH: "/search",
};

const search = (searchType, searchData) => {
  return {
    type: TYPE.SEARCH,
    payload: { searchType, searchData },
  };
};

export const action = { search };

export const initialize = [];

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.SEARCH:
      return { searchType: payload.searchType, searchData: payload.searchData };
    default:
      return state;
  }
};
