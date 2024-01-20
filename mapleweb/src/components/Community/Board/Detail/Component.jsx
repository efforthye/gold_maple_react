import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { action as communityAction, CATEGORY, WORLDLIST } from '../../../../modules/community';
import LinkIcon from "../../images/link_btn.png";
import AlarmIcon from "../../images/report_btn2.png";

import eyeImg from "../../images/info_eye_new.png";
import dateImg from "../../images/info_sub_date_new.png";
import lineImg from "../../images/btn_line_img.png";
import monaImg from "../../images/mona-loading-dark.gif";
import reportImg from "../../images/report_btn.png";

import moment from 'moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NotFound from '../../NotFound';

const DetailComponent = ({ reportBoard, reportComment }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const states = useSelector((state) => state);

    const { boardId } = useParams();

    const boardReq = axios.post("/api/board/getBoard", {
        boardId: boardId
    });

    const commentReq = axios.post("/api/comment/getComment", {
        boardId: boardId
    });

    useEffect(() => {
        dispatch(communityAction.comments([]));

        boardReq.then((board) => {
            dispatch(communityAction.board(board?.data));
        });

        commentReq.then((comment) => {
            if (comment.data.length == 0) return;
            if (comment.data.length) {
                dispatch(communityAction.comments());
            }
            dispatch(communityAction.comments(comment?.data));

            axios.post("/api/board/getLikeSevenBoards", {
            }).then((boards) => {
                const boardsData = boards.data;
                let likeTagBoards = [];
                boardsData.map((board, index) => {
                    if (board.tags != "") {
                        likeTagBoards.push(board);
                    }
                });
                dispatch(communityAction.tags(likeTagBoards));
            });
        });

        window.scrollTo({ left: 0, top: 270, behavior: "smooth" });

    }, [boardId]);


    let board = "";
    let boardTagsText = "";
    let comments = [];

    if (states.community.board) {
        board = states.community.board[0];
        boardTagsText = board?.tags;
    }
    comments = states.community.comments;

    useEffect(() => {
        const boardReq = axios.post("/api/board/eyeCountUpdate", {
            boardId: boardId
        });
    }, []);



    let route = "";
    CATEGORY.forEach((item, idx) => {
        if (item.name == board.category) {
            route = item.label;
        }
    });

    const userWorld = useSelector((state) => state.user.currServerName);
    const userName = useSelector((state) => state.user.currUserName);

    let deleteConfirm;

    let boardTags = [];
    boardTagsText.split("#").map((item, idx) => {
        if (item !== "") {
            boardTags.push("#" + item.replace(" ", ""));
        }
    });

    const [text, setText] = useState("");

    useEffect(() => {
        commentReq.then((comment) => {
            if (comment.data.length == 0) return;
            dispatch(communityAction.comments(comment?.data));
        });
    }, [text]);


    const [likeCount, setLikeCount] = useState(0);
    useEffect(() => {
        boardReq.then((board) => {
            dispatch(communityAction.board(board?.data));
        });
        commentReq.then((comment) => {
            if (comment.data.length == 0) return;
            dispatch(communityAction.comments(comment?.data));
        });
    }, [likeCount]);
    const [commentCount, setCommentCount] = useState(0);
    useEffect(() => {
        boardReq.then((board) => {
            dispatch(communityAction.board(board?.data));
        });
        commentReq.then((comment) => {
            if (comment.data.length == 0) return;
            dispatch(communityAction.comments(comment?.data));
        });
    }, [commentCount]);
    const [commentValue, setCommentValue] = useState("");
    useEffect(() => {
        boardReq.then((board) => {
            dispatch(communityAction.board(board?.data));
        });
        commentReq.then((comment) => {
            if (comment.data.length == 0) return;
            dispatch(communityAction.comments(comment?.data));
        });
    }, [commentValue]);


    return (
        <>
            <CategoryTItleBox>
                <CategoryTitle>{board?.category}</CategoryTitle>
                <CategoryRight>
                    <Link to={`/Community/${route}`}><span>목록</span></Link>
                </CategoryRight>
            </CategoryTItleBox>

            <ContentBox>
                <BoardTitle>
                    <BoardTitleSpan>[{board?.world}]</BoardTitleSpan>{" "}
                    <BoardTitleText>{board?.title}</BoardTitleText>
                </BoardTitle>

                <BoardInfoBox>
                    <BoardUserName>
                        {WORLDLIST.map((world, idx) => {
                            if (world.name == board?.userWorld) {
                                return <UserName key={`userName-${idx}`}><UserWorldImg key={`userWorldImg-${idx}`} src={`${world.img}`} style={{ marginRight: "1px" }} /> {board?.userName}</UserName>;
                            } else return;
                        })}
                    </BoardUserName>
                    <BoardInfo>
                        <IconInfo>
                            <span style={{ margin: "0px 10px" }}><img src={eyeImg} alt={"조회 아이콘"} />{" "}{board?.eyeCount}{" "}{" "}</span>
                            <span><img src={dateImg} alt={"시간 아이콘"} />{" "}{moment(board?.createdAt, "YYYY-MM-DDTHH:mm:ssZ").toDate().toLocaleString().slice(0, moment(board?.createdAt, "YYYY-MM-DDTHH:mm:ssZ").toDate().toLocaleString().length - 3)}</span>
                        </IconInfo><GuImg src={lineImg} alt={"구분선 이미지"} style={{ margin: "0px 10px" }} />
                        <IconBox>
                            <IconWrap>
                                <BoardOtherIcon src={LinkIcon} alt='링크 아이콘' onClick={() => {
                                    window.prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", window.location.href);
                                }} />
                            </IconWrap>
                            <IconWrap>
                                <BoardOtherIcon src={AlarmIcon} alt='신고 아이콘' onClick={() => {
                                    reportBoard(boardId);
                                }} />
                            </IconWrap>
                        </IconBox>
                    </BoardInfo>
                </BoardInfoBox>

                <BoardContent dangerouslySetInnerHTML={{ __html: board?.contents }}>
                </BoardContent>

                <LikeWrap>
                    <LikeBtn onClick={async (e) => {
                        const likeCountUpReq = await axios.post("/api/board/likeCountUpdate", {
                            boardId: boardId
                        });
                        setLikeCount(likeCount + 1);
                    }}>
                        <span>❤ 공감하기</span></LikeBtn>
                    <LikeCheck><span>{board?.likeCount} 명</span></LikeCheck>
                </LikeWrap>

                <TagWrap>
                    {boardTags.map((item, idx) => {
                        return <Tag key={`tag-${idx}`}>{item}</Tag>;
                    })}
                </TagWrap>

                {userName == board.userName ? (
                    <>
                        <UpDelBtnWrap>

                            <Link to={`./edit`}>
                                <UpDelBtn>수정</UpDelBtn>
                            </Link>


                            <Link to={`/Community/board/${board.id}`}>
                                <UpDelBtn onClick={async () => {
                                    deleteConfirm = window.confirm("정말 삭제하시겠습니까?");

                                    if (deleteConfirm) {
                                        await axios.post("/api/board/destroy", {
                                            boardId: board.id,
                                        });

                                        navigate(`/Community/${route}`);
                                    }
                                }}>삭제</UpDelBtn>
                            </Link>
                        </UpDelBtnWrap>
                    </>
                ) : ""}


                <CommentInfo>
                    댓글{" "}
                    <CommentCount>{comments?.length ? comments.length : 0}</CommentCount>
                </CommentInfo>

                <CommentBox>
                    <CommentWrap>
                        {comments?.map((comment, idx) => {
                            return (
                                <Comment key={`comment-${idx}`}>
                                    <CommentUserInfo key={`commentUserInfo-${idx}`}>
                                        {WORLDLIST.map((item, idx) => {
                                            if (item.name == comment.userWorld) {
                                                return (
                                                    <img key={`userWorld-${idx}`} src={item.img} alt='유저 월드 아이콘'></img>
                                                )
                                            }
                                        })}{" "}
                                        <span key={`userName-${idx}`}>{comment.userName}</span>{" "}
                                        <CommentTimeSpan key={`createTime-${idx}`}>{moment(comment.createdAt, "YYYY-MM-DDTHH:mm:ssZ").toDate().toLocaleString().slice(0, moment(comment.createdAt, "YYYY-MM-DDTHH:mm:ssZ").toDate().toLocaleString().length - 3)}</CommentTimeSpan>

                                        <span style={{ float: "right" }}>
                                            {comment.userName == userName ? <>

                                                <CommentBtnItem onClick={() => {
                                                    const commentUpdateValue = prompt("수정할 댓글을 입력해주세요.", comment.text);
                                                    if (commentUpdateValue) {
                                                        axios.post("/api/comment/update", {
                                                            commentId: comment.id,
                                                            commentText: commentUpdateValue,
                                                        }).then(() => {
                                                            return commentReq;
                                                        }).then((comment) => {
                                                            if (comment.data.length == 0) return;
                                                            setCommentValue(commentUpdateValue);
                                                            dispatch(communityAction.comments(comment?.data));
                                                        });;

                                                    } else {
                                                        return;
                                                    }

                                                }}>수정</CommentBtnItem>

                                                <CommentBtnItem onClick={async () => {
                                                    const isDel = window.confirm("댓글을 삭제하시겠습니까?");

                                                    if (isDel) {
                                                        const commentDelReq = await axios.post("/api/comment/destroy", {
                                                            commentId: comment.id,
                                                            userName: userName,
                                                            boardId: board.id
                                                        });
                                                        switch (commentDelReq.data.status) {
                                                            case 200:
                                                                alert("댓글이 삭제되었습니다.");
                                                                const commentCountDownReq = await axios.post("/api/board/commentCountDown", {
                                                                    boardId: boardId
                                                                });
                                                                setText(" ");
                                                                dispatch(communityAction.comments(comment?.data));
                                                                setCommentCount(commentCount - 1);
                                                                return;
                                                            case 400:
                                                                alert("댓글 삭제 불가능합니다.");
                                                                return;
                                                            default:
                                                                break;
                                                        }
                                                    } else {
                                                        return;
                                                    }

                                                }}>삭제</CommentBtnItem>

                                            </> : ""}

                                            <img src={reportImg} alt={"신고 버튼"} onClick={() => {
                                                reportComment(comment.id)
                                            }} style={{ cursor: "pointer" }}></img>
                                        </span>
                                    </CommentUserInfo>
                                    <CommentValue key={`commentText-${idx}`}>{comment.text}</CommentValue>

                                </Comment>
                            );
                        })}
                    </CommentWrap>
                </CommentBox>

                <CommentAddWrap>
                    <CommentAdd>
                        <CommentTextArea name='comment' value={text} onInput={(e) => {
                            setText(e.target.value);
                        }}></CommentTextArea>
                        <CommentBtnWrap>
                            <div style={{ fontSize: "25px", marginLeft: "5px", display: "flex" }}>
                                <Link to={`/Error`} element = {NotFound}>
                                    <img src={monaImg} alt='금쪽이' style={{ width: "35px" }} onClick={() => {
                                    }} />
                                </Link>
                            </div>
                            <CommentAddBtn onClick={async () => {
                                if (!userName) {
                                    alert("로그인이 필요합니다.");
                                    return;
                                }
                                if (!text) {
                                    alert("텍스트를 입력해주세요.");
                                    return;
                                }

                                const commentAddRed = await axios.post("/api/comment/create", {
                                    userName: userName,
                                    text: text,
                                    boardId: board?.id,
                                    userWorld: userWorld,
                                });

                                switch (commentAddRed.data.status) {
                                    case 200:
                                        alert("댓글이 등록되었습니다.");
                                        setText("");
                                        const commentCountUpReq = await axios.post("/api/board/commentCountUp", {
                                            boardId: boardId
                                        });
                                        setCommentCount(commentCount + 1);
                                        return;
                                    case 400:
                                        alert("댓글 등록 오류입니다.");
                                        return;
                                    default:
                                        break;
                                }
                            }}>등록</CommentAddBtn>
                        </CommentBtnWrap>

                    </CommentAdd>
                </CommentAddWrap>
            </ContentBox>

        </>
    );
};

