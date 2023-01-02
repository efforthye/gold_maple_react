import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import Pagination from "react-js-pagination";

import { action, CATEGORY, WORLDLIST } from "../../../../modules/community";
import eyeImg from "../../images/info_eye_new.png";
import heartImg from "../../images/info_heart2_new.png";
import dateImg from "../../images/info_sub_date_new.png";
import searchImg from "../../images/search.png";


const ListComponent = () => {

  const dispatch = useDispatch();

  const location = useLocation();
  const nowParam = useParams(location).category;

  const [category, setCategory] = useState(CATEGORY.find(item => item.label == nowParam));

  const [nowPage, setNowPage] = useState(1);
  const handlePageChange = (page) => {
    setNowPage(page);
  };

  const userName = useSelector((state) => state.user.currUserName);

  const allWorldRef = useRef();
  const noRef = useRef();
  const [nowWorld, setNowWorld] = useState("전체월드");

  useEffect(() => {
    setCategory(CATEGORY.find(item => item.label == nowParam));

    window.scrollTo({ left: 0, top: 270, behavior: "smooth" });

    const active2 = document.querySelectorAll(".active2");
    for (let i = 0; i < active2.length; i++) {
      active2[i].classList.remove("active2");
    }
    allWorldRef.current.classList.add("active2");

  }, [nowParam]);


  let boards = useSelector((state) => state.community.list);

  useEffect(() => {

    if (nowWorld == "전체월드") {

      axios.post("/api/board/getList", {
        category: category.name,
      }).then((boards) => {
        if (boards.data.name == "SequelizeDatabaseError") {
          return;
        }

        axios.post("/api/board/getLikeSevenBoards", {
        }).then((boards) => {
          const boardsData = boards.data;
          let likeTagBoards = [];
          boardsData.map((board, index) => {
            if (board.tags != "") {
              likeTagBoards.push(board);
            }
          });
          dispatch(action.tags(likeTagBoards));
        });

        dispatch(action.list(boards.data));
      });

      return;
    } else {

      axios.post("/api/board/getWorldList", {
        category: category.name,
        world: nowWorld,
      }).then((boards) => {
        if (boards.data.name == "SequelizeDatabaseError") {
          return;
        }
        dispatch(action.list(boards.data));

        axios.post("/api/board/getLikeSevenBoards", {
        }).then((boards) => {
          const boardsData = boards.data;
          let likeTagBoards = [];
          boardsData.map((board, index) => {
            if (board.tags != "") {
              likeTagBoards.push(board);
            }
          });
          dispatch(action.tags(likeTagBoards));
        });

      });

    }
  }, [nowWorld]);

  let newBoards = [];
  if (boards) {
    boards.map((item, idx) => {
      if (idx >= (nowPage - 1) * 10 && idx < (nowPage) * 10) {
        newBoards.push(item);
      }
    });
  }
  let commentCounts = [];

  useEffect(() => {
    setNowPage(1);

    axios.post("/api/board/getList", {
      category: category.name,
    }).then((boards) => {
      if (boards.data.name == "SequelizeDatabaseError") {
        return;
      }
      dispatch(action.list(boards.data));


      axios.post("/api/board/getLikeSevenBoards", {
      }).then((boards) => {
        const boardsData = boards.data;
        let likeTagBoards = [];
        boardsData.map((board, index) => {
          if (board.tags != "") {
            likeTagBoards.push(board);
          }
        });
        dispatch(action.tags(likeTagBoards));
      });

    }).catch((err) => {
      console.log(err);
    }).finally(() => {
    });


  }, [category, dispatch]);


  useEffect(() => {
    newBoards.map(async (item, idx) => {

      await axios.post("/api/comment/count", {
        boardId: item.id,
      }).then((item) => {
        commentCounts.push(item.data.number);
        dispatch(action.commentCounts(commentCounts));
      });

    });
  }, [category, dispatch]);
  useEffect(() => {
    window.scrollTo({ left: 0, top: 270, behavior: "smooth" });
  }, [nowPage]);



  return (
    <AllWrap>
      <CategoryTitle>{category?.name}</CategoryTitle>
      <ContentBox>
        <WorldBox>
          {WORLDLIST.map((item, idx) => {
            return (
              <WorldSpan key={`world-${idx}`} className={`${idx == 0 ? "active2" : ""}`} ref={idx === 0 ? allWorldRef : noRef} onClick={(e) => {
                const active2 = document.querySelectorAll(".active2");
                for (let i = 0; i < active2.length; i++) {
                  active2[i].classList.remove("active2");
                }
                e.target.classList.add("active2");
                setNowWorld(item.name);
              }}>
                <WorldImg
                  key={`worldImg-${idx}`}
                  src={item.img}
                  alt={"월드 이미지"}
                />{" "}
                <WorldNameSpan key={`worldName-${idx}`}>
                  {item.name}
                </WorldNameSpan>
              </WorldSpan>
            );
          })}
        </WorldBox>

        <ListBox>
          {newBoards?.length ? "" : <OneBoardList style={{ fontSize: "13px", color: "#666" }}>
            <div style={{ display: "flex", alignItems: "center" }}><img src={searchImg} alt={"게시글 없음 표시"} />{" "} <span style={{ marginLeft: "10px", color: "#8b8b8b" }}>해당 게시글 목록이 존재하지 않습니다.</span></div>
          </OneBoardList>}
          {newBoards &&
            newBoards?.map((board, idx) => {
              return (
                <Link
                  key={`boardIdLink-${idx}`}
                  to={`/Community/board/${board?.id}`}
                >
                  <OneBoardList key={`oneBoard-${idx}`}>
                    <BoardTitle key={`boardTitle-${idx}`}>
                      <span key={`boardWorld-${idx}`} className="server">
                        [{board?.world}]
                      </span>{" "}
                      <span key={`boardTitleName-${idx}`} className="title">
                        {board?.title}
                      </span>{" "}
                      {board.commentCount == 0 ? "" : <CommentCount>({board.commentCount})</CommentCount>}
                    </BoardTitle>
                    <OtherBoardInfo>
                      {WORLDLIST.map((world, idx) => {
                        if (world.name == board?.userWorld) {
                          return (
                            <UserName key={`userName-${idx}`}>
                              <UserWorldImg
                                key={`userWorldImg-${idx}`}
                                src={`${world.img}`}
                                style={{ marginRight: "1px" }}
                              />{" "}
                              {board?.userName}
                            </UserName>
                          );
                        } else {
                          return;
                        }
                      })}

                      <IconInfoWrap key={`iconInfoWrap-${idx}`}>
                        <IconInfo key={`likeCount-${idx}`} className="heart">
                          {board?.likeCount}
                        </IconInfo>
                        <IconInfo key={`createDate-${idx}`} className="date">

                          {
                            moment().toDate().toLocaleString().substr(0, 13) !==
                              moment(board?.createdAt, "YYYY-MM-DDTHH:mm:ssZ")
                                .toDate()
                                .toLocaleString()
                                .substr(0, 13)
                              ?
                              `${moment(
                                board?.createdAt,
                                "YYYY-MM-DDTHH:mm:ssZ"
                              )
                                .toDate()
                                .toLocaleString()
                                .substring(0, moment(board?.createdAt, "YYYY-MM-DDTHH:mm:ssZ").toDate().toLocaleString().indexOf("오"))
                              }`
                              : `${moment(
                                board?.createdAt,
                                "YYYY-MM-DDTHH:mm:ssZ"
                              )
                                .toDate()
                                .toLocaleString()
                                .substring(moment(board?.createdAt, "YYYY-MM-DDTHH:mm:ssZ").toDate().toLocaleString().indexOf("오"))
                                .substr(0, moment(board?.createdAt, "YYYY-MM-DDTHH:mm:ssZ").toDate().toLocaleString().substring(moment(board?.createdAt, "YYYY-MM-DDTHH:mm:ssZ").toDate().toLocaleString().indexOf("오")).lastIndexOf(":"))
                              }`
                          }
                        </IconInfo>
                        <IconInfo key={`eyeCount-${idx}`} className="eyeCount">
                          {board?.eyeCount}
                        </IconInfo>
                      </IconInfoWrap>
                    </OtherBoardInfo>
                  </OneBoardList>
                </Link>
              );
            })}
        </ListBox>

        <ButtonBox>
          <div></div>


          {userName ? (
            <Link to={`/Community/${category.label}/BoardAdd`}>
              <RegistBtn
                onClick={(e) => {
                }}
              >
                글작성
              </RegistBtn>
            </Link>
          ) : (
            <>
              <Link to={`/login`}>
                <RegistBtn
                  onClick={(e) => {
                    alert("로그인이 필요합니다.");
                    return;
                  }}
                >
                  글작성
                </RegistBtn>
              </Link>
            </>
          )}
        </ButtonBox>

        <PagenationWrap>
          <Pagination
            activePage={nowPage}
            itemsCountPerPage={10}
            totalItemsCount={boards?.length || 0}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </PagenationWrap>

      </ContentBox>
    </AllWrap>
  );
};

