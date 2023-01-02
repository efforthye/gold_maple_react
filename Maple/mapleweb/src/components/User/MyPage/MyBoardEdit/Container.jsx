import axios from "axios";
import MyBoardEditComponent from "./Component";
import { useSelector } from "react-redux";
import { useState } from "react";

const MyBoardEditContainer = () => {
  const currUser = useSelector((state) => state.user.currUserName);
  const [boardList, setBoardList] = useState([]);
  const getMyboard = () => {
    axios
      .post("/api/user/board", { currUser: currUser })
      .then((data) => {
        setBoardList(data.data);
      });
  };
  return (
    <MyBoardEditComponent
      getMyBoard={getMyboard}
      boardList={boardList}
      currUser={currUser}
    />
  );
};

export default MyBoardEditContainer;