export default DetailComponent;

const CategoryTItleBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const CategoryTitle = styled.h1`
    font-size: 28px;
    color: #333;
    margin-top: 60px;
    font-weight: 600;
    width: 100%;
    height: 40px;
    margin-bottom: 40px;
    cursor: default;
    display: inline;
    max-width: 400px;
`;
const CategoryRight = styled.div`
    margin-top: 15px;
    cursor: pointer;
    white-space: nowrap;
    & span{
        display: inline-block;
        font-size: 13px;
        color: #666;
        padding: 13px 24px;
        line-height: 1;
        border: 1px solid #e6e6e6;
    }
    
`;

const ContentBox = styled.div`
    min-height: 800px;
`;

const BoardTitle = styled.p`
    float: left;
    width: 100%;
    line-height: 1.3;
    min-height: 36px;
    border-top: 1px solid #7e7e7e;
    color: #333;
    font-size: 24px;
    background-color: #FBF9FA;
    word-break: break-all;
    padding: 37px 27px 37px;
    margin-top: 0 !important;
    margin-bottom: 0px;
`;
const BoardTitleSpan = styled.span`
    color: #CA5196;
    font-style: normal;
    font-size: 24px;
`;
const BoardTitleText = styled.span`
    color: #333;
`;


const BoardInfoBox = styled.div`
    float: left;
    width: 100%;
    height: 55px;
    line-height: 55px;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;

    display: flex;
    justify-content: space-between;
`;
const BoardUserName = styled.div`
    float: left;
    margin-left: 27px;
    height: 100%;
    font-size: 13px;
    display: flex;
    align-items: center;
    &>a{
        float: left;
        color: #888;
        &>img{
            margin-bottom: 3px;
            margin-right: 5px;
            vertical-align: middle;
        }
    }
`;
const BoardInfo = styled.div`
    float: right;
    margin-right: 27px;
    font-size: 13px;
  
    &>div{
        display: inline;
    }

    white-space: nowrap;
`;

