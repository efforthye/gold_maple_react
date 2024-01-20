import styled from "styled-components";
import { useDispatch } from "react-redux";
import { action } from "../../modules/header";

import { Routes, Route } from "react-router-dom";
import ServiceContainer from "./Service/Container";
import BugReportContainer from "./BugReport/Container";
import { useEffect } from "react";

import NavigationComponent from "../Community/Navigation/Component";

const CATEGORY = [
    { name: '도움말/1:1문의', label: "Service" },
    { name: '버그악용/불법프로그램신고', label: "BugReport" },
];

const SupportComponet = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.header("Support"));
  }, []);
  return (
    <SupportBox>
      <NavigationComponent categorys={CATEGORY} />
      <Routes>
        <Route path="/Service/*" element={<ServiceContainer />}></Route>
        <Route path="/BugReport/*" element={<BugReportContainer />}></Route>
      </Routes>
    </SupportBox>
  );
};

export default SupportComponet;

const SupportBox = styled.div`
.category-title {
  font-size: 28px;
  font-weight:bold;
}
`;



