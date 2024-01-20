import NicknameChangeComponent from "./Component";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../../../../modules/user";
import { useNavigate } from "react-router-dom";

const NicknameChangeContainer = () => {
  const tempUserArr = [];

  const dispacth = useDispatch();
  const navigate = useNavigate();
  const currUserName = useSelector((state) => state.user.currUserName);

  const userInfo = () => {
    axios
      .post("/api/user/getUser")
      .then((data) => {
        data?.data?.map((item) => {
          tempUserArr.push(item);
        });

      })
      .catch((err) => {
        console.error(err);
      });
  };
  const namecheck = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;

  const namecheckFunc = (changeName) => {
    const findName = (elem) => {
      if (elem.userName === changeName) return true;
    };
    const nameresult = namecheck.test(changeName);
    if (changeName.length === 0) {
      return {
        text: "사용하실 닉네임을 입력해주세요.",
      };
    }
    if (nameresult) {
      const tempName = tempUserArr.find(findName);
      if (tempName) {
        return {
          class: "red",
          text: "닉네임이 중복되었습니다.",
        };
      }
      return {
        class: "green",
        text: "좋은 닉네임이네요 :)",
      };
    } else {
      return {
        class: "red",
        text: "2~10글자 닉네임을 지어주세요.",
      };
    }
  };

  const changeNameClick = (changeName) => {
    if (!changeName) {
      return alert("정보를 입력해주십쇼");
    }
    axios
      .post("/api/user/clearCookie", {
        changeName,
        currUserName,
      })
      .then((data) => {
        return {
          changeName: data.data.changeName,
          serverName: data.data.serverName,
        };
      })
      .then((userInfo) => {
        axios.post("/api/user/changename", userInfo).then((data) => {
          dispacth(
            action.check({
              server: data.data.data.currServerName,
              name: data.data.data.currUserName,
            })
          );
          dispacth(
            action.login({
              currServerName: data.data.data.currServerName,
              currUserName: data.data.data.currUserName,
            })
          );
          alert("성공적으로 닉네임을 변경했습니다.");
          navigate("/mypage");
        });
      });
  };

  return (
    <NicknameChangeComponent
      namecheck={namecheckFunc}
      changeClick={changeNameClick}
      userInfo={userInfo}
    />
  );
};

export default NicknameChangeContainer;
