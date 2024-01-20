import { useDispatch } from "react-redux";
import { action } from "../../modules/header";
import styled from "styled-components";
import AdminLoginContainer from "./AdminLogin/Container";
import { useEffect,useState } from "react";
import ControlledTabsExample from "./ControlledTabs/ControlledTabs";
import NotFound from "../Community/NotFound";

const AdministratorComponet = () => {
  const dispatch = useDispatch();
  const [_render,setRender] = useState(false);
  useEffect(() => {
    dispatch(action.header("Administrator"));
  }, []);
  useEffect(()=>{

  },[_render]);
  const isCookie = document.cookie.split("=")[0];
  return (
    <div>
    {isCookie == "login" ? <NotFound/>:<AdminBox>
      {!isCookie ? (
        <>
          <AdminLoginContainer setRender={setRender} _render={_render}/>
        </>
      ) : (
        <>
          <AdminLoginContainer setRender={setRender} _render={_render}/>
          <ControlledTabsExample />
        </>
      )}
    </AdminBox>}
    
    </div>
  );
};

export default AdministratorComponet;

const AdminBox = styled.div`
  padding: 30px 30px;
`;
