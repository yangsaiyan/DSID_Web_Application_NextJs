import  * as types  from "../types/types";

const studentInitialState = {
  name: "",
  studentId: "",
  nric: "",
  email: "",
  faculty: "",
  course: "",
  race: "",
  gender: "",
  nationality: "",
  phoneNumber: "",
  permanentHomeAddress: "",
  walletAddress: "",
};

const studentReducer = (state = studentInitialState, action) => {
  switch (action.type) {
    case types.TYPE_GET_STUDENT:
      return state;
    case types.TYPE_SET_STUDENT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
