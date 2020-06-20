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
  EDIT_COMMENT,
  SET_CONVERSATIONS_ROOMS,
  SET_MESSAGES,
  ADD_MESSAGE,
  DELETE_PRODUCT,
  ADD_SHOPPING_LIST,
  REMOVE_SHOPPING_LIST,
  DELETE_MESSAGE,
  REACT_MESSAGE,
} from "redux/types";

const initialState = {
  products: [],
  favProducts: [],
  singleProduct: {},
  userData: null,
  comments: [],
  messages: [],
  conversationRooms: [],
  shoppingList: [],
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
      const { comment, commentIdToDelete } = action.payload;
      return {
        ...state,
        comments: [comment, ...state.comments].filter(
          (comm) => comm._id !== commentIdToDelete
        ),
      };
    case DELETE_COMMENT:
      const comment_id = action.payload;
      return {
        ...state,
        comments: [...state.comments].filter(
          (comment) => comment._id !== comment_id
        ),
      };
    case EDIT_COMMENT:
      const editedComment = action.payload;
      return {
        ...state,
        comments: state.comments.reduce((res, comment) => {
          if (comment._id === editedComment._id) return [...res, editedComment];
          else return [...res, comment];
        }, []),
      };
    case SET_CONVERSATIONS_ROOMS:
      return {
        ...state,
        conversationRooms: action.payload,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case ADD_MESSAGE:
      const {
        recipient: { nickName },
      } = action.payload;
      let newConversationsRooms;
      const index = state.conversationRooms.findIndex(
        (room) =>
          room.writer.nickName === nickName ||
          room.recipient.nickName === nickName
      );
      if (index > -1)
        newConversationsRooms = state.conversationRooms.reduce(
          (result, current, ind) => {
            if (ind === index) return [action.payload, ...result];
            else return [...result, current];
          },
          []
        );
      else newConversationsRooms = [action.payload, ...state.conversationRooms];

      return {
        ...state,
        messages: [...state.messages, action.payload],
        conversationRooms: newConversationsRooms,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userData: {
          ...state.userData,
          likesProducts: [...state.userData.likesProducts],
          comments: [...state.userData.comments],
          products: [...state.userData.products].filter(
            (product) => product !== action.payload
          ),
        },
      };
    case ADD_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: [action.payload, ...state.shoppingList],
      };
    case REMOVE_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: [...state.shoppingList].filter(
          (product) => product._id !== action.payload
        ),
      };
    case DELETE_MESSAGE:
      const deletedMessageIndex = state.messages.findIndex(
        (message) => message._id === action.payload
      );
      const deletedMessage = {
        ...state.messages[deletedMessageIndex],
        deleted: true,
      };
      state.messages[deletedMessageIndex] = deletedMessage;
      const refreshMessages = [...state.messages];
      return {
        ...state,
        messages: refreshMessages,
      };

    case REACT_MESSAGE:
      const {
        _doc: { _id: message_id },
        reacts,
      } = action.payload;
      const reactedMessageIndex = state.messages.findIndex(
        (message) => message._id === message_id
      );
      const reactedMessage = {
        ...state.messages[reactedMessageIndex],
        reacts,
      };
      state.messages[reactedMessageIndex] = reactedMessage;
      return {
        ...state,
        messages: [...state.messages],
      };

    default:
      return { ...state };
  }
};
