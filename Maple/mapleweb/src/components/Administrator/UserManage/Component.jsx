import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const UserManageComponent = ({
  userSubmit,
  userArr,
  tempUser,
  delBtn,
  msgSubmit,
  stateName,
  boardDel,
  commentDel,
}) => {
  const [searchUser, setUser] = useState("");
  const [isBool, setBool] = useState(false);
  const [stateAdmin, setState] = useState("");
  const [msg, setMsg] = useState(``);
  useEffect(() => {
    setState(stateName.name);
  }, [stateName]);
  useEffect(() => {
    setMsg(`안녕하세요 GM"${stateAdmin}"입니다.`);
  }, [stateAdmin]);
  return (
    <UserManageBox>
      <div className="title">유저관리 목록</div>
      <table>
        <colgroup>
          <col width={"30%"} />
          <col width={"30%"} />
          <col width={"20%"} />
          <col width={"20%"} />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>유저이름</th>
            <th>서버</th>
            <th>가입날짜</th>
          </tr>
        </thead>
        <tbody>
          {userArr.map((item, idx) => (
            <tr key={`userbox-${idx}`}>
              <td key={`userIdx-${idx}`}>{idx+1}</td>
              <td key={`userName-${idx}`}>{item.userName}</td>
              <td key={`userServer-${idx}`}>{item.serverName}</td>
              <td key={`userDate-${idx}`}>{item.createdAt.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userSubmit(searchUser);
          setUser("");
        }}
      >
        <input
          type="text"
          value={searchUser}
          placeholder="검색할 유저닉네임"
          onInput={(e) => {
            setUser(e.target.value);
          }}
        />
        <button type="submit">유저검색</button>
      </form>
      {tempUser != "" ? (
        <Blank>
          <div className="title">유저검색 결과</div>
          <table>
            <colgroup>
              <col width={"30%"} />
              <col width={"30%"} />
              <col width={"15%"} />
              <col width={"15%"} />
              <col width={"10%"} />
            </colgroup>

            <thead>
              <tr>
                <th>유저아이디</th>
                <th>유저이름</th>
                <th>서버</th>
                <th>메세지버튼</th>
                <th>삭제버튼</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tempUser.userId}</td>
                <td>{tempUser.userName}</td>
                <td>{tempUser.serverName}</td>
                <td>
                  <button
                    onClick={() => {
                      setBool(!isBool);
                    }}
                  >
                    메세지보내기
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      delBtn(tempUser.userName);
                    }}
                  >
                    삭제하기
                  </button>
                </td>
              </tr>

              {isBool ? (
                <tr>
                  <td colSpan={3}>
                    <textarea
                      value={msg}
                      onInput={(e) => {
                        setMsg(e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        msgSubmit(msg, tempUser.userName);
                        setBool(!isBool);
                        setState(stateName.name);
    setMsg(`안녕하세요 GM"${stateAdmin}"입니다.`);

                      }}
                    >
                      보내기
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setBool(!isBool);
                      }}
                    >
                      취소
                    </button>
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </table>
          <div className="title">{tempUser.userName} 유저님의 활동내역</div>

          <div className="board">
            <div>작성 게시글</div>

          <table>
            <colgroup>
              <col width={"10%"} />
              <col width={"30%"} />
              <col width={"15%"} />
              <col width={"10%"} />
              <col width={"15%"} />
              <col width={"10%"} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>카테고리</th>
                <th>조회수</th>
                <th>작성날짜</th>
                <th>삭제버튼</th>
              </tr>
            </thead>

            <tbody>
              {tempUser.Board.map((item, idx) => (
                <tr key={`board-${idx}`}>
                  <td key={`boardIdx-${idx}`}>{idx + 1}</td>
                  {item.report != 0 ? <td  key={`boardTitle-${idx}`}>
                  <Link className="red" to={`/Community/board/${item.id}`}>
                  {item.title}
                  </Link>
                  </td>:<td key={`boardTitle-${idx}`}>
                  <Link to={`/Community/board/${item.id}`}>
                  {item.title}
                  </Link>
                  </td>}
                  

                  <td key={`boardCategory-${idx}`}>{item.category}</td>
                  <td key={`boardEyeCount-${idx}`}>{item.eyeCount}</td>
                  <td key={`boardCreated-${idx}`}>
                    {item.createdAt.split("T")[0]}
                  </td>
                  <td key={`boardDelBtn-${idx}`}>
                    <button
                      onClick={() => {
                        boardDel(item.id, tempUser.userName);
                      }}
                    >
                      삭제하기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="board">
          <div>작성 댓글</div>
          <table>
            <colgroup>
              <col width={"10%"} />
              <col width={"30%"} />
              <col width={"20%"} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>댓글</th>
                <th>삭제버튼</th>
              </tr>
            </thead>
            <tbody>
              {tempUser.Comment.map((item, idx) => (
                <tr key={`Comment-${idx}`}>
                  {item.report != 0?<> 
                  <td key={`idx-${idx}`}>{idx + 1}</td>
                  <td key={`CommentText-${idx}`}>
                  <Link className="red" to={`/Community/board/${item.boardId}`}>
                    {item.text}
                  </Link>
                  </td>
                  </>:
                  <><td key={`idx-${idx}`}>{idx + 1}</td>
                  <td key={`CommentText-${idx}`}>
                  <Link to={`/Community/board/${item.boardId}`}>
                    {item.text}
                  </Link>
                  </td></>}

               
                  <td>
                  <button 
                      onClick={() => {
                        commentDel(item.id, tempUser.userName);
                      }}
                    >
                      삭제하기
                    </button>
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table></div>
        </Blank>
      ) : (
        <></>
      )}
    </UserManageBox>
  );
};

export default UserManageComponent;

const UserManageBox = styled.div`
  
  & table {
    text-align: center;
    background-color : rgb(245,245,245);
    width: 100%;    
  }
  textarea {
    width: 80%;
    height: 100px;
  }
  a {
    color:black;
  }
  .red {
    color:red
  }
  .board{
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    background-color : rgb(245,245,245);
    margin-top : 10px;
    & div:first-child {
      font-size: 20px;
      font-weight:bold;
  }
  }
 .title{
    margin-top: 30px;
    font-size: 28px;
    font-weight:bold;
  } 
  form {
    margin-top:30px;
    margin-bottom:30px;
  }
  
`;

const Blank = styled.div`

  
`;
