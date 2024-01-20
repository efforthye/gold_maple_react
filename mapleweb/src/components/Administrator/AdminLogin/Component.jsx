import { useState } from "react";
const AdminLoginComponent = ({ isCookie, onClick, tempAdmin, infoSubmit }) => {
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>관리자로그인하기</div>
      {!isCookie ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            infoSubmit(values);
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

          <button type="submit">로그인하기</button>
        </form>
      ) : (
        <>
          {tempAdmin == "정재훈"? (
            <div>"{tempAdmin}" 최고관리자님 어서오세요</div>
          ) : (
            <div>"{tempAdmin}" 관리자님 어서오세요</div>
          )}

          <button
            onClick={() => {
              onClick();
            }}
          >
            로그아웃하기
          </button>
        </>
      )}
    </div>
  );
};

export default AdminLoginComponent;