const BoardContent = styled.div`
    width: 100%;
    float: left;
    padding: 50px 30px;
    min-height: 10px;
    &>p{
        margin-bottom: 0.9rem;
    }

    @media all and (min-width: 480px) and (max-width: 767px) {
        padding: 40px 30px;
    }
    @media all and (max-width: 479px) {
        padding: 30px 30px;
    }

`;

const LikeWrap = styled.div`
    float: left;
    width: 100%;
    height: 55px;
    line-height: 55px;
    text-align: center;
    margin-bottom: 50px;
    &>div{
        display: inline-block;
        height: inherit;
        border-radius: 2px;
        cursor: pointer;
        box-sizing: border-box;
    }

    @media all and (min-width: 480px) and (max-width: 767px) {
        height: 45px;
        line-height: 45px;
        margin-bottom: 40px;
    }
    @media all and (max-width: 479px) {
        height: 45px;
        line-height: 45px;
        margin-bottom: 40px;
    }

`;
const LikeBtn = styled.div`
    width: 140px;
    background-color: #F6890A;
    color: white;
    margin-right: 5px;
    padding: 0 20px;
    border: 1px solid #F6890A;
    &:hover{
        background-color: #F57700;
        border: 1px solid #F6890A;
    }
    -webkit-touch-callout: none;
     user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     -webkit-user-select: none;
`;
const LikeCheck = styled.div`
    min-width: 60px;
    border: 1px solid #dbdbdb;
    background-color: #F7F7F7cc;
    color: #7c767c;
    padding: 0 20px;
    &:hover{
        border: 1px solid #929192da;
    }
    -webkit-touch-callout: none;
     user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     -webkit-user-select: none;
`;


