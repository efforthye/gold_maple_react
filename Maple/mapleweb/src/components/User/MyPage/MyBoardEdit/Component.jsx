import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pagination from "react-js-pagination";

const MyBoardEditComponent = ({ getMyBoard, boardList, currUser }) => {
  const navigate = useNavigate();
  const [nowPage, setNowPage] = useState(1);

  const handlePageChange = (page) => {
    setNowPage(page);
  };

  let newBoards = [];
  if (boardList) {
    boardList?.reverse().map((item, idx) => {
      if (idx >= (nowPage - 1) * 5 && idx < nowPage * 5) {
        newBoards.push(item);
      }
    });
  }

  useEffect(() => {
    if (currUser) getMyBoard();
  }, [currUser]);
  return (
    <MyBoardBox>
      <MyBoardListBox>
        <div style={{ fontWeight: "bold" }}>
          총 게시글 수 : {boardList.length}개
        </div>
        {newBoards?.map((item, idx) => {
          const tempDate = item.createdAt;
          const boardDate = tempDate.split("T");
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }}
              key={`board-${idx}`}
              onClick={() => {
                navigate(`/Community/board/${item.id}`);
              }}
            >
              <div key={`data-${idx}`} style={{ display: "inline-block" }}>
                <span key={`item-${idx}`}>【{item.category}】</span>
                <span key={`title-${idx}`}> {item.title}</span>
              </div>
              <span key={`time-${idx}`} className="board_time">
                {boardDate[0]}
              </span>
            </div>
          );
        })}
        <div
          className="back-btn"
          onClick={() => {
            navigate("/mypage");
          }}
        >
          뒤로가기
        </div>
        <PagenationWrap>
          <Pagination
            activePage={nowPage}
            itemsCountPerPage={5}
            totalItemsCount={boardList?.length || 0}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </PagenationWrap>
      </MyBoardListBox>
    </MyBoardBox>
  );
};

export default MyBoardEditComponent;

const MyBoardBox = styled.div`
  & > button {
    margin: 10px 0 0 10px;
    border: none;
    background-color: #5e7bcb;
    width: 150px;
    height: 40px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px;
  }
`;

const MyBoardListBox = styled.div`
  padding: 10px;
  border: 1px solid #5e7bcb;
  color: #666;

  .back-btn {
    cursor: pointer;
    background-color: #5e7bcb;
    width: 90px;
    color: white;
    padding: 8px;
    text-align: center;
    border-radius: 5px;
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

const PagenationWrap = styled.div`
  float: left;
  width: 100%;
`;
