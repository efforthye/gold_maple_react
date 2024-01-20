import AccountComponent from "./Component";
import { useState, useEffect } from "react";
import axios from "axios";

// 관리자 목록 요청 함수
const tempListFun = async (setList) => {
  try {
    let listArr = (await axios.post("/api/admin/list"))
      .data;
    setList(listArr);
  } catch (err) {
    console.error(err);
  }
};

const AccountContainer = () => {

  // 관리자 목록
  const [listArr, setList] = useState([]);

  // 관리자 등록, DB 연동
  const onSubmit = async (value) => {
    if (!value.id.match(/\S/g) || !value.password.match(/\S/g) || !value.adminName.match(/\S/g))
      return alert("공간채워라잉");
    axios
      .post("/api/admin/regist", value)
      .then(({ data }) => {
        if (data.errors) return alert("중복되었다.");
        tempListFun(setList);
      });
  };

  // 관리자 목록 출력
  useEffect(() => {
    tempListFun(setList);
  }, []);

  // 관리자 목록 삭제
  const onClick = async (idx) => {
    axios.post("/api/admin/delete", { idx }).then(() => {
      alert("삭제됐습니다.");
      tempListFun(setList);
    });
  };

  // 컴포넌트
  return (
    <AccountComponent onSubmit={onSubmit} listArr={listArr} onClick={onClick} />
  );
};

export default AccountContainer;
