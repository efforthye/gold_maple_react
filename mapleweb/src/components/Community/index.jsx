import styled from "styled-components";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from "react-redux";
import { action } from "../../modules/header";
import { action as communityAction } from "../../modules/community";
import { action as searchAction } from "../../modules/search";

import NavigationComponent from "./Navigation/Component";
import ListContainer from "./Board/List/Container";

import TagBackImg from "./images/issueTag.png";

import one from "./images/1.png";
import two from "./images/2.png";
import three from "./images/3.png";
import four from "./images/4.png";
import happiness from "./images/happiness.png";
import AddContainer from "./Board/Add/Container";
import { useEffect, useState } from "react";

import { CATEGORY } from "../../modules/community";
import DetailContainer from "./Board/Detail/Container";
import EditContainer from "./Board/Edit/Container";
import NotFound from "./NotFound";
import axios from "axios";

const CommunityComponet = ({}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.header("Community"));

    axios.post("/api/board/getLikeSevenBoards", {}).then((boards) => {
      const boardsData = boards.data;
      let likeTagBoards = [];
      boardsData.map((board, index) => {
        if (board.tags != "") {
          likeTagBoards.push(board);
        }
      });
      dispatch(communityAction.tags(likeTagBoards));
    });
  }, []);

  const settings = {
    dots: true, 
    infinite: true, 
    speed: 1000, 
    autoplay: true, 

    autoplaySpeed: 4000, 
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const boardTags = useSelector((state) => state?.community?.tags);

  const [searchType, setSearchType] = useState("태그");
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();
  const navigateToSearch = async (
    searchType,
    searchData,
    navigate,
    dispatch
  ) => {
    dispatch(searchAction.search(searchType, searchData));
    navigate("/Search", {
      state: {
        searchType: searchType,
        searchData: searchData,
      },
    });
  };

  return (
    <CommunityBox className="communityBox">
      <NavigationComponent categorys={CATEGORY} />

      <AllWrap className="allWrap">
        <AllBox className="allBox">
          <ContentBox className="contentBox">

            <Routes>
              <Route path="/:category" element={<ListContainer />}></Route>

              <Route
                path="/:category/BoardAdd"
                element={<AddContainer />}
              ></Route>

              <Route
                path="/board/:boardId"
                element={<DetailContainer />}
              ></Route>

              <Route
                path="/board/:boardId/edit"
                element={<EditContainer />}
              ></Route>
            </Routes>
          </ContentBox>

          <NewsBox className="newsBox">
            <NewsContentWrap className="newsContentWrap">
              <NewsTitle className="newsTitle">
                <NewsH2 className="newsH2">뉴스</NewsH2>
                <NewsMoreSpan className="newsMoreSpan">+</NewsMoreSpan>
              </NewsTitle>
              <NewsContent className="newsContent">
                <NewsItem className="newsItem">
                  <NewsItemTitle className="newsItemTitle">
                    공지
                  </NewsItemTitle>{" "}
                  <Link to="/Error" element={<NotFound />}>
                    버그악용/불법프로그램 신고 보상 지급 안내
                  </Link>
                </NewsItem>
                <NewsItem className="newsItem">
                  <NewsItemTitle className="newsItemTitle">
                    공지
                  </NewsItemTitle>{" "}
                  <Link to="/Error" element={<NotFound />}>
                    12/9(금) 운영정책위반 단속결과
                  </Link>
                </NewsItem>
                <NewsItem className="newsItem">
                  <NewsItemTitle className="newsItemTitle">
                    공지
                  </NewsItemTitle>{" "}
                  <Link to="/Error" element={<NotFound />}>
                    넥슨플레이 "게임 접속 이벤트" 진행 안내
                  </Link>
                </NewsItem>
                <NewsItem className="newsItem">
                  <NewsItemTitle className="newsItemTitle">
                    공지
                  </NewsItemTitle>{" "}
                  <Link to="/Error" element={<NotFound />}>
                    12월 지속 가능한 보안캠페인 진행 안내
                  </Link>
                </NewsItem>
              </NewsContent>
            </NewsContentWrap>

            <BannerBox>
              <BannerImgBox>
                <StyledSlide {...settings}>
                  <div>
                    <Link to="/Error" element={<NotFound />}>
                      <BannerImg
                        src={one}
                        alt="현생 용사를 위한 겨울 버전 메꾸 패키지"
                      />
                    </Link>
                    <BannerText>
                      현생 용사를 위한 겨울 버전 메꾸 패키지
                    </BannerText>
                  </div>
                  <div>
                    <Link to="/Error" element={<NotFound />}>
                      <BannerImg src={two} alt="썬데이 메이플" />
                    </Link>
                    <BannerText>썬데이 메이플</BannerText>
                  </div>
                  <div>
                    <Link to="/Error" element={<NotFound />}>
                      <BannerImg src={three} alt="돌의 정령을 키워달람!" />
                    </Link>
                    <BannerText>돌의 정령을 키워달람!</BannerText>
                  </div>
                  <div>
                    <Link to="/Error" element={<NotFound />}>
                      <BannerImg src={four} alt="페어리 브로의 황금마차" />
                    </Link>
                    <BannerText>페어리 브로의 황금마차</BannerText>
                  </div>
                </StyledSlide>
              </BannerImgBox>
            </BannerBox>

            <TagSearchBox>
              <TagContentBox>
                <TagInputWrap>
                  <TagInput
                    type={"text"}
                    onInput={(e) => {
                      setSearchData(e.target.value);
                    }}
                    onKeyUp={() => {
                      if (window.event.keyCode == 13) {
                        if (searchData.match(/\S/g)) {
                          navigateToSearch(
                            searchType,
                            searchData,
                            navigate,
                            dispatch
                          );
                          return;
                        } else {
                          alert("검색어를 입력하세요");
                        }
                      }
                    }}
                  />
                  <TagSerachBtnSpan>
                  </TagSerachBtnSpan>
                </TagInputWrap>
                <TagListBox>
                  {boardTags?.map((board, idx) => {
                    return (
                      <div key={`tagDiv-${idx}`}>
                        <Link
                          to={`/Community/board/${board.id}`}
                          key={`tagLink-${idx}`}
                        >
                          <IssueTag key={`issueTag-${idx}`}>
                            {board.tags.split("#").length == 1
                              ? "#" + board.tags
                              : "#" + board.tags.split("#")[1]}
                          </IssueTag>
                        </Link>
                      </div>
                    );
                  })}
                </TagListBox>
              </TagContentBox>
            </TagSearchBox>

            <HeartIcon
              onClick={(e) => {
                e.target.classList.toggle("is-active");
              }}
            ></HeartIcon>
            <HeartIcon
              style={{ marginLeft: "30px" }}
              onClick={(e) => {
                e.target.classList.toggle("is-active");
              }}
            ></HeartIcon>
            <SmileImg src={happiness} alt="웃음"></SmileImg>
          </NewsBox>
        </AllBox>
      </AllWrap>
    </CommunityBox>
  );
};
export default CommunityComponet;

