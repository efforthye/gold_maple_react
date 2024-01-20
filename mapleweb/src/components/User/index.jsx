import RegistContainer from "../User/Regist/Container";
import LoginContainer from "../User/Login/Container";

import MypageContainer from "./MyPage/Container";
import { Route, Routes } from "react-router-dom";
import NotFound from "../Community/NotFound";
const UserComponent = () => {

  return (
    <div>
      <Routes>
        <Route path={"/regist"} element={<RegistContainer />}></Route>
        <Route path={"/login"} element={<LoginContainer />}></Route>
        <Route path={"/mypage/:route"} element={<MypageContainer />}></Route>
        <Route path={"/mypage/*"} element={<MypageContainer />}></Route>
        <Route path={"/Error/*"} element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default UserComponent;

