import { TYPE_SET_STUDENT } from "../types/types";

export const setStudent = (student) => ({ type: TYPE_SET_STUDENT, payload: student });