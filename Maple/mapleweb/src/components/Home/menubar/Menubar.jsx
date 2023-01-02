import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import logo from "../Img/goldsaekki-logo2.png";
import { useMemo, useState } from "react";

const Menubar = () => {
  const [BGColor, setBGColor] = useState(false);
  const [headerScroll, setHeaderScroll] = useState(false);
  const changeColorOn = () => {
    setBGColor(true);
  };
  const changeColorOff = () => {
    setBGColor(false);
  };

  const menu = ["뉴스", "랭킹", "커뮤니티", "고객지원"];

  const dropDownMenu = [
    ["공지사항", "업데이트", "이벤트", "캐시샵 공지", "메이플 알림판"],
    ["종합 랭킹", "게시판 랭킹", "댓글 랭킹"],
    [
      "자유게시판",
      "정보게시판",
      "토론게시판",
      "연재소설",
      "금쪽이아트",
      "이벤트게시판",
    ],
    ["도움말/1:1문의", "버그악용/불법프로그램 신고"],
  ];

  const routeAddress = [
    "Error",
    "Ranking",
    "Community/Free",
    "Support/Service",
  ];

  const routeAddressSubGroup = [
    ["/Error", "/Error", "/Error", "/Error", "/Error"],
    ["/Ranking", "/Ranking/BoardRanking", "/Ranking/CommentRanking"],
    [
      "/Community/Free",
      "/Community/Information",
      "/Community/TopicDiscussion",
      "/Community/Novel",
      "/Community/Art",
      "/Community/Event",
    ],
    ["/Support/Service", "/Support/BugReport"],
  ];

  window.onscroll = () => {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
      setHeaderScroll(true);
    } else {
      setHeaderScroll(false);
    }
  };

  const menuVersion2 = useMemo(() => {
    return menu.map((item, index) => {
      return (
        <li className="menubar_item_outsideLi" key={`outsideLi${index}`}>
          <Link to={`/${routeAddress[index]}`}>
            <span className="menubar_item_outsideLi_text">{item}</span>
          </Link>
          <ul className="menubar_dropdown">
            {dropDownMenu.map((item2, index2) => {
              return (
                <li key={`dropdown_${index}_${index2}`}>
                  <Link to={routeAddressSubGroup[index][index2]}>
                    {dropDownMenu[index][index2]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  }, []);

  const location = useLocation();
  return (
    <MenubarComponent
      className={`${BGColor ? "menubar_bgOn" : "menubar_bgOff"} ${
        headerScroll ? "headerScroll_on" : "headerScroll_off"
      }`}
    >
      <div className="menubar_innerBox">
        {location.pathname == "/login" || location.pathname == "/regist" ? (
          <></>
        ) : (
          <div className="menubar_logobox">
            <Link to={"/"}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
        )}

        <ul
          className={BGColor ? "menubar_item on" : "menubar_item off"}
          onMouseOver={() => {
            changeColorOn();
          }}
          onMouseLeave={() => {
            changeColorOff();
          }}
        >
          {menuVersion2}
        </ul>
      </div>
    </MenubarComponent>
  );
};
export default Menubar;

const MenubarComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 999999;
  padding-top: 20px;
  position: absolute;

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  &.headerScroll_on {
    position: fixed;
    background-color: rgb(47, 47, 59);
    height: 64px;
    top: 0;
    width: 100%;

    .menubar_logobox {
      top: -12px;
    }

    .menubar_logobox img {
      width: 50px;
      border-radius: 50%;
    }
  }

  &.headerScroll_off {
    position: absolute;

    .menubar_logobox img {
      width: 110px;
      border-radius: 50%;
    }

    .menubar_item {
      padding-top: 20px;
    }
  }

  &.headerScroll_off .menubar_item.on {
    transform: translateY(-10px);
    transition: transform 0.2s linear;
  }

  &.headerScroll_off .menubar_item.off {
    transform: translateY(10px);
    transition: transform 0.2s linear;
  }

  &.menubar_bgOn {
    background-color: rgb(43, 43, 55);
    transition: background-color 0.2s linear;
    z-index: 999999;
    height: 310px;
  }

  &.menubar_bgOff {
    transition: background-color 0.2s linear;
    z-index: 100000;
  }

  .menubar_innerBox {
    width: 1200px;
    height: 100%;
    display: flex;
    position: relative;

    @media only screen and (max-width: 550px) {
      ul {
        padding-left: 0px;
      }
    }
  }

  .menubar_logobox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    @media only screen and (min-width: 1024px) {
      width: 11%;
    }
    @media only screen and (max-width: 1024px) {
      display: none;
    }
  }

  .menubar_item {
    position: absolute;
    right: 0px;
    flex: 1;
    display: flex;
    justify-content: space-between;

    @media only screen and (min-width: 1024px) {
      width: 89%;
    }
    @media only screen and (max-width: 1024px) {
      width: 100%;
    }
  }

  .menubar_item:hover .menubar_dropdown {
    display: block;
  }

  .menubar_item:hover .menubar {
    background-color: rgb(43, 43, 55);
  }

  .menubar_item_outsideLi {
    @media only screen and (min-width: 1024px) {
      width: 25%;
      position: relative;
      text-align: center;
    }
    @media only screen and (max-width: 1024px) {
      width: 25%;
      text-align: center;
    }
  }

  .menubar_item_outsideLi_text:hover {
    color: #f68500;
  }

  .menubar_item_outsideLi_text {
    font-size: 22px;
    color: white;
    font-weight: bold;

    @media only screen and (max-width: 420px) {
      font-size: 18px;
    }
    @media only screen and (max-width: 350px) {
      font-size: 16px;
    }
  }

  .menubar_dropdown {
    display: none;
    position: absolute;
    font-size: 13px;

    padding-inline-start: 0px;
    padding-top: 20px;

    @media only screen and (min-width: 1024px) {
      width: 100%;
    }
    @media only screen and (max-width: 1024px) {
      width: 25%;
    }
  }

  .menubar_dropdown li {
    text-align: center;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .menubar_dropdown li a {
    width: 100%;
    color: #a7acbc;
  }
  .menubar_dropdown li a:hover {
    color: #f68500;
  }
`;
