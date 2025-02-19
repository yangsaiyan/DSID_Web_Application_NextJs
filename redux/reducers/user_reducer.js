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
      return { ...state, userName: "John", userAge: 25};
    default:
      return state;
  }
};

export default userReducer;