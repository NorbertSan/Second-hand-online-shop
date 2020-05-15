import {
  SET_PRODUCTS,
  TOGGLE_LIKE_PRODUCT,
  CLEAR_PRODUCTS,
  SET_SINGLE_PRODUCT,
  SET_FAV_PRODUCTS,
  CLEAR_FAV_PRODUCTS,
  SET_USER_DATA,
  SET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "redux/types";

const initialState = {
  products: [],
  favProducts: [],
  singleProduct: {},
  userData: null,
  comments: [],
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
      const refreshProducts = state.products.reduce((result, product) => {
        if (product._id === product_id)
          return like
            ? [...result, { ...product, likes: product.likes + 1 }]
            : [...result, { ...product, likes: product.likes - 1 }];
        return [...result, product];
      }, []);
      const refreshSingleProduct = {
        ...state.singleProduct,
        likes: like
          ? state.singleProduct.likes + 1
          : state.singleProduct.likes - 1,
      };
      const refreshFavProducts = [...state.favProducts].filter(
        (product) => product._id !== product_id
      );
      return {
        ...state,
        products: refreshProducts,
        singleProduct: refreshSingleProduct,
        favProducts: like ? refreshFavProducts : refreshFavProducts,
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
    case SET_FAV_PRODUCTS:
      return {
        ...state,
        favProducts: [...state.favProducts, ...action.payload],
      };
    case CLEAR_FAV_PRODUCTS:
      return {
        ...state,
        favProducts: [],
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case DELETE_COMMENT:
      const comment_id = action.payload;
      console.log(comment_id);
      return {
        ...state,
        comments: [...state.comments].filter(
          (comment) => comment._id !== comment_id
        ),
      };
    default:
      return { ...state };
  }
};
