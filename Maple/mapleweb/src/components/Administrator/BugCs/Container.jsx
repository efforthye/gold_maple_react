import axios from "axios";
import BugCSComponent from "./Component";
import { useEffect, useState } from "react";
const tempFun = async (setReportArr) => {
  try {
    let reportArr = (await axios.post("/api/report/bugcs"))
      .data;
    setReportArr(reportArr);
  } catch (err) {
    console.error(err);
  }
};

const BugCSContainer = ({reportArr, setReportArr}) => {
  const [isBoolen, setBoolen] = useState(-1);

  useEffect(() => {
    tempFun(setReportArr);
  }, []);
  const onClick = (idx) => {
    if (idx + 1 == isBoolen) setBoolen(-1);
    else setBoolen(idx + 1);
  };
  const onAnswer = (answer, idx) => {
    const data = { answer: answer, id: idx };
    axios.post("/api/report/buganswer", data).then(
      function (data) {
        tempFun(setReportArr);
        setBoolen(-1);
      },
      (error) => {
        console.error("에러");
      }
    );
  };

  return (
    <BugCSComponent
      isBoolen={isBoolen}
      reportArr={reportArr}
      onClick={onClick}
      onAnswer={onAnswer}
    />
  );
};

export default BugCSContainer;
