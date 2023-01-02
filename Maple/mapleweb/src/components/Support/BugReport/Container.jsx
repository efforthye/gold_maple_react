import BugReportComponent from "./Component";
import CreateContainer from "./Create/Container";
import { Route, Routes } from "react-router-dom";

const BugReportContainer = () => {
  const isCookie = document.cookie;
  return (
    <>
      <Routes>
        <Route path="/Create" element={<CreateContainer />}></Route>
        <Route path="/" element={<BugReportComponent isCookie={isCookie} />} />
      </Routes>
    </>
  );
};

export default BugReportContainer;
