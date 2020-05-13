import {
  SET_PRODUCTS,
  TOGGLE_LIKE_PRODUCT,
  CLEAR_PRODUCTS,
  SET_SINGLE_PRODUCT,
} from "redux/types";

const initialState = {
  products: [],
  singleProduct: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      const { products, clearPrevious } = action.payload;
      return {
        ...state,
        products: clearPrevious ? products : [...state.products, ...products],
      };
    case TOGGLE_LIKE_PRODUCT:
      const { like, product_id } = action.payload;
      return {
        ...state,
        products: state.products.reduce((result, product) => {
          if (product._id === product_id)
            return like
              ? [...result, { ...product, likes: product.likes + 1 }]
              : [...result, { ...product, likes: product.likes - 1 }];
          return [...result, product];
        }, []),
        singleProduct: {
          ...state.singleProduct,
          likes: like
            ? state.singleProduct.likes + 1
            : state.singleProduct.likes - 1,
        },
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
      };
    case SET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
      };
    default:
      return { ...state };
  }
};
