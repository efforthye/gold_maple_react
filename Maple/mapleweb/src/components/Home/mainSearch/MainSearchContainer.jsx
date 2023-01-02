import { useState } from "react";
import MainSearchComponent from "./MainSearchComponent";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { action } from "../../../modules/search";

const navigateToSearch = async (searchType, searchData, navigate, dispatch) => {
  dispatch(action.search(searchType, searchData));
  navigate("/Search", {
    state: {
      searchType: searchType,
      searchData: searchData,
    },
  });
};

const MainSearchContainer = () => {
  const [searchType, setSearchType] = useState("제목");
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <MainSearchComponent
      searchType={searchType}
      searchData={searchData}
      setSearchType={setSearchType}
      setSearchData={setSearchData}
      navigateToSearch={navigateToSearch}
      navigate={navigate}
      dispatch={dispatch}
    ></MainSearchComponent>
  );
};

export default MainSearchContainer;
