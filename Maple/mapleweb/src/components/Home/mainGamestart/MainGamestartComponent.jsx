import styled from "styled-components";
import gameStartBackground from "../Img/main_gamestart_banner.png";

import gameStart from "../Img/game-start.png";
import download from "../Img/header_game_down.png";
import { Link } from "react-router-dom";
import HomeComponet from "..";

import UserComponent from "../../User";

import badge from "../Img/main_gamestart_badge.png";
import MypageContainer from "../../User/MyPage/Container";
import { useEffect } from "react";
import NotFound from "../../../NotFound";

const MainGamestartComponent = ({
  currUserName,
  currUserWorld,
  logout,
  setLogoutState,
  getUserImg,
  thumbnailImg,
  setThumbnailImg,
}) => {
  useEffect(() => {
    if (currUserName == undefined) return;
    getUserImg(currUserName, setThumbnailImg);
  }, [currUserName]);

  return (
    <MainGamestart bgImg={gameStartBackground}>
      <div className="mainGamestart">
        <div className="mainGamestart_infomationCenter">
          <div className="mainGamestart_infomationCenter_innerBox">
            <div>
              <Link to="/Error" element={<NotFound />}>
                <img src={badge} alt={"뱃지"} />
              </Link>
            </div>
            <div className="mainGamestart_infomationCenter_innerBox_text">
              <Link to="/Error" element={<NotFound />}>
                <span>업데이트 정보센터</span>
              </Link>
              <br />
              <Link to="/Error" element={<NotFound />}>
                <span>2022.11.24 / ver.1.2.371 업데이트 미리보기</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mainGamestart_gameStart">
          <div className="mainGamestart_gameStart_start">
            <div
              className="header_innerBox_center_start"
              onClick={() => {
                window.location.href = "https://play2048.co/";
              }}
            >
              <img src={gameStart} alt="게임 스타트" />
            </div>
          </div>
          <div className="mainGamestart_gameStart_download">
            <div className="header_innerBox_center_download">
              <img src={download} alt={"다운로드"} />
            </div>
          </div>
        </div>
        {document.cookie.split("=")[0] == "login" ? (
          <div className="mainGamestart_logged">
            <div className="mainGamestart_logged_innerBox">
              <div className="mainGamestart_logged_innerBox_hero_cover">
                <div className="mainGamestart_logged_innerBox_hero">
                  <Link to="/Mypage" element={<MypageContainer />}>
                    <img src={thumbnailImg} alt="아바타" />
                  </Link>
                </div>
              </div>
              <div className="mainGamestart_logged_innerBox_briefProfile">
                <div className="mainGamestart_logged_innerBox_briefProfile_nameLogout">
                  <Link to="/Mypage" element={<MypageContainer />}>
                    <div
                      className="mainGamestart_logged_innerBox_briefProfile_name"
                      onClick={() => {
                      }}
                    >
                      {currUserName}
                    </div>
                  </Link>
                  <div className="mainGamestart_logged_innerBox_briefProfile_server">
                    {currUserWorld}
                  </div>
                  <div className="mainGamestart_logged_innerBox_briefProfile_Logout">
                    <Link to="/" element={<HomeComponet />}>
                      <button
                        className="mainGamestart_logged_innerBox_briefProfile_LogoutButton"
                        onClick={() => {
                          setLogoutState((state) => !state);
                        }}
                      >
                        로그아웃
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mainGamestart_logged_innerBox_briefProfile_mypage">
                  <Link to="/Mypage" element={<MypageContainer />}>
                    <button className="mainGamestart_logged_innerBox_briefProfile_mypage_inner">
                      내 정보 보기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mainGamestart_user">
            <div>
              <Link to={"/login"} element={<UserComponent />}>
                <button className="mainGamestart_user_loginButton">
                  금쪽이ID 로그인{" "}
                </button>
              </Link>
              <Link to={"/regist"} element={<UserComponent />}>
                <button className="mainGamestart_user_registButton">
                  금쪽이ID 회원가입
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainGamestart>
  );
};
export default MainGamestartComponent;

const MainGamestart = styled.div`
  background-image: url(${(props) => props.bgImg});
  display: flex;
  justify-content: center;

  @media only screen and (min-width: 1150px) {
    height: 180px;
  }

  @media only screen and (max-width: 1150px) {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 360px;
  }

  .mainGamestart {
    position: relative;
    width: 1200px;
    @media only screen and (max-width: 1150px) {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      padding-right: 20px;
      width: 100%;
    }
  }

  .mainGamestart_infomationCenter {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .mainGamestart_infomationCenter_innerBox {
    display: flex;
    @media only screen and (min-width: 1024px) {
      width: 450px;
    }
    @media only screen and (max-width: 1150px) {
      justify-content: center;
    }
  }

  .mainGamestart_infomationCenter_innerBox_text {
    display: flex;
    flex-direction: column;
    justify-content: center;

    a {
      text-decoration: none;
    }

    a:first-child {
      color: #f68500;
    }

    a:last-child {
      color: #a9a9a9;
      white-space: normal;
    }
  }

  .mainGamestart_gameStart {
    position: relative;
    div:first-child {
      position: absolute;
      left: 220px;
      bottom: -10px;
    }
    div:last-child {
      position: absolute;
      left: 260px;
      bottom: -12px;
    }
    @media only screen and (max-width: 1150px) {
      display: none;
    }
  }
  .mainGamestart_user {
    display: flex;
    flex-direction: column;
    justify-content: center;

    div {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    @media only screen and (min-width: 1150px) {
      position: absolute;
      top: 50px;
      right: -0px;
    }

    button {
      color: white;
      border-radius: 3px;
      border: none;
      padding-top: 16px;
      padding-bottom: 16px;

      @media only screen and (min-width: 1151px) {
        padding-left: 40px;
        padding-right: 40px;
      }
      white-space: nowrap;
    }
  }
  .mainGamestart_user_loginButton {
    background-color: rgb(59, 117, 210);
    margin-right: 8px;
    
    @media only screen and (max-width: 1150px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  .mainGamestart_user_registButton {
    background-color: rgb(246, 133, 0);

    @media only screen and (max-width: 1150px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  .mainGamestart_logged {
    position: absolute;
    top: 30px;
    right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    color: white;

    @media only screen and (max-width: 1150px) {
      top: -670px;
    }

    .mainGamestart_logged_innerBox {
      display: flex;
      .mainGamestart_logged_innerBox_hero_cover {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .mainGamestart_logged_innerBox_hero {
        width: 124px;
        height: 96px;
        margin-right: 5px;

        @media only screen and (max-width: 1150px) {
          display: flex;
          justify-content: center;
        }
        a {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }

      .mainGamestart_logged_innerBox_hero img {
        width: 90%;
        @media only screen and (max-width: 1150px) {
          width: 100%;
          height: 70%;
        }
      }

      .mainGamestart_logged_innerBox_briefProfile {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .mainGamestart_logged_innerBox_briefProfile_nameLogout {
          display: flex;
          margin-bottom: 5px;
          @media only screen and (max-width: 1150px) {
            margin-bottom: 0px;
          }
          .mainGamestart_logged_innerBox_briefProfile_name {
            margin-top: 9px;
            margin-bottom: 10px;
            color: white;

            @media only screen and (max-width: 1150px) {
              color: #222;
            }
          }
          .mainGamestart_logged_innerBox_briefProfile_Logout {
            @media only screen and (max-width: 1150px) {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
          .mainGamestart_logged_innerBox_briefProfile_server {
            color: white;
            margin-top: 9px;
            margin-bottom: 10px;
            font-size: 11px;
            white-space: nowrap;

            @media only screen and (max-width: 1150px) {
              color: #222;
            }
          }
          .mainGamestart_logged_innerBox_briefProfile_LogoutButton {
            color: white;
            background-color: rgb(59, 117, 210);
            border: none;
            border-radius: 3px;
            color: #cecece;
            font-size: 11px;
            padding-top: 5px;
            padding-bottom: 5px;
            white-space: nowrap;
          }
        }
        .mainGamestart_logged_innerBox_briefProfile_mypage_inner {
          background-color: rgb(59, 117, 210);
          border: none;
          color: white;
          border-radius: 3px;
          width: 100%;
          height: 50px;
          white-space: nowrap;
          @media only screen and (max-width: 1150px) {
            height: 30px;
          }
        }
      }
    }
  }
`;
