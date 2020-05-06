import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// reducers
import userReducer from "redux/reducers/userReducer";
import dataReducer from "redux/reducers/dataReducer";
import UIReducer from "redux/reducers/UIReducer";

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: UIReducer,
});

const store = createStore(
  reducers /* preloadedState, */,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
