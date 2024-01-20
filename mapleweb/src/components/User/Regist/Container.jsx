import RegistComponent from "./Component";
import { useDispatch } from "react-redux";
import { action } from "../../../modules/regist";
import crypto from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tempUserArr = []; 

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

  const idcheck = /^[a-z0-9_-]{5,20}$/;

  const pwcheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

  const namecheck = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;

  let idresult;
  let pwresult;
  let nameresult;

  const idcheckFunc = (userId) => {
    const findUser = (elem) => {
      if (elem.userId === userId) return true;
    };
    idresult = idcheck.test(userId);
    if (userId.length === 0) {
      return {
        text: "사용하실 아이디를 입력해주세요.",
      };
    }
    if (idresult) {
      const tempUser = tempUserArr.find(findUser);
      if (tempUser) {
        idresult = false;
        return {
          class: "red",
          text: "아이디가 중복되었습니다.",
        };
      }
      return {
        class: "green",
        text: "아이디로 사용 가능합니다.",
      };
    } else {
      return {
        class: "red",
        text: "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
      };
    }

  };

  const pwcheckFunc = (userPw) => {
    pwresult = pwcheck.test(userPw);
    if (userPw.length === 0) {
      return {
        text: "사용하실 비밀번호를 입력해주세요.",
      };
    }
    if (pwresult) {
      return {
        class: "green",
        text: "멋진 비밀번호네요!",
      };
    } else {
      return {
        class: "red",
        text: "8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.",
      };
    }
  };

  const pwRecheckFunc = (pwReCheck, userPw) => {
    if (pwReCheck.length === 0) {
      return {
        text: "비밀번호를 확인해주세요.",
      };
    }
    if (userPw === pwReCheck) {
      return {
        class: "green",
        text: "비밀번호가 일치합니다.",
      };
    } else {
      return {
        class: "red",
        text: "비밀번호가 불일치합니다. 다시 확인해주세요.",
      };
    }
  };
  const namecheckFunc = (userName) => {
    const findName = (elem) => {
      if (elem.userName === userName) return true;
    };
    nameresult = namecheck.test(userName);
    if (userName.length === 0) {
      return {
        text: "사용하실 닉네임을 입력해주세요.",
      };
    }
    if (nameresult) {
      const tempName = tempUserArr.find(findName);
      if (tempName) {
        nameresult = false;
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

  const registClick = (userId, userPw, userName, server, pwReCheck) => {
    if (
      !userId ||
      !userPw ||
      !userName ||
      server === "서버 선택" ||
      !pwReCheck
    ) {
      return alert("정보를 입력해주세요!");
    } else {
      if (idresult === false || pwresult === false || nameresult === false) {
        return alert("양식에 맞는 정보를 입력하세요.");
      }
      if (userPw != pwReCheck) {
        return alert("비밀번호와 비밀번호확인 정보가 일치하지 않습니다.");
      }
      if (userPw != pwReCheck) {
        return alert("비밀번호와 비밀번호확인 정보가 일치하지 않습니다.");
      }
      userPw = crypto.SHA256(userPw).toString();
      axios
        .post("/api/user/regist", {
          userId,
          userPw,
          userName,
          server,
        })
        .then((data) => {
        })
        .catch((err) => {
          console.error(err);
        });

      dispatch(action.regist(userId, userPw, userName, server));
      alert("회원가입에 성공하셨습니다!");
      setTimeout(() => {
        navigate("/login");
      }, 100);
    }
  };
  return (
    <RegistComponent
      registClick={registClick}
      idcheck={idcheckFunc}
      pwcheck={pwcheckFunc}
      namecheck={namecheckFunc}
      pwRecheckFunc={pwRecheckFunc}
      userInfo={userInfo}
    />
  );
};

export default RegistContainer;
