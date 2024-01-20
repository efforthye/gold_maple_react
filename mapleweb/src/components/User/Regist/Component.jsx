import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import backgroundImg from "../Img/login-background.png";
import loginChar from "../Img/login-char.png";

const RegistComponent = ({
  registClick,
  idcheck,
  pwcheck,
  namecheck,
  pwRecheckFunc,
  userInfo,
}) => {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [pwReCheck, setPwReCheck] = useState("");
  const [userName, setName] = useState("");
  const [server, setServer] = useState("서버 선택");

  useEffect(() => {
    userInfo();
  }, []);
  const idMemo = useMemo(() => {
    return idcheck(userId);
  }, [userId]);

  const pwMemo = useMemo(() => {
    return pwcheck(userPw);
  }, [userPw]);

  const checkMemo = useMemo(() => {
    return pwRecheckFunc(pwReCheck, userPw);
  }, [pwReCheck]);

  const nameMemo = useMemo(() => {
    return namecheck(userName);
  }, [userName]);

  return (
    <RegistBox>
      <h2>금쪽이스토리 회원 가입</h2>
      <RegistMain>
        <RegistText>
          <p>아이디 </p>
          <input
            placeholder={"아이디"}
            value={userId}
            type={"text"}
            onInput={(e) => {
              setId(e.target.value);
            }}
          />
          <p className={idMemo.class}>{idMemo.text}</p>
        </RegistText>
        <RegistText>
          <p>비밀번호 </p>
          <input
            placeholder={"비밀번호"}
            value={userPw}
            type={"password"}
            onInput={(e) => {
              setPw(e.target.value);
            }}
          />
          <p className={pwMemo.class}>{pwMemo.text}</p>
        </RegistText>
        <RegistText>
          <p>비밀번호 확인</p>
          <input
            placeholder={"비밀번호"}
            value={pwReCheck}
            type={"password"}
            onInput={(e) => {
              setPwReCheck(e.target.value);
            }}
          />
          <p className={checkMemo.class}>{checkMemo.text}</p>
        </RegistText>
        <RegistText>
          <p>닉네임 </p>
          <input
            placeholder={"닉네임"}
            value={userName}
            type={"text"}
            onInput={(e) => {
              setName(e.target.value);
            }}
          />
          <p className={nameMemo.class}>{nameMemo.text}</p>
        </RegistText>
        <SelectBox>
          <select
            name="server"
            className="select"
            onChange={(e) => {
              setServer(e.target.value);
            }}
          >
            <option value="서버 선택">서버 선택</option>
            <option value="리부트">리부트</option>
            <option value="리부트2">리부트2</option>
            <option value="오로라">오로라</option>
            <option value="레드">레드</option>
            <option value="이노시스">이노시스</option>
            <option value="유니온">유니온</option>
            <option value="스카니아">스카니아</option>
            <option value="루나">루나</option>
            <option value="제니스">제니스</option>
            <option value="크로아">크로아</option>
            <option value="베라">베라</option>
            <option value="엘리시움">엘리시움</option>
            <option value="아케인">아케인</option>
            <option value="노바">노바</option>
          </select>
        </SelectBox>
        <ButtonBox>
          <button
            onClick={() => {
              registClick(userId, userPw, userName, server, pwReCheck);
            }}
          >
            회원가입
          </button>
          <Link to={"/login"}>
            <button>취소</button>
          </Link>
        </ButtonBox>
      </RegistMain>
    </RegistBox>
  );
};

export default RegistComponent;

const RegistBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background-image: url(${backgroundImg});
  background-size: contain;
  overflow: hidden;

  .select {
    font-size: 1rem;
  }
  & > h2 {
    padding-top: 20px;
    text-align: center;
    margin-bottom: 20px;
    color: white;
  }

  @media only screen and (max-width: 1280px) {
    width: 100%;
    background-size: cover;
    & > div {
      width: 100%;
      background-size: initial;
    }
  }

  @media only screen and (max-width: 1024px) {
    & > div > div:last-child > a > button {
      width: 100px;
      height: 40px;
    }
    & > div > div:last-child > button {
      width: 100px;
      height: 40px;
    }
  }

  @media only screen and (max-width: 768px) {
    & > div > div {
      & > p:first-child {
        font-size: 16px;
      }
      & > p:last-child {
        font-size: 10px;
      }

      &:last-child > a > button {
        width: 80px;
        height: 30px;
      }

      &:last-child > button {
        width: 80px;
        height: 30px;
      }
      input {
        width: 300px;
      }
    }
    .select {
      width: 100px;
    }
  }
`;

const RegistMain = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${loginChar});
  background-repeat: no-repeat;
  background-position: bottom;
  height: 700px;
`;

const RegistText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & p:first-child {
    color: white;
    font-weight: 600;
    font-size: 20px;
  }

  & p:last-child {
    font-size: 12px;
    color: white;
  }

  & input {
    width: 400px;
    height: 50px;
    border: 2px solid lightgray;
    background-color: rgb(234, 240, 254);
  }
  & input:first-child {
    margin-left: 10px;
  }

  & .green {
    color: green !important;
  }

  & .red {
    color: red !important;
  }
`;

const ButtonBox = styled.div`
  padding: 20px;

  & :first-child {
    width: 150px;
    height: 50px;
    border: none;
    background-color: rgb(246, 133, 0);
    margin-right: 10px;
    color: white;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }

  & > a:last-child {
    & > button {
      width: 150px;
      height: 50px;
      background-color: white;
      border: 2px solid lightgray;
      margin-right: 10px;
      color: rgb(246, 133, 0);
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const SelectBox = styled.div`
  select {
    width: 150px;
    height: 35px;
    border-radius: 3px;
    border: 2px solid lightgray;
    margin: 10px;
  }
`;
