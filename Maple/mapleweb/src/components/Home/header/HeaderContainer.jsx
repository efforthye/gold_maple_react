import HeaderComponent from "./HeaderComponent";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { action as imgAction } from "../../../modules/onImg";

const logout = () => {
  try {
    axios.post("/api/user/logout").then((data) => {});
  } catch (error) {
    console.error(error);
  }
};

const HeaderContainer = () => {
  const headerBanner = useSelector((state) => state.header.banner);
  const headerIcon = useSelector((state) => state.header.icon);
  const headerText = useSelector((state) => state.header.text);
  const currUserName = useSelector((state) => state.user.currUserName);
  const navigate = useNavigate();
  const [logoutState, setLogoutState] = useState(false);
  const onlyHeaderLogoutUpdate = useRef(false);
  const [currUserImgState, setCurrUserImgState] = useState("");
  const dispatch = useDispatch();

  const getUserImg = async (currUserName) => {
    const data = await axios.post("/api/user/getImg", {
      currUserName: currUserName,
    });
    setCurrUserImgState(data.data);
  };

  useEffect(() => {
    if (onlyHeaderLogoutUpdate.current) {
      logout();
      navigate("/");
    } else onlyHeaderLogoutUpdate.current = true;
  }, [logoutState]);

  useEffect(() => {
    if (!currUserName) return;
    getUserImg(currUserName);
  }, [currUserName]);

  useEffect(() => {
    if (currUserImgState == "") return;
    else {
      dispatch(imgAction.onImg(currUserImgState));
    }
  }, [currUserImgState]);
  return (
    <HeaderComponent
      paint={headerBanner}
      icon={headerIcon}
      text={headerText}
      currUserName={currUserName}
      logout={logout}
      setLogoutState={setLogoutState}
      currUserImgState={currUserImgState}
    ></HeaderComponent>
  );
};

export default HeaderContainer;
