import MessageComponent from "./Component";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const msgArrFun = async (setMsg, userName) => {
  if (document.cookie) {
    const msgArr = (
      await axios.post("/api/support/displaymsg", userName)
    ).data;
    setMsg(msgArr);
  }
};

const MessageContainer = () => {
  const [msgArr, setMsg] = useState([]);
  useEffect(() => {
    msgArrFun(setMsg);
  }, []);

  return <MessageComponent msgArr={msgArr} />;
};

export default MessageContainer;
