import { useReducer } from "react";
import { UPDATE_CAR , UPDATE_USER } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CAR:
      return {
       ...state,
       cars:[...action.cars]
      };

    case UPDATE_USER:
      return {
        ...state,
        users:[...action.users]

      };

    default:
      return state;
  }
};

export function useAppReducer(initialState) {
  return useReducer(reducer, initialState);
}
