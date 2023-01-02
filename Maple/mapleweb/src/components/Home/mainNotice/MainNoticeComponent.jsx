import { Link } from "react-router-dom";
import styled from "styled-components";

import topLeftImg0 from "../Img/main_notice/main_notice_0.png";
import topLeftImg1 from "../Img/main_notice/main_notice_1.png";
import topLeftImg2 from "../Img/main_notice/main_notice_2.png";
import topLeftImg3 from "../Img/main_notice/main_notice_3.png";
import topLeftImg4 from "../Img/main_notice/main_notice_4.png";
import topLeftImg5 from "../Img/main_notice/main_notice_5.png";
import topLeftImg6 from "../Img/main_notice/main_notice_6.png";

import topLeftSliderBtnOff from "../Img/main_notice/main_notice_slider_button_off.png";
import topLeftSliderBtnOn from "../Img/main_notice/main_notice_slider_button_on.png";

import topRightImg1 from "../Img/main_notice_top_right_1.jpg";
import topRightImg2 from "../Img/main_notice_top_right_2.jpg";

import bottomLeftImg from "../Img/main_notice_bottom_left.png";

import bottomRightImg1 from "../Img/main_notice_bottom_right_1.png";
import bottomRightImg2 from "../Img/main_notice_bottom_right_2.png";
import bottomRightImg3 from "../Img/main_notice_bottom_right_3.png";

import NotFound from "../../../NotFound";

import Slider from "react-slick";

const MainNotice = () => {
  const setting = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <MainNoticeComponent
      slideBtnOn={topLeftSliderBtnOn}
      slideBtnOff={topLeftSliderBtnOff}
    >
      <div className="mainNotice_innerBox">
        <div className="mainNotice_innerBox_top">
          <div className="mainNotice_innerBox_top_left">
            <div className="mainNotice_innerBox_top_left_innerBox">
              <Slider {...setting} dotsClass="mainNoticeSlider-css">
                <div>
                  <Link to="/Error" element={<NotFound />}>
                    <img src={topLeftImg0} />
                  </Link>
                </div>
                <div>
                  <Link to="/Error" element={<NotFound />}>
                    <img src={topLeftImg1} />
                  </Link>
                </div>
                <div>
                  <Link to="/Error" element={<NotFound />}>
                    <img src={topLeftImg2} />
                  </Link>
                </div>
                <div>
                  <Link to="/Error" element={<NotFound />}>
                    <img src={topLeftImg3} />
                  </Link>
                </div>
                <div>
                  <Link to="/Error" element={<NotFound />}>
                    <img src={topLeftImg4} />
                  </Link>
                </div>
                <div>
                  <Link to="/Error" element={<NotFound />}>
                    <img src={topLeftImg5} />
                  </Link>
                </div>
                <div>
                  <Link to="/Error" element={<NotFound />}>
                    <img src={topLeftImg6} />
                  </Link>
                </div>
              </Slider>
            </div>
          </div>
          <div className="mainNotice_innerBox_top_right">
            <div className="mainNotice_innerBox_top_right_left">
              <div className="mainNotice_innerBox_top_right_left_item">
                <div className="mainNotice_innerBox_top_right_left_item_icon">
                  <div>공지</div>
                </div>
                <div className="mainNotice_innerBox_top_right_left_item_text">
                  <Link to="/Error" element={<NotFound />}>
                    [점검완료] 12/22(목) 전체 월드 채널점검 (16:00~17:00)
                  </Link>
                </div>
              </div>
              <div className="mainNotice_innerBox_top_right_left_item">
                <div className="mainNotice_innerBox_top_right_left_item_icon">
                  <div>공지</div>
                </div>
                <div className="mainNotice_innerBox_top_right_left_item_text">
                  <Link to="/Error" element={<NotFound />}>
                    2022년 11월 확률형 아이템 검증 결과 공개
                  </Link>
                </div>
              </div>
              <div className="mainNotice_innerBox_top_right_left_item">
                <div className="mainNotice_innerBox_top_right_left_item_icon">
                  <div>공지</div>
                </div>
                <div className="mainNotice_innerBox_top_right_left_item_text">
                  <Link to="/Error" element={<NotFound />}>
                    12/26(월) 넥슨 고객상담실 시스템 점검 안내
                  </Link>
                </div>
              </div>
            </div>
            <div className="mainNotice_innerBox_top_right_right">
              <div className="mainNotice_innerBox_top_right_right_top">
                <Link to="/Error" element={<NotFound />}>
                  <img src={topRightImg1} />
                </Link>
              </div>
              <div className="mainNotice_innerBox_top_right_right_bottom">
                <Link to="/Error" element={<NotFound />}>
                  <img src={topRightImg2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mainNotice_innerBox_bottom">
          <div className="mainNotice_innerBox_bottom_left">
            <Link to="/Error" element={<NotFound />}>
              <img
                src={bottomLeftImg}
                className="mainNotice_innerBox_bottom_left_img"
              />
            </Link>
          </div>
          <div className="mainNotice_innerBox_bottom_right">
            <div className="mainNotice_innerBox_bottom_right_1">
              <Link to="/Support/BugReport">
                <img src={bottomRightImg1} />
              </Link>
            </div>
            <div className="mainNotice_innerBox_bottom_right_2">
              <Link to="/Support/BugReport">
                <img src={bottomRightImg2} />
              </Link>
            </div>
            <div className="mainNotice_innerBox_bottom_right_3">
              <Link to="/Support/BugReport">
                <img src={bottomRightImg3} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainNoticeComponent>
  );
};
export default MainNotice;

