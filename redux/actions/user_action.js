import { TYPE_GET_USER } from "../types/types";

export const getUser = (user) => ({ type: TYPE_GET_USER, payload: user });