import { SET_PRODUCTS } from "redux/types";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    default:
      return { ...state };
  }
};