export default ListComponent;

const AllWrap = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  
    -webkit-touch-callout: none;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
  ul {
      list-style: none;
      padding: 0;
      cursor: pointer;
  }
  ul.pagination li {
      display: inline-block;
      width: 35px;
      height: 35px;
      border: 1px solid #e2e2e2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
  }
  ul.pagination li:first-child {
      border-radius: 3px 0 0 3px;
  }
  ul.pagination li:last-child {
      border-radius: 0 3px 3px 0;
  }
  ul.pagination li a {
      text-decoration: none;
      color: #DC7EB3;
      font-size: 1rem;
  }

  ul.pagination li.active a {
      color: white;
  }

  ul.pagination li.active {
      background-color: #DC7EB3;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
      color: #CA5196;
  }
  .page-selection {
      width: 48px;
      height: 30px;
      color: #DC7EB3;
  }
`;
const CategoryTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin-top: 20px;
  font-weight: 600;
  width: 100%;
  height: 100px;
  line-height: 100px;
  cursor: default;
  margin-bottom: 20px;

  @media all and (max-width:479px) {
    font-size: 22px;
    margin-bottom: 0px;
  }

`;

const ContentBox = styled.div`
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  float: left;
  & > div {
    float: left;
  }
`;

const WorldBox = styled.div`
  width: 100%;
  min-height: 130px;
  border: 1px solid #e9eaee;
  background-color: #fbf9fa;
  margin-bottom: 30px;
  padding: 26px 0 20px 26px;

  @media all and (min-width: 480px) and (max-width: 767px) {
    display: none;
  }
  @media all and (max-width:479px) {
    display: none;
  }
`;
const WorldSpan = styled.span`
  float: left;
  width: 90px;
  height: 34px;
  border: 1px solid #ffebf6cc;
  background-color: #ffebf6cc;
  border-radius: 3px;
  margin-right: 6px;
  margin-bottom: 6px;
  line-height: 34px;
  text-align: left;
  color: #666;
  font-size: 13px;
  position: relative;
  cursor: pointer;
  padding-left: 8px;
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  
  *{
    pointer-events: none;
  }
  
  &.active2,
  &:hover {
    transition: all 0.2s;
    background-color: #ca5196;
    border: 1px solid #ca5196;
    color: #f3f1f1;
  }
`;
const WorldImg = styled.img`
  position: absolute;
  top: 10px;
  
`;
const WorldNameSpan = styled.span`
  position: absolute;
  left: 27px;
  height: 0;
`;

