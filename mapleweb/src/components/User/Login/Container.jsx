import { useDispatch } from "react-redux";
import LoginComponent from "./Component";
import axios from "axios";
import { action } from "../../../modules/user";
import crypto from "crypto-js";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginClick = (loginId, loginPw) => {

    loginPw = crypto.SHA256(loginPw).toString();
    axios
      .post("/api/user/login", { loginId, loginPw })
      .then((data) => {
        if (data.data.status == 200) {
          alert("로그인 성공");
          dispatch(action.login(data.data.data));
          navigate("/");
        } else {
          if (data.data.status == 502) {
            alert("존재하지 않는 ID입니다.");
          } else alert("잘못된 비밀번호입니다.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return <LoginComponent loginClick={loginClick} />;
};

export default LoginContainer;
