import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NotFound from "../../../NotFound";

const Footer = () => {
  const [familySite, setFamilySite] = useState("false");
  const toggleFamilySite = () => {
    setFamilySite((state) => !state);
  };
  return (
    <FooterComponent>
      <div className="footer_innerBox">
        <div>
          <ul>
            <li>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                회사소개
              </Link>
            </li>
            <li>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                채용안내
              </Link>
            </li>
            <li>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                이용약관
              </Link>
            </li>
            <li>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                게임이용등급안내
              </Link>
            </li>
            <li>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                <span className="footer_privacyPolicy">개인정보처리방침</span>
              </Link>
            </li>
            <li>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                청소년보호정책
              </Link>
            </li>
            <li>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                운영정책
              </Link>
            </li>
            <li>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                넥슨PC방
              </Link>
            </li>
            <li>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                사이트맵
              </Link>
            </li>
          </ul>
          <div className="footer_normalText">
            <span>
              (주)넥슨코리아 대표이사 이정헌 경기도 성남시 분당구판교로 256번길
              7 전화: 1588-7701 팩스:0502-258-8322
              <br /> E-mail:contact-us@nexon.co.kr 사업자등록번호 :
              220-87-17483호 통신판매업 신고번호 : 제2013-경기성남-1659호
              사업자정보확인 <br />ⓒ
            </span>
            <span>NEXON Korea Corporation All Rights Reserved.</span>
          </div>
        </div>
        <div className="footer_familySite">
          <div
            className="footer_familySite_title"
            onClick={() => {
              toggleFamilySite();
            }}
          >
            Family Site
          </div>
          <div
            className={`footer_familySite_items ${familySite ? "off" : "on"}`}
          >
            <div className="footer_familySite_item_1">
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                <span>Global</span>
              </Link>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                <span>Japan</span>
              </Link>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                <span>China</span>
              </Link>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                <span>Taiwan</span>
              </Link>
            </div>
            <div className="footer_familySite_item_2">
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                <span>S.E.A</span>
              </Link>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                <span>North America</span>
              </Link>
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                <span>Thailand</span>
              </Link>
            </div>
            <div className="footer_familySite_item_3">
              <Link
                to="/Error"
                element={<NotFound />}
                rel="noopener noreferrer"
                target="_blink"
              >
                <span>Maple Tester</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FooterComponent>
  );
};

export default Footer;

const FooterComponent = styled.div`
  @media only screen and (min-width: 1024px) {
    display: flex;
    justify-content: center;
    background-color: #2f3238;
    width: 100%;
    height: 220px;
    position: absolute;
    bottom: 0;
    left: 0;

    .footer_innerBox {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      margin-bottom: 30px;
      @media only screen and (min-width: 1024px) {
        width: 1200px;
      }
      @media only screen and (max-width: 1024px) {
        width: 100%;
      }
      @media only screen and (max-width: 1250px) {
        padding-left: 20px;
        padding-right: 20px;
      }
      ul {
        display: flex;
        padding-inline-start: 0px;

        li {
          list-style: none;
          font-size: 12px;

          a {
            color: #b1b3b9;
          }
          a:hover {
            text-decoration: underline;
          }
        }

        li:before {
          content: "";
          display: inline-block;
          background-color: #b1b3b9;
          width: 1px;
          height: 12px;
          margin-left: 10px;
          margin-right: 10px;
        }

        li:first-child:before {
          content: initial;
        }
      }
    }

    .footer_privacyPolicy {
      font-weight: bold;
      color: white;
    }
    .footer_normalText {
      color: #b1b3b9;
      font-size: 11px;
      line-height: px;
    }
    .footer_normalText span:last-child {
      color: #888888;
    }

    .footer_familySite {
      border: 1px solid #474a51;
      width: 240px;
      color: #b1b3b9;
      height: max-content;
      position: relative;
    }

    .footer_familySite_title {
      background-color: #34373d;
      width: 100%;
      text-align: center;
      font-size: 13px;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .footer_familySite_items {
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
      border: 1px solid #474a51;
      position: absolute;
      display: none;

      & > div {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      & span {
        padding-left: 5px;
        padding-right: 5px;
        font-size: 12px;
        color: #b1b3b9;
      }

      & span:hover {
        color: #f68500;
      }

      &.off {
        overflow: auto;
        transition: 5s;
        animation: fadeOutUp 1s;
      }

      &.on {
        display: block;
        overflow: auto;
        transition: 5s;
        position: relative;
        animation: fadeInDown 1s;
      }
    }

    .footer_familySite_item_2,
    .footer_familySite_item_3 {
      border-top: 1px solid #474a51;
    }

    @keyframes fadeInDown {
      0% {
        opacity: 0;
        transform: translate3d(0, -10%, 0);
      }
      to {
        opacity: 1;
        transform: translateZ(0);
      }
    }

    @keyframes fadeOutUp {
      0% {
        opacity: 1;
        transform: translate3d(0, 10%, 0);
      }
      to {
        opacity: 0;
        transform: translateZ(0);
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
    background-color: #2f3238;
    width: 100%;
    height: 220px;
    position: absolute;
    bottom: 0;
    left: 0;

    .footer_innerBox {
      width: 1200px;
      position: relative;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      margin-bottom: 30px;

      ul {
        display: flex;
        justify-content: center;
        padding-inline-start: 0px;

        li {
          font-size: 12px;
          list-style: none;

          a {
            color: #b1b3b9;
          }

          a:hover {
            text-decoration: underline;
          }
        }

        li:nth-child(1),
        li:nth-child(2),
        li:nth-child(4),
        li:nth-child(6),
        li:nth-child(7),
        li:nth-child(8),
        li:nth-child(9) {
          display: none;
        }

        li:first-child::before {
          content: initial;
        }

        li:nth-child(n + 4)::before {
          content: "";
          display: inline-block;
          background-color: #b1b3b9;
          width: 1px;
          height: 12px;
          margin-left: 10px;
          margin-right: 10px;
        }
      }
    }

    .footer_privacyPolicy {
      font-weight: bold;
      color: white;
    }
    .footer_normalText {
      color: #b1b3b9;
      font-size: 11px;
      line-height: px;

      span:first-child {
        display: none;
      }
      span:last-child {
        color: #888888;
      }
    }

    .footer_familySite {
      display: none;
    }
  }
`;