const ListBox = styled.div`
  float: left;
  width: 100%;
  border-top: 1px solid #c8c8d5;
`;
const OneBoardList = styled.div`
  position: relative;
  float: left;
  padding-left: 27px;
  padding-right: 20px;
  min-height: 68px;
  border-bottom: 1px solid #e3e3e3;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  @media all and (min-width:480px) and (max-width:767px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 12px 10px 27px;
  } 
  @media all and (max-width:479px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 12px 10px 27px;
  }

`;
const BoardTitle = styled.div`
  font-size: 16px;
  color: #333;
  float: left;
  max-width: 500px;

  @media screen and (max-width: 1280px) {
    max-width: 300px;
  }
  @media all and (min-width:768px) and (max-width:1023px) { 
    max-width: 320px;
  } 
  @media all and (min-width:768px) and (max-width:1023px) { 
    max-width: 320px;
  } 
  @media all and (min-width:480px) and (max-width:767px) {
    max-width: 600px;
    margin-bottom: 5px;
  } 
  @media all and (max-width:479px) {
    margin-bottom: 5px;
    max-width: 285px;

    font-size: 15px;
    max-width: 300px;
  }


  & > span:first-child {
    color: #ca5196;
  }
  & > a {
    color: rgb(51, 51, 51);
  }
  & > a .server {
    font-size: 16px;
    margin-right: 5px;
    float: left;
    color: #ca5196;
  }
  & > a .title {
    float: left;
    max-width: 340px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }


`;
const OtherBoardInfo = styled.div`
  float: right;
  font-family: "Tahoma";
  color: #aaaaaa;
  font-size: 12px;
  margin-right: 0;
  min-width: 324px;
  max-width: 380px;
  
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;

  @media all and (min-width:480px) and (max-width:767px) {
    display: flex;
    align-items: flex-start;
    max-width: 475px;
    width: 420px;
    justify-content: space-between;
  } 
  @media all and (max-width:479px) {
    display: flex;
    align-items: flex-start;
    max-width: 475px;
    width: 200px;
    justify-content: space-between;
  }

`;
const UserName = styled.span`
  float: left;
  width: 110px;
  max-width: 110px;
  color: #888888;
  font-size: 12px;
  font-family: "NanumBarunGothic", "Malgun Gothic", sans-serif;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
`;
const IconInfoWrap = styled.div`
  float: left;
  & > div:first-child {
    min-width: 45px;
  }
  max-width: 310px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media all and (max-width:479px) {
    max-width: 220px;
    &>div{
      margin: 0px 5px;
    }
  }
`;
const IconInfo = styled.div`
  float: left;
  line-height: 1.2;
  margin-left: 15px;
  min-width: 53px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-left: 18px;
  background: url("https://ssl.nexon.com/s2/game/maplestory/renewal/common/${(props) => props.iconImg}.png") left 0px no-repeat;
  max-width: ${(props) => {
    switch (props.iconImg) {
      case "heart2_new":
        return 55;
      case "sub_date_new":
        return 100;
      case "eye_new":
        return 70;
      default:
        break;
    }
  }}px;
  &.heart {
    background: url(${heartImg}) left 0px no-repeat;
  }
  &.date {
    background: url(${dateImg}) left 0px no-repeat;
    min-width: 90px !important;
  }
  &.eyeCount {
    background: url(${eyeImg}) left 0px no-repeat;
    min-width: 45px;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  float: left;
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
`;
const RegistBtn = styled.span`
  min-width: 53px;
  font-size: 15px;
  color: #fff;
  text-align: center;
  background-color: #da63a6;
  border-radius: 2px;
  padding: 12px 24px;
  display: inline-block;
  line-height: 1;
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #ca5196;
  }
`;

const UserWorldImg = styled.img``;

const PagenationWrap = styled.div`
  float: left;
  width: 100%;
`;

const CommentCount = styled.span`
  font-size: 15px;
  color: #e69fc7;
`;