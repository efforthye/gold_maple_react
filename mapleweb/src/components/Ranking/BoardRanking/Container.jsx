import BoardRankingComponent from "./Component";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardRankingContainer = () => {
  const [rankingData, setRankingData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const navigate = useNavigate();

  const boardRanking = () => {
    axios.post("/api/rank/viewBoard").then((data) => {
      setRankingData(data.data);
    });
  };

  const serverBoardRanking = (server) => {
    axios.post("/api/rank/boardServer", { server: server }).then((data) => {
      setServerData(data.data);
    });
  };

  const searchBoardRanking = (searchData) => {
    axios
      .post(
        "/api/rank/searchBoard?searchData=" + searchData,
        { searchData: searchData }
      )
      .then((data) => {
        setSearchList(data.data);
        navigate(`/Ranking/BoardRanking/${searchData}`);
      });
  };

  return (
    <BoardRankingComponent
      boardRanking={boardRanking}
      rankingData={rankingData}
      serverBoardRanking={serverBoardRanking}
      serverData={serverData}
      searchBoardRanking={searchBoardRanking}
      searchList={searchList}
    />
  );
};

export default BoardRankingContainer;
