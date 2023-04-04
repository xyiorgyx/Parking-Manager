import { useReducer } from "react";
import { UPDATE_USER_CAR, UPDATE_SPACE, UPDATE_USER } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER_CAR:
      return {
        ...state,
        cars: [...action.cars],
      };

    case UPDATE_SPACE:
      return {
        ...state,
        spaces: [...action.spaces],
      };

    case UPDATE_USER:
      return {
        ...state,
        users: [...action.users],
      };
    case UPDATE_SPACE:
      return {
        ...state,
        spaces: [...action.spaces],
      };

    default:
      return state;
  }
};

export function useAppReducer(initialState) {
  return useReducer(reducer, initialState);
}