const CommunityBox = styled.div`
  *::selection {
    background-color: #ffebf6cc;
  }
`;

const AllWrap = styled.div`
  margin-bottom: 100px;
  width: 100%;
  border-top: 1px solid #ebebeb;
`;

const AllBox = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 1200px;
  min-height: inherit;

  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1280px) {
    margin: 0 auto;
    width: 1050px;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 780px;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 720px;
  }
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 500px;
  }
  @media all and (max-width: 479px) {
    width: 300px;
  }
`;

const ContentBox = styled.div`
  min-height: inherit;
  display: inline-block;
  width: 930px;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin: 0 55px;
    margin: 0 auto;
  }
`;

const NewsBox = styled.div`
  min-height: inherit;
  display: inline-block;
  width: 230px;

  @media screen and (max-width: 1280px) {
    margin-right: 55px;
    margin-left: 40px;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    display: none;
  }
  @media all and (min-width: 480px) and (max-width: 767px) {
    display: none;
  }
  @media all and (max-width: 479px) {
    display: none;
  }
`;

const NewsContentWrap = styled.div`
  width: 100%;
  float: left;
  margin-top: 60px;
  border-top: 2px solid #343536;
  background-color: white;
  padding: 0 5px;
  box-sizing: border-box;
`;
const NewsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;
const NewsH2 = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-top: 17px;
  float: left;
  cursor: default;
`;
const NewsMoreSpan = styled.div`
  float: right;
  margin-right: 5px;
  cursor: pointer;
  padding: 20px 0;
  font-size: 28px;
  color: gray;
  font-weight: 300;
`;

