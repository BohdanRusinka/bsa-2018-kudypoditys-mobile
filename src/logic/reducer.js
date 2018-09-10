import { combineReducers } from "redux";

import search from "./search/reducer";
import login from "./login/reducer";
import user from "./auth-hoc/reducer";

export default combineReducers({
  search,
  login,
  user,
});
