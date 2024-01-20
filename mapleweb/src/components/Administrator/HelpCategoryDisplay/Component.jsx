import { useState } from "react";
import styled from "styled-components";

const HelpCategoryDisplayComponent = ({
  categoryArr,
  childArr,
  isBool,
  editText,
  textSubmit,
  delBtn,
  editBtn,
  editSubmit,
  cancel,
  a,
  b,
  c,
  d,
  children,
  changeFromBtn,changeToBtn
}) => {
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [edit, setEdit] = useState("");
  const [changeBool,setChangeBool] =useState(true);
  return (
    <DisplayBox>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          textSubmit(category, text);
          setText("")
        }}
      >
        <div className="title">온라인상담문의 {d}</div>
        {categoryArr == "" ? (
          <></>
        ) : (
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option>선택하시오</option>
            {categoryArr.map((item, idx) => (
              <option value={item[c]} key={`childOption-${idx}`}>
                {item[c]}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="텍스트"
          value={text}
          onInput={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit">텍스트추가</button>
      </form>
      {childArr.map((item, idx) => (
        <Blank key={`child-${idx}`}>
          {isBool == idx ? (
            <Blank>
              <input
                type={text}
                defaultValue={editText}
                onChange={(e) => {
                  setEdit(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  editSubmit(edit, item.id);
                }}
              >
                수정확인
              </button>
              <button onClick={cancel}>취소</button>
            </Blank>
          ) : (
            <Blank>
              {b == "" ? <></> : <span>{item[b]} &gt; </span>}

              <div key={`childTextDiv-${idx}`}>{item[a]}</div>
              <button
                onClick={() => {
                  editBtn(idx, item[a]);
                }}
                key={`childEditBtn-${idx}`}
              >
                수정
              </button>
              {changeBool ? <button onClick={()=>{
                changeFromBtn(item.id,item[a])
                setChangeBool(!changeBool)
              }}>
                위치변경
              </button>:
              <button onClick={()=>{
                changeToBtn(item.id,item[a])
                setChangeBool(!changeBool)

              }}>
                위치확인
              </button>}
            
              <button
                onClick={() => {
                  delBtn(item[a]);
                }}
                key={`childDeleteBtn-${idx}`}
              >
                삭제
              </button>
            </Blank>
          )}
        </Blank>
      ))}
      {children}
    </DisplayBox>
  );
};

export default HelpCategoryDisplayComponent;

const DisplayBox = styled.div`
.title{
  margin-top: 30px;
  font-size: 28px;
  font-weight:bold;
}`;
const Blank = styled.div`
  display: flex;
  background-color : rgb(245,245,245);
  button {
    margin-left: 10px;
  }
`;
