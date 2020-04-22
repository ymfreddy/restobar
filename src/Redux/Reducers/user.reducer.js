import { SET_USER } from "../Constants";
export const initialState = {
  usuario: null
};
export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        usuario: action.user
      };
  }
  return state;
};