const CommentInfo = styled.div`
    float: left;
    width: 100%;
    height: 55px;
    line-height: 55px;
    border-top: 1px solid #e3e3e3;
    padding: 0 30px;
`;
const CommentCount = styled.div`
    color: #F6890A;
    display: inline-block;
    font-size: 17px;
    font-weight: 600;
`;
const IconBox = styled.div`
`;
const IconWrap = styled.div`
    display: inline;
    width: 31px;
    height: 31px;
    margin: 0 5px;

    @media all and (max-width: 479px) {
        display: none;
    }
`;
const BoardOtherIcon = styled.img`
    cursor: pointer;
`;

const CommentBox = styled.div`
    float: left;
    width: 100%;
`;
const CommentWrap = styled.div`
    float: left;
    width: 100%;
    border-bottom: 1px solid #e3e3e3;
`;
const Comment = styled.div`
    box-sizing: border-box;
    border-top: 1px solid #e3e3e3;
    font-size: 15px;
    float: left;
    width: 100%;
    
    padding: 30px 27px 25px 27px;
    &>div:first-child{
        margin-bottom: 10px;
    }
`;
const CommentUserInfo = styled.div`
    & span{
        margin-right: 2px;
    }
`;
const CommentValue = styled.span`
    font-size: 13px;
    color: #555555;
`;

