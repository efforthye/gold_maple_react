import "./App.css";

import HeaderContainer from "./components/Home/header/HeaderContainer";

import AdministratorComponet from "./components/Administrator";
import HomeComponet from "./components/Home";
import CommunityComponet from "./components/Community";
import SupportComponet from "./components/Support";
import { Routes, Route, useLocation } from "react-router-dom";
import UserComponent from "./components/User";
import MainSearchResultContainer from "./components/Home/mainSearchResult/MainSearchResultContainer";
import Footer from "./components/Home/footer/Footer";
import Menubar from "./components/Home/menubar/Menubar";
import axios from "axios";
import { action } from "./modules/user";
import { useDispatch } from "react-redux";
import { action as adminaction } from "./modules/admin";
import RankComponent from "./components/Ranking";
import NewsComponet from "./components/News";
import TopLogoContainer from "./components/Home/topLogo/TopLogoContainer";

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const adminLogin = () => {
    if (document.cookie) {
      axios
        .post("/api/admin/admincheck")
        .then(function (data) {
          dispatch(adminaction.login(data.data));
        });
    }
  };
  const loginCheck = () => {
    if (document.cookie.split("=")[0] == "login") {
      axios
        .post("/api/user/logincheck")
        .then((data) => {
          dispatch(action.check(data.data.userInfo));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  document.cookie.split("=")[0] == "admin" ? adminLogin() : loginCheck();

  return (
    <div id="body_wrapper">
      <div id="body_content">
        <TopLogoContainer></TopLogoContainer>
        {location.pathname == "/regist" || location.pathname == "/login" || location.pathname =="/Error" ? (
          <></>
        ) : (
          <Menubar />
        )}
        <Routes>
          <Route path="/News/*" element={<HeaderContainer />}></Route>
          <Route path="/Ranking/*" element={<HeaderContainer />}></Route>
          <Route path="/Community/*" element={<HeaderContainer />}></Route>
          <Route path="/Support/*" element={<HeaderContainer />}></Route>
          <Route path="/Administrator/*" element={<HeaderContainer />}></Route>
          <Route path="/Mypage/*" element={<HeaderContainer />}></Route>
          <Route path="/Search/*" element={<HeaderContainer />}></Route>
        </Routes>
        <UserComponent />

        <Routes>
          <Route path="/" element={<HomeComponet />}></Route>
          <Route path="/News/*" element={<NewsComponet />}></Route>
          <Route path="/Support/*" element={<SupportComponet />}></Route>
          <Route
            path="/Administrator/*"
            element={<AdministratorComponet />}
          ></Route>
          <Route path="/Community/*" element={<CommunityComponet />}></Route>
          <Route path="/Ranking/*" element={<RankComponent />}></Route>
          <Route
            path="/Search/*"
            element={<MainSearchResultContainer />}
          ></Route>

        </Routes>
      </div>
      {location.pathname =="/Error" ? (
          <></>
        ) : (
          <Footer></Footer>
        )}
      
    </div>
  );
}

export default App;
