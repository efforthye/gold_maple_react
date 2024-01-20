import MyRequestComponent from "./Component";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const tempFun = async (setRequest, navigate) => {
  if (document.cookie) {
    try {
      let requestArr = (
        await axios.post("/api/report/request")
      ).data;
      setRequest(requestArr);
    } catch (err) {
      console.error(err);
    }
  } else {
    alert("로그인을하고오세요");
    navigate("/login");
  }
};

const MyRequestContainer = () => {
  const [requestArr, setRequest] = useState([]);
  const [isBoolen, setBoolen] = useState(-1);
  const navigate = useNavigate();

  const report = useSelector((state) => state.report);
  const onClick = (idx) => {
    if (idx + 1 == isBoolen) setBoolen(-1);
    else setBoolen(idx + 1);
  };
  useEffect(() => {
    tempFun(setRequest, navigate);
  }, []);
  return (
    <MyRequestComponent
      isBoolen={isBoolen}
      requestArr={requestArr}
      onClick={onClick}
    />
  );
};

export default MyRequestContainer;
