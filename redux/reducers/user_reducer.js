import { TYPE_GET_USER } from "../types/types";

const userInitialState = {
  userName: "",
  userAge: 0,
  userGender: "",
  userID: "",
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case TYPE_GET_USER:
      return {
        ...state,
        userName: action.payload.userName || state.userName,
        userAge: action.payload.userAge || state.userAge,
        userGender: action.payload.userGender || state.userGender,
        userID: action.payload.userID || state.userID,
      };
    default:
      return state;
  }
};

export default userReducer;
