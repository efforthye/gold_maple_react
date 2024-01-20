import styled from "styled-components";
import { Link } from "react-router-dom";
import menuLogo from "../Img/menu-logo.png";
import homeLogo from "../Img/home-logo.png";
import mapleLogo from "../Img/goldsaekki-logo-remove.png";
import loginChar from "../Img/login-char.png";
import footerLogo from "../Img/login-footer.png";
import backgroundImg from "../Img/login-background.png";
import { useState } from "react";
import menuselectLogo from "../Img/menu-select-logo.png";
import LoginHeaderComp from "./LoginHeader";
import FindLoginContainer from "./FindLoginId/Container";
import FindPwContainer from "./FindLoginPw/Container";

const LoginComponent = ({ loginClick }) => {
  const [loginId, setloginId] = useState("");
  const [loginPw, setloginPw] = useState("");
  const [select, setSelect] = useState(true);
  const [findId, setFindId] = useState(true);
  const [findPw, setFindPw] = useState(true);

  return (
    <>
      {select ? <></> : <LoginHeaderComp />}
      {findId ? (
        <></>
      ) : (
        <FindLoginContainer findId={findId} setFindId={setFindId} />
      )}
      {findPw ? (
        <></>
      ) : (
        <FindPwContainer findPw={findPw} setFindPw={setFindPw} />
      )}
      <LoginBox>
        <LoginHeader>
          <div>
            {select ? (
              <button
                onClick={() => {
                  setSelect((select) => !select);
                }}
              >
                <img src={menuLogo} alt={"메뉴"} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelect((select) => !select);
                }}
              >
                <img src={menuselectLogo} alt={"메뉴"} />
              </button>
            )}

            <Link to={"/"}>
              <button>
                <img src={homeLogo} alt={"홈"} />
              </button>
            </Link>
          </div>
          <div>
            <Link to={"/"}>
              <button>
                <img src={mapleLogo} alt={"우측로고"} />
              </button>
            </Link>
          </div>
        </LoginHeader>
        <LoginMain>
          <p>금쪽이스토리 로그인</p>
          <LoginText>
            <div>금쪽이ID</div>
            <div>
              <input
                placeholder={"금쪽이ID"}
                value={loginId}
                type={"text"}
                onInput={(e) => {
                  setloginId(e.target.value);
                }}
                onKeyUp={() => {
                  if (window.event.keyCode == 13) {
                    loginClick(loginId, loginPw);
                  }
                }}
              />
            </div>
            <div>
              <input
                placeholder={"PW"}
                value={loginPw}
                type={"password"}
                onInput={(e) => {
                  setloginPw(e.target.value);
                }}
                onKeyUp={() => {
                  if (window.event.keyCode == 13) {
                    loginClick(loginId, loginPw);
                  }
                }}
              />
            </div>
            <button
              onClick={() => {
                loginClick(loginId, loginPw);
              }}
            >
              로그인
            </button>
          </LoginText>
          <LinkBox>
            <Link to={"/regist"}>
              <p>회원가입</p>
            </Link>
            <p> | </p>
            <p
              onClick={() => {
                setFindId((findId) => !findId);
              }}
            >
              금쪽이ID 찾기
            </p>
            <p> | </p>
            <p
              onClick={() => {
                setFindPw((findPw) => !findPw);
              }}
            >
              {" "}
              비밀번호 찾기{" "}
            </p>
          </LinkBox>
          <img src={loginChar} alt="밑배경" />
        </LoginMain>
        <LoginFooter>
          <div>
            <img src={footerLogo} alt={"하단로고"}></img>
          </div>
        </LoginFooter>
      </LoginBox>
    </>
  );
};

export default LoginComponent;

const LoginBox = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  width: 100%;
  overflow: hidden;
  position: relative;

  @media only screen and (max-width: 1280px) {
    width: 100%;
    background-size: cover;

    & > div {
      width: 100%;
      background-size: initial;
      &:nth-child(2) {
        width: 600px;
        margin: auto;
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    & > div:first-child > div {
      padding-top: 50px;
      &:last-child {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    & > div:nth-child(2) {
      & > p {
        font-size: 35px;
      }
      width: 450px;
      margin: auto;
    }
  }

  @media only screen and (max-width: 480px) {
    & > div:first-child > div {
      padding: 20px 0;
    }
    & > div:nth-child(2) {
      > div > * {
        font-size: 20px;
      }
      & > div:nth-child(3) * {
        font-size: 16px;
      }
      & > p {
        font-size: 25px;
      }
      width: 300px;
      margin: auto;
    }
  }
`;

const LoginHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  & > button {
    position: relative;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }

  & > div button {
    &:first-child {
      position: relative;
      background-color: transparent;
      border: none;
      cursor: pointer;
      z-index: 9999;
    }

    & > button:last-child {
      background-color: transparent;
      cursor: pointer;
      border: none;
      z-index: 9999;
    }
  }

  & > div:last-child > a > button img {
    width: 150px;
  }
`;

const LoginMain = styled.div`
  height: 750px;
  width: 600px;
  margin: auto;

  & > p {
    font-size: 50px;
    color: white;
    text-align: center;
    letter-spacing: -0.3rem;
    margin: 10px 0;
  }
  > img {
    width: 100vw;
    position: absolute;
    left: 0;
    bottom: 150px;
    min-width: 1500px;
    pointer-events: none;
  }
`;

const LoginText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;

  & button {
    width: 100%;
    height: 80px;
    background-color: rgb(246, 133, 0);
    color: white;
    font-size: 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  & div:first-child {
    width: 100%;
    height: 80px;
    background-color: rgb(246, 133, 0);
    color: white;
    font-size: 25px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  & div:nth-child(2) {
    background-color: #17151c;
    color: white;
    width: 100%;
    height: 80px;
  }

  & div:nth-child(3) {
    margin-top: 5px;
    width: 100%;
    height: 80px;
    border: none;
    background-color: #17151c;
    font-size: 20px;
  }

  & div:nth-child(2) > input,
  & div:nth-child(3) > input {
    width: 100%;
    height: 75px;
    border: none;
    background-color: #17151c;
    padding-left: 35px;
    font-size: 20px;
    color: rgb(118, 118, 118);
  }

  & div:nth-child(2) span {
    font-size: 20px;
    color: rgb(118, 118, 118);
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.15rem;
  }

  & button {
    margin-top: 20px;
  }
`;

const LoginFooter = styled.div`
  height: 150px;
  background-color: rgb(246, 133, 0);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 0 auto;

  & > a > p {
    font-size: 18px;
    color: darkgray;
    letter-spacing: -0.1rem;
    padding: 5px;
    margin: 0;
  }

  & > a {
    text-decoration: none;
  }

  & > p {
    font-size: 18px;
    color: darkgray;
    letter-spacing: -0.1rem;
    padding: 5px;
    margin: 0;
    cursor: pointer;
  }
`;
