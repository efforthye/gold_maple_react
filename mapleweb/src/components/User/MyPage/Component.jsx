import styled from "styled-components";
import NavigateComp from "../../Community/Navigation/Component";
import { useDispatch } from "react-redux";
import { action } from "../../../modules/header";
import { Link, useParams } from "react-router-dom";
import ImgChangeContainer from "./ImgChange/Container";
import NicknameChangeContainer from "./NicknameChange/Container";
import MyBoardEditContainer from "./MyBoardEdit/Container";
import UserOutContainer from "./UserOut/Container";
import { useSelector } from "react-redux";
import MyCommentEditContainer from "./MyCommentEdit/Container";
import PasswordChangeContainer from "./PasswordChange/Container";
import { useEffect } from "react";

const MypageComponent = ({ getUserImg, checkLogin }) => {
  const dispatch = useDispatch();
  const route = useParams();
  const currUserName = useSelector((state) => state.user.currUserName);
  const currUserWorld = useSelector((state) => state.user.currServerName);

  useEffect(() => {
    dispatch(action.header("Mypage"));
  }, []);
  const currImg = useSelector((state) => state.onImg);
  const CATEGORY = [
    {
      name: "내정보 관리",
      label: "../",
      link: "/mypage",
    },
  ];

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (currUserName == undefined) return;
    getUserImg(currUserName);
  }, [currUserName]); 

  const myDiv = () => {
    switch (route.route) {
      case "ImgChange":
        return <ImgChangeContainer />;

      case "NickChange":
        return <NicknameChangeContainer />;

      case "MyBoard":
        return <MyBoardEditContainer />;

      case "MyComment":
        return <MyCommentEditContainer />;

      case "PasswordChange":
        return <PasswordChangeContainer />;

      case "UserOut":
        return <UserOutContainer />;

      default:
        return (
          <ul>
            <Link to={"/mypage/ImgChange"}>
              <li>- 대표이미지 변경</li>
            </Link>
            <Link to={"/mypage/NickChange"}>
              <li>- 닉네임 변경</li>
            </Link>
            <Link to={"/mypage/MyBoard"}>
              <li>- 내가 쓴 글 관리</li>
            </Link>
            <Link to={"/mypage/MyComment"}>
              <li>- 내가 쓴 댓글 관리</li>
            </Link>
            <Link to={"/mypage/PasswordChange"}>
              <li>- 비밀번호 변경</li>
            </Link>
            <Link to={"/mypage/UserOut"}>
              <li>- 회원탈퇴</li>
            </Link>
          </ul>
        );
    }
  };

  return (
    <MediaMypage>
      <NavigateComp categorys={CATEGORY} />
      <MypageBox>
        <MypageContents>
          <LeftContent>
            <img src={currImg} alt="프로필사진" className="cat_img" />
            <p>닉네임 : {currUserName}</p>
            <p> 월드 : {currUserWorld}</p>
          </LeftContent>
          <RightContent>
            <div>
              <p className="main-title">내정보 관리</p>
            </div>
            {myDiv()}
          </RightContent>
        </MypageContents>
      </MypageBox>
    </MediaMypage>
  );
};
export default MypageComponent;

const MediaMypage = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const MypageBox = styled.div`
  min-height: 500px;
  margin: 0 auto;
`;
const MypageContents = styled.div`
  width: 100%;
  display: flex;

  @media only screen and (max-width: 960px) {
    width: 100vw;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    & img.cat_img {
      width: 200px;
    }

    & > div {
      width: 90%;
    }
  }
`;

const LeftContent = styled.div`
  width: 20%;
  padding: 20px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 100%;
    height: 200px;
  }

  & > p {
    text-align: center;
    font-weight: bold;
  }
`;

const RightContent = styled.div`
  padding: 20px;
  width: 80%;

  @media only screen and (max-width: 1200px) {
    width: 70%;
  }

  @media only screen and (max-width: 1080px) {
    width: 60%;
  }

  & > div:first-child {
    background-color: #5e7bcb;
  }

  .main-title {
    font-size: 25px;
    text-align: center;
    color: white;
    padding: 10px 0;
    margin: 0;
  }
  & > ul {
    list-style: none;
    border: 1px solid #5e7bcb;
    display: flex;
    flex-direction: column;
  }

  & > ul > a > li {
    margin: 10px 0;
    color: #666;
  }
  & > ul > a > li:hover {
    color: #5e7bcb;
  }
`;
