import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import catErrorImg from "../src/components/Community/images/mong03b.gif";
import { action } from "./modules/header";

export const NotFound = () => {
 
  return (
    <NotFoundBox>
      <NotFoundImg src={catErrorImg} alt="404페이지"></NotFoundImg>
    </NotFoundBox>
  );
};

export default NotFound;

const NotFoundBox = styled.div`
  display: flex;
  justify-content: center;
`;
const NotFoundImg = styled.img``;