const NewsContent = styled.div`
  padding-bottom: 20px;
`;
const NewsItem = styled.div`
  color: #333;
  font-size: 13px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  & > a {
    color: #333;
  }
`;
const NewsItemTitle = styled.span`
  color: #ca5196;
`;

const BannerBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 192px;

  float: left;
  border: 1px solid #e3e3e3;
  background-color: white;
`;
const BannerImgBox = styled.div`
  display: flex;
`;
const BannerImg = styled.img`
  z-index: -1;
  width: 100%;
  height: 120px;
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  flex: none;
  object-fit: contain;
  cursor: pointer;
`;
const BannerText = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
`;
const StyledSlide = styled(Slider)`
  width: 230px;
  min-height: 120px;

  .slick-list {
    width: 230px;
    min-height: 120px;

    position: relative;
    display: block;
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  .slick-dots {
    width: 120px;
    margin-left: 54px;
    position: absolute;
    top: 152px;
    &.slick-active {
    }
    & li button:before {
      color: #ca5196;
    }
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 20px;
    font-weight: 500;
    line-height: 1;
    opacity: 0.8;
    color: #e6c6d5;
    -webkit-font-smoothing: antialiased;
  }
  .slick-prev:before {
    content: "<";
    position: absolute;
    left: 60px;
    top: 91px;
  }
  .slick-next:before {
    content: ">";
    position: absolute;
    right: 60px;
    top: 91px;
  }
`;

const TagSearchBox = styled.div`
  float: left;
  margin-top: 30px;
  background: url(${TagBackImg}) left top no-repeat;
  background-color: aliceblue;
  height: 229px;
  width: 100%;
`;
const TagContentBox = styled.div`
  width: 190px;
  margin: 0 auto;
  height: 100%;
`;
const TagInputWrap = styled.div`
  width: 100%;
  float: left;
  position: relative;
  margin-top: 48px;
`;
const TagInput = styled.input`
  width: 100%;
  float: left;
  height: 38px;
  border-radius: 3px;
  border: 1px solid #ca5196;
  padding-left: 30px;
  line-height: 38px;
  background: url("https://cdn.imweb.me/upload/S2020090710444c43a5dc5/59a4716f5c1b6.png")
    #ca5196 8px center no-repeat;
  padding-right: 30px;
  font-size: 12px;
  color: #fff;
`;
const TagSerachBtnSpan = styled.span`
  position: absolute;
  right: 12px;
  top: 5px;
  & > a {
    text-decoration: none;
  }
`;

const TagListBox = styled.div`
  width: 100%;
  float: left;
  margin-top: 10px;
  height: 120px;
  overflow: hidden;
  list-style: none;
`;
const IssueTag = styled.span`
  float: left;
  padding: 0 9px;
  height: 25px;
  line-height: 25px;
  color: #f9f5f7;
  font-size: 12px;
  border-radius: 3px;
  background-color: #f1b4d1;
  margin-right: 6px;
  margin-bottom: 6px;
  cursor: pointer;

  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;

  & > a {
    color: white;
    width: 100%;
    height: 100%;
    float: left;
  }
  &:hover {
    background-color: #ca5196;
    color: #edf1f3;
    border: none;
  }
`;

const HeartIcon = styled.div`
  background-color: #ff00003d;
  width: 100px;
  height: 100px;
  background: url("https://cssanimation.rocks/images/posts/steps/heart.png")
    no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;
  display: inline-block;

  &.is-active {
    transition-duration: 1s;
    background-position: -2800px 0;
  }
`;

const SmileImg = styled.img`
  width: 130px;
  height: 50px;
  margin-left: 50px;

  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;
