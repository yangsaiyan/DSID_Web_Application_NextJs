import { combineReducers, createStore } from "redux";
import studentReducer from "../reducers/student_reducer"

const rootReducer = combineReducers({
    student: studentReducer,
});

export const store = createStore(rootReducer);

export default store;