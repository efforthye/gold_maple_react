import MyCommentEditComponent from "./Component";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const MyCommentEditContainer = () => {
  const currUser = useSelector((state) => state.user.currUserName);
  const [commentList, setCommentList] = useState([]);
  const getMycomment = () => {
    axios
      .post("/api/user/comment", {
        currUser: currUser,
      })
      .then((data) => {
        setCommentList(data.data);
      });
  };
  return (
    <MyCommentEditComponent
      commentList={commentList}
      getMycomment={getMycomment}
      currUser={currUser}
    />
  );
};

export default MyCommentEditContainer;
