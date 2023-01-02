import styled from "styled-components";
import { Link } from "react-router-dom";

import mainInfoImg1 from "../Img/main_info_1.png";
import mainInfoImg2 from "../Img/main_info_2.png";
import mainInfoImg3 from "../Img/main_info_3.png";
import NotFound from "../../../NotFound";
const MainInfo = () => {
  return (
    <MainInfoComponent>
      <div className="mainInfo_innerBox">
        <h1 className="mainInfo_intro">
          메이플스토리 게임정보
          <Link to="/Error" element={<NotFound />}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="30px"
              className="infoPlusSVG"
            >
              <path d="M200 344V280H136C122.7 280 112 269.3 112 256C112 242.7 122.7 232 136 232H200V168C200 154.7 210.7 144 224 144C237.3 144 248 154.7 248 168V232H312C325.3 232 336 242.7 336 256C336 269.3 325.3 280 312 280H248V344C248 357.3 237.3 368 224 368C210.7 368 200 357.3 200 344zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z" />
            </svg>
          </Link>
        </h1>
        <div className="mainInfo_innerBox_itemBox">
          <div className="mainInfo_item mainInfo_item_1">
            <div>
              <Link to="/Error" element={<NotFound />}>
                <img src={mainInfoImg1}></img>
              </Link>
            </div>
            <Link to="/Error" element={<NotFound />}>
              <div className="mainInfo_caption_1">
                <span className="mainInfo_title">파티퀘스트</span>
                <br />
                <span className="mainInfo_text">
                  이번 달의 파티퀘스트 일정 정복하기 !
                  <br />
                  용사님과 함께 파티퀘스트 즐기는 방법
                </span>
              </div>
            </Link>
          </div>
          <div className="mainInfo_item mainInfo_item_2">
            <div>
              <Link to="/Error" element={<NotFound />}>
                <img src={mainInfoImg2}></img>
              </Link>
            </div>
            <Link to="/Error" element={<NotFound />}>
              <div className="mainInfo_caption_2">
                <span className="mainInfo_title">캐릭터&스킬</span>
                <br />
                <span className="mainInfo_text">
                  모든 직업과 스킬을 한눈에!
                  <br />
                  메이플스토리의 캐릭터, 스킬 정보 확인하기
                </span>
              </div>
            </Link>
          </div>
          <div className="mainInfo_item mainInfo_item_3">
            <div>
              <Link to="/Error" element={<NotFound />}>
                <img src={mainInfoImg3} />
              </Link>
            </div>
            <Link to="/Error" element={<NotFound />}>
              <div className="mainInfo_caption_3">
                <span className="mainInfo_title">보안강화하기</span>
                <br />
                <span className="mainInfo_text">
                  편리와 보안을 한방에! <br />
                  안전하고 편하게 메이플스토리 즐기기
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainInfoComponent>
  );
};
export default MainInfo;

const MainInfoComponent = styled.div`
  @media only screen and (min-width: 1024px) {
    background: linear-gradient(to bottom, #f4f4f4 60%, #fff 62%, #fff);
    display: flex;
    justify-content: center;
    padding-top: 90px;
    padding-bottom: 90px;
    border-top: 1px solid gainsboro;
    .mainInfo_innerBox {
      width: 1200px;
    }
    .mainInfo_intro {
      font-weight: lighter;
      font-size: 40px;
      text-align: center;
      position: relative;
    }

    .infoPlusSVG {
      position: absolute;
      right: 0px;
      fill: lightgray;
    }

    .infoPlusSVG:hover {
      fill: gray;
    }

    .mainInfo_innerBox_itemBox {
      display: flex;
      justify-content: space-between;
    }

    .mainInfo_item {
      width: 33%;
      border-radius: 3px;
    }

    .mainInfo_item img:hover {
      transform: scale(1.1);
    }
    .mainInfo_item > div {
      overflow: hidden;
      width: 100%;
    }
    .mainInfo_item img {
      width: 100%;
      display: block;
      overflow: hidden;
      z-index: 10;
      transition: all 400ms linear;
    }
    .mainInfo_caption_1,
    .mainInfo_caption_2,
    .mainInfo_caption_3 {
      text-align: center;
      padding-top: 25px;
      padding-bottom: 25px;
      font-family: "NanumBarunGothic", "Malgun Gothic", sans-serif;
      z-index: 11;
    }

    .mainInfo_caption_1 {
      background-color: rgb(53, 53, 77);
      -webkit-box-reflect: below 3px -webkit-gradient(linear, left top, left
            bottom, from(transparent), color-stop(0.7, transparent), to(rgba(53, 53, 77, 0.25)));
    }

    .mainInfo_caption_2 {
      background-color: rgb(46, 59, 67);
      -webkit-box-reflect: below 3px -webkit-gradient(linear, left top, left
            bottom, from(transparent), color-stop(0.7, transparent), to(rgba(46, 59, 67, 0.25)));
    }

    .mainInfo_caption_3 {
      background-color: rgb(39, 60, 103);
      -webkit-box-reflect: below 3px -webkit-gradient(linear, left top, left
            bottom, from(transparent), color-stop(0.7, transparent), to(rgba(39, 60, 103, 0.25)));
    }

    .mainInfo_title {
      color: white;
      font-size: 20px;
    }

    .mainInfo_text {
      color: #cecece;
      font-size: 13px;
    }
    @font-face {
      font-family: "NanumBarunGothic";
      font-style: normal;
      font-weight: 400;
      src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot");
      src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix")
          format("embedded-opentype"),
        url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff")
          format("woff"),
        url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf")
          format("truetype");
    }

    @font-face {
      font-family: "NanumBarunGothic";
      font-style: normal;
      font-weight: 700;
      src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot");
      src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot?#iefix")
          format("embedded-opentype"),
        url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff")
          format("woff"),
        url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.ttf")
          format("truetype");
    }

    @font-face {
      font-family: "NanumBarunGothic";
      font-style: normal;
      font-weight: 300;
      src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot");
      src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot?#iefix")
          format("embedded-opentype"),
        url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.woff")
          format("woff"),
        url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.ttf")
          format("truetype");
    }

    .nanumbarungothic * {
      font-family: "NanumBarunGothic", sans-serif;
    }
  }

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;
