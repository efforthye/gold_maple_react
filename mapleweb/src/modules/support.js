const TYPE = {
  REPORT: "support/report",
};

const report = (reportTitle, reportSelect, imgFile, contentsText) => {
  return {
    type: TYPE.REPORT,
    payload: {
      reportTitle,
      reportSelect,
      imgFile,
      contentsText,
    },
  };
};

export const action = { report };

export const initialize = [];

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.REPORT:
      return [...state, payload];
    default:
      return state;
  }
};
