import { useEffect, useRef, useState } from "react";
import MainGamestartComponent from "./MainGamestartComponent";
import axios from "axios";

const loginCheck = (setCurrUserName, setCurrUserWorld) => {
  if (document.cookie.split("=")[0] == "login") {
    try {
      axios.post("/api/user/logincheck").then((data) => {
        setCurrUserName(data.data.userInfo.name);
        setCurrUserWorld(data.data.userInfo.server);
      });
    } catch (error) {
      console.error(error);
    }
  }
};

const getUserImg = (currUserName, setThumbnailImg) => {
  if (document.cookie) {
    try {
      axios
        .post("/api/user/getImg", {
          currUserName: currUserName,
        })
        .then((data) => {
          setThumbnailImg(data.data);
        });
    } catch (error) {
      console.error(error);
    }
  }
};

const logout = () => {
  try {
    axios.post("/api/user/logout").then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error(error);
  }
};

const MainGamestartContainer = () => {
  const [_, setRender] = useState(false);
  const [currUserName, setCurrUserName] = useState("");
  const [currUserWorld, setCurrUserWorld] = useState("");
  const [logoutState, setLogoutState] = useState(false);
  const onlyMainLogoutUpdate = useRef(false);
  const [thumbnailImg, setThumbnailImg] = useState("/Img/catimg.png");

  useEffect(() => {
    loginCheck(setCurrUserName, setCurrUserWorld);
  }, []);

  useEffect(() => {
    if (onlyMainLogoutUpdate.current) {
      logout();
      setRender((state) => !state);
    } else onlyMainLogoutUpdate.current = true;
  }, [logoutState]);

  return (
    <MainGamestartComponent
      currUserName={currUserName}
      currUserWorld={currUserWorld}
      logout={logout}
      setLogoutState={setLogoutState}
      getUserImg={getUserImg}
      thumbnailImg={thumbnailImg}
      setThumbnailImg={setThumbnailImg}
    ></MainGamestartComponent>
  );
};

export default MainGamestartContainer;
