import AdminLoginComponent from "./Component";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../../../modules/admin";

const AdminLoginContainer = ( {setRender,_render}) => {
  const isCookie = document.cookie;
  const dispatch = useDispatch();
  const onClick = () => {
    axios.post("/api/admin/logout").then(() => {
      dispatch(action.logout());
    }).then(()=>{
      alert("로그아웃했습니다.")
    setRender(!_render)
    });
  };

  const infoSubmit = (value) => {
    axios.post("/api/admin/login", value).then(
      function (data) {
        if (document.cookie.split("=")[0] == "admin") {
          dispatch(action.check(data.data));
        }
      }
    ).then(()=>{
      alert("로그인했습니다.")
      setRender(!_render)
      
    });
  };

  const tempAdmin = useSelector((state) => state?.admin.name);
  return (
    <AdminLoginComponent
      isCookie={isCookie}
      onClick={onClick}
      tempAdmin={tempAdmin}
      infoSubmit={infoSubmit}
    />
  );
};

export default AdminLoginContainer;
