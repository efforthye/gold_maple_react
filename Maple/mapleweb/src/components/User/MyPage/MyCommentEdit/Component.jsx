import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

const MyCommentEditComponent = ({ commentList, getMycomment, currUser }) => {
  const navigate = useNavigate();
  const [nowPage, setNowPage] = useState(1);

  const handlePageChange = (page) => {
    setNowPage(page);
  };

  let newBoards = [];
  if (commentList) {
    commentList?.map((item, idx) => {
      if (idx >= (nowPage - 1) * 5 && idx < nowPage * 5) {
        newBoards.push(item);
      }
    });
  }

  useEffect(() => {
    if (currUser) getMycomment();
  }, [currUser]);
  return (
    <MyCommentBox>
      <MyCommentListBox>
        <div style={{ fontWeight: "bold" }}>
          총 댓글 수 : {commentList.length}개
        </div>
        {newBoards?.map((item, idx) => {
          const tempDate = item.createdAt;
          const commentDate = tempDate.split("T");
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }}
              key={`comment-${idx}`}
              onClick={() => {
                navigate(`/Community/board/${item.boardId}`);
              }}
            >
              <div key={`data-${idx}`} style={{ display: "inline-block" }}>
                <span key={`comment-${idx}`}> {item.text}</span>
              </div>
              <span key={`time-${idx}`} className="board_time">
                {commentDate[0]}
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
            totalItemsCount={commentList?.length || 0}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </PagenationWrap>
      </MyCommentListBox>
    </MyCommentBox>
  );
};

export default MyCommentEditComponent;

const MyCommentBox = styled.div`
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

const MyCommentListBox = styled.div`
  padding: 10px;
  border: 1px solid #5e7bcb;
  color: #666;

  & > div:hover {
    cursor: pointer;
  }
`;

const PagenationWrap = styled.div`
  float: left;
  width: 100%;
`;
