import TotalRankingComponent from "./Component";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TotalRankingContainer = () => {
  const [totalData, setTotalData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const navigate = useNavigate();

  const totalRanking = () => {
    axios.post("/api/rank/total").then((data) => {
      setTotalData(data.data);
    });
  };

  const serverTotalRanking = (server) => {
    axios.post("/api/rank/totalServer", { server: server }).then((data) => {
      setServerData(data.data);
    });
  };

  const searchTotalRanking = (searchData) => {
    axios
      .post(
        "/api/rank/searchTotal?searchData=" + searchData,
        { searchData: searchData }
      )
      .then((data) => {
        setSearchList(data.data);
        navigate(`/Ranking/${searchData}`);
      });
  };
  return (
    <TotalRankingComponent
      totalData={totalData}
      totalRanking={totalRanking}
      serverTotalRanking={serverTotalRanking}
      serverData={serverData}
      searchTotalRanking={searchTotalRanking}
      searchList={searchList}
    />
  );
};
export default TotalRankingContainer;
