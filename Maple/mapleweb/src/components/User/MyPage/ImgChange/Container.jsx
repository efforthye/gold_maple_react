import axios from "axios";
import { useSelector } from "react-redux";
import ImgChangeComponent from "./Component";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { action } from "../../../../modules/onImg";

const ImgChangeContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.user.currUserName);
  const imgUploadSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.innerText === "취소")
      return navigate("/mypage");
    if (!e.target?.imgselectfile?.files[0]?.name)
      return alert("파일을 선택하세요");
    const { imgselectfile } = e.target;
    let formData = new FormData();
    formData.append("selectimg", imgselectfile.files[0]);

    axios
      .post("/api/user/imgUpload", formData)
      .then((data) => {
        setImgOnclick(e);
      });
  };

  const setImgOnclick = (e) => {
    const { imgselectfile } = e.target;
    const currImg = imgselectfile.files[0].name;
    axios
      .post("/api/user/imgchange", { currUser, currImg })
      .then((data) => {
        navigate("/mypage");

        dispatch(action.onImg(data.data));
      });
  };

  return <ImgChangeComponent imgUploadSubmit={imgUploadSubmit} />;
};
export default ImgChangeContainer;
