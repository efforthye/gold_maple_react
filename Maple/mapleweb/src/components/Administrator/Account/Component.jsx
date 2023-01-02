import styled from "styled-components";
import { useState } from "react";
const AccountComponent = ({ onSubmit, listArr, onClick }) => {
  const [values, setValues] = useState({
    id: "",
    password: "",
    adminName: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AccountBox>
      <div>관리자등록페이지</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(values);
        }}
      >
        <input
          type={"text"}
          name="id"
          placeholder={"아이디"}
          onChange={handleChange}
        ></input>
        <input
          type={"password"}
          name="password"
          placeholder={"비밀번호"}
          onChange={handleChange}
        ></input>
        <input
          type={"text"}
          name="adminName"
          placeholder={"사원이름"}
          onChange={handleChange}
        ></input>
        <button type="submit">관리자등록</button>
      </form>
      <div>관리자리스트</div>
      <table>
        <colgroup>
          <col width={"30%"} />
          <col width={"40%"} />
          <col width={"20%"} />
          <col width={"20%"} />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>관리자이름</th>
            <th>날짜</th>
            <th>삭제버튼</th>
          </tr>
        </thead>
        <tbody>
          {listArr.map((item, idx) => (
            <tr key={`listbox-${idx}`}>
              {item.adminName == "정재훈" ? (
                <></>
              ) : (
                <>
                  <td key={`adminIdx-${idx}`}>{idx}</td>
                  <td key={`adminName-${idx}`}>{item.adminName}</td>
                  <td key={`adminDate-${idx}`}>
                    {item.createdAt.split("T")[0]}
                  </td>
                  <td key={`adminBtn-${idx}`}>
                    <button
                      onClick={() => {
                        onClick(item.id);
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </AccountBox>
  );
};

export default AccountComponent;

const AccountBox = styled.div`
  table{
    width:100%
  }
`;
