import { combineReducers, createStore } from "redux";
import userReducer from "../reducers/user_reducer"

const rootReducer = combineReducers({
    user: userReducer,
});

export const store = createStore(rootReducer);

export default store;