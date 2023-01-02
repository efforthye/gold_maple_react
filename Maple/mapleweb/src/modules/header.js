import headerBanner1 from "../components/Home/Img/header_banner/header_banner_news.png";
import headerBanner2 from "../components/Home/Img/header_banner/header_banner_guide.png";
import headerBanner3 from "../components/Home/Img/header_banner/header_banner_ranking.png";
import headerBanner4 from "../components/Home/Img/header_banner/header_banner_community.png";
import headerBanner5 from "../components/Home/Img/header_banner/header_banner_media.png";
import headerBanner6 from "../components/Home/Img/header_banner/header_banner_support.png";
import headerBanner7 from "../components/Home/Img/header_banner/header_banner_support.png";
import headerBanner8 from "../components/Home/Img/header_banner/header_banner_news.png";
import headerBanner9 from "../components/Home/Img/header_banner/header_banner_search.png";
import headerBanner10 from "../components/Home/Img/header_banner/header_banner_media.png";

import headericon1 from "../components/Home/Img/header_banner/header_icon_news.png";
import headericon2 from "../components/Home/Img/header_banner/header_icon_guide.png";
import headericon3 from "../components/Home/Img/header_banner/header_icon_ranking.png";
import headericon4 from "../components/Home/Img/header_banner/header_icon_community.png";
import headericon5 from "../components/Home/Img/header_banner/header_icon_media.png";
import headericon6 from "../components/Home/Img/header_banner/header_icon_support.png";
import headericon7 from "../components/Home/Img/header_banner/header_icon_support.png";
import headericon8 from "../components/Home/Img/header_banner/header_icon_support.png";
import headericon9 from "../components/Home/Img/header_banner/header_icon_search.png";
import headericon10 from "../components/Home/Img/header_banner/header_icon_news.png";
const TYPE = {
  HEADER: "/header",
};

const header = (category) => {
  return {
    type: TYPE.HEADER,
    payload: { category },
  };
};

export const action = { header };

export const initialize = "";

export const reducer = (state = initialize, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.HEADER:
      switch (payload.category) {
        case "News":
          return { banner: headerBanner1, icon: headericon1, text: "뉴스" };
        case "Guide":
          return { banner: headerBanner2, icon: headericon2, text: "가이드" };
        case "Ranking":
          return { banner: headerBanner3, icon: headericon3, text: "랭킹" };
        case "Community":
          return { banner: headerBanner4, icon: headericon4, text: "커뮤니티" };
        case "Media":
          return { banner: headerBanner5, icon: headericon5, text: "미디어" };
        case "Support":
          return { banner: headerBanner6, icon: headericon6, text: "고객지원" };
        case "Administrator":
          return { banner: headerBanner7, icon: headericon7, text: "관리자" };
        case "Mypage":
          return {
            banner: headerBanner8,
            icon: headericon8,
            text: "마이 금쪽이",
          };
        case "Search":
          return { banner: headerBanner9, icon: headericon9, text: "검색" };
        case "Error":
          return { banner: headerBanner10, icon: headericon10, text: "ERROR!" };
        default:
          return state;
      }
    default:
      return state;
  }
};
