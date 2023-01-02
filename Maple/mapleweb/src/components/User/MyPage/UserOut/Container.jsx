import UserOutComponent from "./Component";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { action } from "../../../../modules/user";
const UserOutContainer = () => {
  const currUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOutBtn = () => {
    axios.post("/api/user/signOut", currUser).then(() => {
      axios.post("/api/user/logout").then(() => {
        dispatch(action.refresh());
        dispatch(action.check());
        dispatch(action.login());
        navigate("/");
      });
    });
  };
  return <UserOutComponent signOutBtn={signOutBtn} />;
};

export default UserOutContainer;
