import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserManageComponent from "./Component";

const tempFun = async (setReportArr) => {
  try {
    let reportArr = (await axios.post("/api/report/bugcs"))
      .data;
    setReportArr(reportArr);
  } catch (err) {
    console.error(err);
  }
};

const BoardArrFun = async (setBoard) =>{
  try{
     let boardArr = (await axios.post("/api/admin/reportboard")).data;
     setBoard(boardArr);
  }catch(err){
     console.error(err);
  }
 }

const CommentArrFun = async (setComment) =>{
  try{
     let commentArr = (await axios.post("/api/admin/reportcomment")).data;
     setComment(commentArr);
  }catch(err){
     console.error(err);
  }
 }

const userArrFun = async (setUser) => {
  try {
    let userArr = (
      await axios.post("/api/admin/displayuser")
    ).data;
    setUser(userArr);
  } catch (err) {
    console.error(err);
  }
};

const UserManageContainer = ({setComment,setBoard,setReportArr}) => {
  const [userArr, setUser] = useState([]);
  const [tempUser, setTemp] = useState([]);
  useEffect(() => {
    userArrFun(setUser);
  }, []);
  useEffect(() => {
  }, [tempUser]);
  const userSubmit = (user) => {
    axios
      .post("/api/admin/searchuser", {
        user,
      })
      .then((data) => {
        if (!data.data.userName) return alert("존재하지않는 회원입니다.");
        setTemp(data.data);
      });
  };
  const delBtn = (userName) => {
    axios
      .post("/api/admin/deluser", { userName })
      .then((data) => {
        alert(data.data);
        userArrFun(setUser);
        setTemp("");
      }).then(()=>{
        BoardArrFun(setBoard);
        CommentArrFun(setComment);
        tempFun(setReportArr);
      });
  };
  const msgSubmit = (msg, userName) => {
    axios.post("/api/admin/sendmsg", { msg, userName });
  };
  const stateName = useSelector((state) => state?.admin);
  const boardDel = (id, user) => {
    axios
      .post("/api/admin/deluserboard", { id, user })
      .then((data) => {
        alert(data.data.msg);
        setTemp(data.data.tempUser);
      }).then(()=>{
        BoardArrFun(setBoard);
      });
  };
  const commentDel = (id, user) => {
    axios
      .post("/api/admin/delusercomment", { id, user })
      .then((data) => {
        alert(data.data.msg);
        setTemp(data.data.tempUser);
      }).then(()=>{
        CommentArrFun(setComment);
      });
  };
  return (
    <UserManageComponent
      tempUser={tempUser}
      userArr={userArr}
      userSubmit={userSubmit}
      delBtn={delBtn}
      msgSubmit={msgSubmit}
      stateName={stateName}
      boardDel={boardDel}
      commentDel={commentDel}
    />
  );
};

export default UserManageContainer;
