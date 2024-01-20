const TYPE = {
  ONIMG: "/onImg",
};

const onImg = (imgSrc) => {
  return {
    type: TYPE.ONIMG,
    payload: { imgSrc },
  };
};

export const action = { onImg };

export const initialize = ``;

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.ONIMG: {
      return `${payload.imgSrc}`;
    }
    default:
      return state;
  }
};
