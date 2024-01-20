import { useDispatch } from "react-redux";
import CreateComponent from "./Component";
import { action } from "../../../../modules/support";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = (reportTitle, reportSelect, imgFile, contentsText) => {
    if (!reportTitle.match(/\S/g)) return alert("제목을 입력하세요");
    if (!imgFile) return alert("파일을 첨부하세요");
    let formData = new FormData();
    let img = imgFile[0];
    if (reportSelect == "program") {
      reportSelect = "불법프로그램 신고";
    } else reportSelect = "버그악용 신고";
    formData.append("reportTitle", reportTitle);
    formData.append("reportSelect", reportSelect);
    formData.append("reportFile", img);

    formData.append("contentsText", contentsText);
    dispatch(
      action.report(reportTitle, reportSelect, imgFile[0].name, contentsText)
    );
    axios
      .post(
        "/api/report/uploadBugReport",

        formData
      )
      .then(
        () => {
          alert("성공적으로 업로드되었습니다.");
          navigate("../");
        },
        (error) => {
          alert("에러");
        }
      );
  };
  return <CreateComponent onClick={onClick} />;
};

export default CreateContainer;
