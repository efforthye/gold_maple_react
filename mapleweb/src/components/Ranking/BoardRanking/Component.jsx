import styled from "styled-components";
import { useEffect, useState, useMemo } from "react";
import searchImg from "../../User/Img/search.png";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const TotalRankingComponent = ({
  boardRanking,
  rankingData,
  serverBoardRanking,
  serverData,
  searchBoardRanking,
  searchList,
}) => {
  const [nowPage, setNowPage] = useState(1);

  const handlePageChange = (page) => {
    setNowPage(page);
  };

  useEffect(() => {
    boardRanking();
  }, []);

  const [server, setServer] = useState("서버 선택");
  const [searchData, setSearchData] = useState("");
  const route = useParams();

  useEffect(() => {
    serverBoardRanking(server);
  }, [server]);

  const RankingArr = useMemo(() => {
    if (route.sword) {
      if (searchList.length) {
        let tempAry = [...searchList];
        if (server != "서버 선택")
          tempAry = tempAry.filter((item) => item.userWorld == server);
        return tempAry;
      }
      return [];
    } else if (server === "서버 선택") {
      return rankingData;
    } else {
      return serverData;
    }
  }, [server, route, rankingData, serverData, searchList]);

  let newBoards = [];
  if (RankingArr) {
    RankingArr?.map((item, idx) => {
      if (idx >= (nowPage - 1) * 10 && idx < nowPage * 10) {
        newBoards.push(item);
      }
    });
  }

  return (
    <BoardRankBox>
      <div className="ranking-title">게시판 랭킹</div>
      <div>
        <div style={{ marginBottom: "10px" }}>유저 랭킹 검색</div>
        <input
          style={{ border: "2px solid lightgray", borderRadius: "5px" }}
          type={"text"}
          value={searchData}
          onInput={(e) => {
            setSearchData(e.target.value);
          }}
        />
        <button
          style={{
            border: "2px solid lightgray",
            borderRadius: "5px",
            marginLeft: "5px",
          }}
          onClick={() => {
            searchBoardRanking(searchData);
          }}
        >
          <img src={searchImg} alt="야호" />
        </button>
      </div>
      <BoardRankingList>
        <RankingSelectBox>
          <select
            style={{ marginTop: "10px" }}
            name="server"
            className="select"
            onChange={(e) => {
              setServer(e.target.value);
            }}
          >
            <option value="서버 선택">서버 선택</option>
            <option value="리부트">리부트</option>
            <option value="리부트2">리부트2</option>
            <option value="오로라">오로라</option>
            <option value="레드">레드</option>
            <option value="이노시스">이노시스</option>
            <option value="유니온">유니온</option>
            <option value="스카니아">스카니아</option>
            <option value="루나">루나</option>
            <option value="제니스">제니스</option>
            <option value="크로아">크로아</option>
            <option value="베라">베라</option>
            <option value="엘리시움">엘리시움</option>
            <option value="아케인">아케인</option>
            <option value="노바">노바</option>
          </select>
        </RankingSelectBox>
        <ul className="ranking-header">
          <li>순위</li>
          <li>유저 정보</li>
          <li>서버</li>
          <li>게시글 갯수</li>
        </ul>
      </BoardRankingList>
      <BoardRankingRaw>
        {RankingArr.length ? (
          newBoards?.map((item, idx) => {
            return (
              <ul key={`rankingList${idx}`} className="ranking-data">
                <li key={`ranking${idx}`} className="ranking">
                  {idx + 1 + (nowPage - 1) * 10}
                </li>
                <UserImgBox key={`userInfo${idx}`} item={item} />
                <li key={`server${idx}`} className="server-name">
                  {item.userWorld}
                </li>
                <li key={`count${idx}`} className="count-data">
                  {item.count}
                </li>
              </ul>
            );
          })
        ) : (
          <div style={{ textAlign: "center" }}>검색 결과가 없습니다.</div>
        )}
      </BoardRankingRaw>
      <PagenationWrap>
        <Pagination
          activePage={nowPage}
          itemsCountPerPage={10}
          totalItemsCount={RankingArr?.length || 0}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </PagenationWrap>
    </BoardRankBox>
  );
};
export default TotalRankingComponent;

const UserImgBox = ({ item }) => {
  return (
    <>
      <li className="user-img">
        <img src={`/api/download${item.profileImg}`}></img>
        <div>{item.tempUserName}</div>
      </li>
    </>
  );
};

const BoardRankBox = styled.div`
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
  width: 1200px;

  @media only screen and (max-width: 1280px) {
    width: 90%;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
  }

  .ranking-title {
    font-size: 25px;
    font-weight: bold;
    margin-top: 40px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 35px;
    height: 35px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child {
    border-radius: 3px 0 0 3px;
  }

  ul.pagination li:last-child {
    border-radius: 0 3px 3px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #5e7bcb;
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #5e7bcb;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #5e7bcb;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #5e7bcb;
  }
`;

const BoardRankingList = styled.div`
  width: 100%;
  .ranking-header {
    padding-top: 20px;
    width: 100%;
    display: flex;
    list-style: none;
    margin: 0;
    justify-content: space-around;

    @media only screen and (max-width: 768px) {
      font-size: 13px;
      & > li:last-child {
        padding: 5px 5px;
      }
    }

    @media only screen and (max-width: 480px) {
      font-size: 11px;
    }

    @media only screen and (max-width: 420px) {
      font-size: 10px;
    }
  }
  .ranking-header > li {
    background-color: #5e7bcb;
    padding: 10px;
    font-size: 16px;
    color: white;
    font-weight: 600;
  }

  .ranking-header li:first-child {
    width: 15%;
  }

  .ranking-header li:nth-child(2) {
    width: 45%;
  }

  .ranking-header li:nth-child(3) {
    width: 30%;
  }

  .ranking-header li:last-child {
    width: 10%;
  }
`;

const BoardRankingRaw = styled.div`
  border: 1px solid lightgray;
  border-bottom: none;

  @media only screen and (max-width: 1280px) {
    & > ul > li:nth-child(2) > img {
      width: 50px;
    }
  }

  .ranking-data {
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    border-bottom: 1px solid lightgray;

    width: 100%;
  }
  .ranking-data > li {
    padding: 10px;
  }

  .ranking {
    width: 15%;
    font-size: 24px;
  }

  .user-img {
    width: 45%;
    display: flex;
    column-gap: 5%;
    align-items: center;
    img {
      width: 10%;
      height: 50px;
    }
  }

  .server-name {
    width: 30%;
  }

  .count-data {
    width: 10%;
  }
`;

const RankingSelectBox = styled.div`
  .select {
    width: 150px;
    height: 35px;
    border-radius: 3px;
    border: 2px solid lightgray;
  }
`;
const PagenationWrap = styled.div`
  float: left;
  width: 100%;
`;
