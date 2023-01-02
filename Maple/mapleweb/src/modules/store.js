import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { initialize as headerIni, reducer as headerReducer } from "./header";
import { initialize as registIni, reducer as registReducer } from "./regist";
import { initialize as userIni, reducer as userReducer } from "./user";
import {
  initialize as communityIni,
  reducer as communityReducer,
} from "./community";
import { initialize as reportIni, reducer as reportReducer } from "./support";
import { initialize as adminIni, reducer as adminReducer } from "./admin";
import { initialize as searchIni, reducer as searchReducer } from "./search";
import { initialize as onImgIni, reducer as onImgReducer } from "./onImg";

const store = createStore(
  combineReducers({
    regist: registReducer,
    report: reportReducer,
    user: userReducer,
    header: headerReducer,
    community: communityReducer,
    admin: adminReducer,
    search: searchReducer,
    onImg: onImgReducer,
  }),
  {
    regist: registIni,
    report: reportIni,
    header: headerIni,
    user: userIni,
    community: communityIni,
    admin: adminIni,
    search: searchIni,
    onImg: onImgIni,
  },

  composeWithDevTools()
);

export default store;
