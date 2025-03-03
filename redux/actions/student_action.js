import { TYPE_GET_STUDENT, TYPE_SET_STUDENT } from "../types/types";

export const getStudent = (student) => ({ type: TYPE_GET_STUDENT, payload: student });
export const setStudent = (student) => ({ type: TYPE_SET_STUDENT, payload: student });