const MainNoticeComponent = styled.div`
  background-color: #eeeeee;

  @media only screen and (min-width: 1025px) {
    height: 554px;
    display: flex;
    justify-content: center;
  }

  @media only screen and (max-width: 1024px) {
    display: block;
  }

  .mainNotice_innerBox {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @media only screen and (min-width: 1025px) {
      margin-top: 70px;
      margin-bottom: 70px;
      width: 1200px;
    }

    @media only screen and (max-width: 1024px) {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    .mainNotice_innerBox_top {
      @media only screen and (min-width: 1024px) {
        display: flex;
        justify-content: space-between;
        padding-bottom: 30px;
      }
      @media only screen and (max-width: 1024px) {
        display: block;
        width: 100%;
      }

      .mainNotice_innerBox_top_left {
        max-width: 380px;
        width: 100%;
        height: 320px;

        @media only screen and (max-width: 1024px) {
          margin: 0 auto;
        }
        .mainNotice_innerBox_top_left_innerBox {
          img {
            max-width: 380px;
            width: 100%;
          }
        }

        .mainNoticeSlider-css {
          bottom: 10px;
          width: 100%;
          list-style: none;
          text-align: center;
          position: absolute;
          display: flex;
          padding: 0;
        }
        .mainNoticeSlider-css li {
          position: relative;
          display: inline-block;
          width: 30px;
          height: 15px;
          /*margin: 1px;*/
          padding: 0;
          cursor: pointer;
        }

        .mainNoticeSlider-css li button {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 30px;
          height: 15px;
          padding: 5px;
          cursor: pointer;
          color: transparent;
          border: 0;
          outline: 0;
          background: 0 0;
        }

        .mainNoticeSlider-css li button:before {
          font-size: 2.7rem;
          line-height: 20px;
          position: absolute;
          top: 0;
          left: 0;
          width: 25px;
          height: 20px;
          content: "•";
          text-align: center;
          background-image: url(${(props) => props.slideBtnOff});
          background-repeat: no-repeat;
        }

        .mainNoticeSlider-css li.slick-active button:before {
          background-image: url(${(props) => props.slideBtnOn});
          background-repeat: no-repeat;
        }
      }

      .mainNotice_innerBox_top_right {
        background-color: white;
        display: flex;
        padding: 30px;

        @media only screen and (min-width: 1025px) {
          width: 66%;
          height: 320px;
        }
        @media only screen and (max-width: 1024px) {
          width: 100%;
          padding-left: 20px;
          padding-right: 20px;
        }

        .mainNotice_innerBox_top_right_left {
          @media only screen and (min-width: 1025px) {
            width: 66%;
            padding-right: 30px;
            border-right: 1px solid gainsboro;
          }

          @media only screen and (max-width: 1024px) {
            width: 100%;
          }

          .mainNotice_innerBox_top_right_left_item {
            border-bottom: 1px solid gainsboro;

            @media only screen and (max-width: 1024px) {
              width: 100%;
            }
          }

          .mainNotice_innerBox_top_right_left_item:last-child {
            border: none;
          }

          .mainNotice_innerBox_top_right_left_item {
            display: flex;
            padding-top: 15px;
            padding-bottom: 15px;

            .mainNotice_innerBox_top_right_left_item_icon {
              background-color: rgb(93, 122, 203);
              color: white;
              width: 50px;
              height: 50px;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              border-radius: 50%;
              padding: 20px;
              white-space: nowrap;
              margin-right: 20px;
            }
            .mainNotice_innerBox_top_right_left_item_icon div {
              display: flex;
              justify-content: center;
            }
            .mainNotice_innerBox_top_right_left_item_text {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            .mainNotice_innerBox_top_right_left_item_text > a {
              color: #333;
            }
          }
        }
        .mainNotice_innerBox_top_right_right {
          @media only screen and (min-width: 1024px) {
            width: 33%;
            padding-left: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          @media only screen and (max-width: 1024px) {
            display: none;
          }
          img {
            width: 100%;
          }
        }
      }
    }
    .mainNotice_innerBox_bottom {
      width: 100%;

      @media only screen and (min-width: 1024px) {
        display: flex;
        justify-content: space-between;
      }

      @media only screen and (max-width: 1024px) {
        display: none;
      }
      .mainNotice_innerBox_bottom_left {
        @media only screen and (min-width: 1024px) {
          width: 33%;
        }
        a {
          width: 100%;

          img {
            width: 100%;
            height: 74px;
          }
        }
        height: 74px;
      }

      .mainNotice_innerBox_bottom_right {
        height: 74px;
        background-color: rgb(91, 91, 116);
        display: flex;
        padding: 30px;

        @media only screen and (min-width: 1024px) {
          width: 66%;
        }

        .mainNotice_innerBox_bottom_right_1,
        .mainNotice_innerBox_bottom_right_2,
        .mainNotice_innerBox_bottom_right_3 {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
`;
