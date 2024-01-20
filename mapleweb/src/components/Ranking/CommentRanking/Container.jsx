import CommentRankingComponent from "./Component";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommentRankingContainer = () => {
  const [commentData, setCommentData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const navigate = useNavigate();

  const commentRanking = () => {
    axios.post("/api/rank/viewComment").then((data) => {
      setCommentData(data.data);
    });
  };

  const serverCommentRanking = (server) => {
    axios.post("/api/rank/commentServer", { server: server }).then((data) => {
      setServerData(data.data);
    });
  };

  const searchCommentRanking = (searchData) => {
    axios
      .post(
        "/api/rank/searchComment?searchData=" + searchData,
        { searchData: searchData }
      )
      .then((data) => {
        setSearchList(data.data);
        navigate(`/Ranking/CommentRanking/${searchData}`);
      });
  };

  return (
    <CommentRankingComponent
      commentData={commentData}
      commentRanking={commentRanking}
      serverCommentRanking={serverCommentRanking}
      serverData={serverData}
      searchCommentRanking={searchCommentRanking}
      searchList={searchList}
    />
  );
};

export default CommentRankingContainer;
