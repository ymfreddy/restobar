import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import ventaReducer from "./venta.reducer";

export default combineReducers({
  usarioRedux: userReducer,
  ventaRedux: ventaReducer
});
