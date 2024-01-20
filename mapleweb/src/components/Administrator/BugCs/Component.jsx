import styled from "styled-components";
import { useState } from "react";
const BugCSComponent = ({ reportArr, onClick, isBoolen, onAnswer }) => {
  return (
    <BugCSBox>
      <div>버그리포트게시판</div>
      <table>
        <colgroup>
          <col width={"5%"} />
          <col width={"30%"} />
          <col width={"15%"} />
          <col width={"20%"} />
          <col width={"10%"} />
          <col width={"10%"} />
          <col width={"10%"} />
        </colgroup>

        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>유저닉네임</th>
            <th>분류</th>
            <th>날짜</th>
            <th>처리상태</th>
            <th>답변달기</th>
          </tr>
        </thead>
        <tbody>
          {reportArr.map((item, idx) => (
            <Component
              item={item}
              idx={idx}
              onClick={onClick}
              isBoolen={isBoolen}
              onAnswer={onAnswer}
              key={`Componet-${idx}`}
            />
          ))}
        </tbody>
      </table>
    </BugCSBox>
  );
};

export default BugCSComponent;

const BugCSBox = styled.div`
  padding: 30px 30px;
  table {
    border: solid 1px black;
    width: 100%;
    text-align: center;
  }
  th {
    border-bottom: 1px dashed black;
  }
  td {
    border: 1px dashed black;

    text-align: center;
    & div {
      background-color: lightblue;
      border-radius: 5px;
      width: fit-content;
      margin: auto;
    }
  }
  padding: 20px 20px;
  .serviceDisplay {
    margin-bottom: 30px;
  }
  button {
    background-color: lightblue;
    border: none;
    border-radius: 5px;
  }
  .answer {
    height: 200px;
  }
  h3 {
    font-weight: bold;
  }
`;

const Component = ({ item, idx, onClick, isBoolen, onAnswer }) => {
  const [answer, setAnswer] = useState(
    "조사한 결과 해당 유저는 문제가 없습니다."
  );
  return (
    <>
      <tr key={`requestBox-${idx}`} className="requestBox">
        <td key={`reportidx-${idx}`}>
          <div>{idx + 1}</div>
        </td>
        <td key={`reportTitle-${idx}`}>
          <button
            onClick={() => {
              onClick(idx);
            }}
          >
            {item.reportTitle}
          </button>
        </td>
        <td key={`userName-${idx}`}>{item.name}</td>

        <td key={`reportSelect-${idx}`}>
          <div>{item.reportSelect}</div>
        </td>
        <td key={`dateNow-${idx}`}>
          <div>{item.updatedAt.split("T")[0]}</div>
        </td>
        <td key={`reportProcessing-${idx}`}>
          <div>{item.reportProcessing ? item.reportProcessing : "접수중"}</div>
        </td>
        <td key={`reportAnswer-${idx}`}>
          <button
            onClick={() => {
              onClick(idx);
            }}
          >
            답변
          </button>
        </td>
      </tr>
      <tr>
        {isBoolen == idx + 1 ? (
          <>
            <td
              key={`contents-${idx + 1}`}
              colSpan={4}
              className="contents"
              dangerouslySetInnerHTML={{ __html: item.contentsText }}
            ></td>
            <td key={`answer-${idx + 1}`} colSpan={2}>
              <textarea
                className="answer"
                value={answer}
                onInput={(e) => {
                  setAnswer(e.target.value);
                }}
              ></textarea>
            </td>
            <td key={`answerBtn-${idx + 1}`}>
              <button
                onClick={() => {
                  onAnswer(answer, idx + 1);
                }}
              >
                답변달기
              </button>
            </td>
          </>
        ) : (
          <></>
        )}
      </tr>
    </>
  );
};
