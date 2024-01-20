import TotalRankingContainer from "../Ranking/TotalRanking/Container";
import CommentRankingContainer from "../Ranking/CommentRanking/Container";
import BoardRankingContainer from "../Ranking/BoardRanking/Container";
import NavigateComp from "../Community/Navigation/Component";

import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { action } from "../../modules/header";
import { useEffect } from "react";
import styled from "styled-components";

const RankComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.header("Ranking"));
  }, []);
  const CATEGORY = [
    {
      name: "종합 랭킹",
      label: "",
      link: "/Ranking",
    },
    {
      name: "게시판 랭킹",
      label: "BoardRanking",
      link: "/Ranking",
    },
    {
      name: "댓글 랭킹",
      label: "CommentRanking",
      link: "/Ranking",
    },
  ];

  return (
    <RankingMain>
      <NavigateComp categorys={CATEGORY} />
      <div>
        {""}
        <Routes>
          <Route path={"/:sword/*"} element={<TotalRankingContainer />}></Route>
          <Route path={"*"} element={<TotalRankingContainer />}></Route>
          <Route
            path={"/BoardRanking/:sword/*"}
            element={<BoardRankingContainer />}
          ></Route>
          <Route
            path={"/BoardRanking/*"}
            element={<BoardRankingContainer />}
          ></Route>
          <Route
            path={"/CommentRanking/:sword/*"}
            element={<CommentRankingContainer />}
          ></Route>
          <Route
            path={"/CommentRanking/*"}
            element={<CommentRankingContainer />}
          ></Route>
        </Routes>
      </div>
    </RankingMain>
  );
};

export default RankComponent;

const RankingMain = styled.div`
  margin: 0 auto;
  min-height: 1200px;
`;
