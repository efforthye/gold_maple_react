import styled from "styled-components";
import ServiceComponent from "./Component";

import { Routes, Route, Link } from "react-router-dom";
const ServiceContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<ServiceComponent />} />;
    </Routes>
  );
};

export default ServiceContainer;