const CommentAddWrap = styled.div`
    float: left;
    margin-top: 40px;
    width: 100%;
    height: 205px;
    margin-bottom: 40px;

`;
const CommentAdd = styled.div`
    height: 203px;
    background-color: #e8eaee;
    border: 1px solid #dcdde1;

    @media all and (max-width: 479px) {
        height: 182px;
    }

`;
const CommentTextArea = styled.textarea`
    float: left;
    padding: 20px;
    width: 908px;
    height: 135px;
    margin-top: 10px;
    margin-left: 10px;
    background-color: #fff;
    resize: none;
    overflow: hidden;
    overflow-y: auto;
    border: none;

    @media screen and (max-width: 1280px) {
        width: 97%;
    }
    @media all and (min-width: 768px) and (max-width: 1023px) {
        width: 98%;
    }
    @media all and (min-width: 768px) and (max-width: 1023px) {
        width: 96.5%;
    }
    @media all and (min-width: 480px) and (max-width: 767px) {
        width: 95.5%;
    }
    @media all and (max-width: 479px) {
        width: 350px;
        height: 115px;
    }

`;
const CommentBtnWrap = styled.div`
    position: relative;
    float: left;
    margin-top: 6px;
    width: 100%;
    height: 42px;
    line-height: 42px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>div{
        display: inline-block;
        cursor: pointer;
    }
`;
const CommentAddBtn = styled.div`
    min-width: 53px;
    font-size: 16px;
    color: #fff !important;
    text-align: center;
    background-color: #747a86;
    border-radius: 2px;
    padding: 9px 24px;
    border: 1px solid #747a86;
    display: inline-block;
    line-height: 1;
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

const UserWorldImg = styled.img`
`;
const IconInfo = styled.div`
    color : #888;
`;

const UpDelBtnWrap = styled.div`
    float: left;
    width: 100%;
    height: 60px;
    padding-top: 15px;
    border-top: 1px solid #cecece;
    margin-bottom: 25px;
`;
const UpDelBtn = styled.div`
    float: left;
    margin-left: 7px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    background-color: #747A86;
    width: 90px;
    height: 40px;
    line-height: 40px;
    color: #ececec;
    border-radius: 2px;
`;

const TagWrap = styled.div`
    float: left;
    background-color: #F9F9F9;
    width: 100%;
    padding: 12px 27px;
    margin-bottom: 16px;
`;
const Tag = styled.span`
    cursor: pointer;
    color: #696969;
    font-size: 13px;
    margin-right: 11px;
`;


const CommentTimeSpan = styled.span`
    font-size: 13px;
    color: #888;
`;
const CommentBtnItem = styled.span`
    font-size: 13px;
    border: 1px solid #c4c4c4;
    padding: 4.5px 5px;
    cursor: pointer;
    margin-right: 4px;
    width: 33px;
    height: 30px;
    line-height: 23px;
    text-align: center;
    font-size: 10px;
    border: 1px solid #e3e3e3;
    color: #313131;
    box-sizing: border-box;
`;

const GuImg = styled.img`

    @media all and (max-width: 479px) {
        display: none;
    }

`;