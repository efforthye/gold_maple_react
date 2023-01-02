import MypageComponent from "./Component";
import axios from "axios";
import { useDispatch } from "react-redux";
import { action } from "../../../modules/onImg";
import { useNavigate } from "react-router-dom";

const MypageContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserImg = (currUserName) => {

    axios
      .post("/api/user/getImg", {
        currUserName: currUserName,
      })
      .then((data) => {
        dispatch(action.onImg(data.data));
      });
  };

  const checkLogin = () => {
    if (!document.cookie) {
      alert("로그인 후에 이용가능합니다."); 
      setTimeout(() => {
        navigate("/login");
      }, 100);
    }
  };
  return <MypageComponent getUserImg={getUserImg} checkLogin={checkLogin} />;
};

export default MypageContainer;
