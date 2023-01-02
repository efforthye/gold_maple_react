import styled from "styled-components";

import { useDispatch } from "react-redux";
import { action } from "../../modules/header";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import NavigationComponent from "../Community/Navigation/Component";
import NoticeContainer from "./Notice/Container";

const CATEGORY = [
    { name: '공지사항', label: "Notice" },
    { name: '업데이트', label: "Update" },
    { name: '이벤트', label: "Event" },
    { name: '캐시샵공지', label: "CashShop" },
    { name: '메이플알림판', label: "NoticeMapleBoard" },
];

const NewsComponet = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.header("News"));
  }, []);
  return (
    <NewsBox>
      <NavigationComponent categorys={CATEGORY} />
      <Routes>
        <Route path="/Notice/*" element={<NoticeContainer />}></Route>
        <Route path="/Update/*" ></Route>
        <Route path="/Event/*" ></Route>
        <Route path="/CashShop/*" ></Route>
        <Route path="/NoticeMapleBoard/*" ></Route>
      </Routes>
    </NewsBox>
  );
};

export default NewsComponet;

const NewsBox = styled.div``;
