import AccountComponent from "./Component";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [listArr, setList] = useState([]);
  const onSubmit = async (value) => {
    if(!value.id.match(/\S/g) || !value.password.match(/\S/g) ||!value.adminName.match(/\S/g))
    return alert("공간채워라잉");
    axios
      .post("/api/admin/regist", value)
      .then(({ data }) => {
        if (data.errors) return alert("중복되었다.");
        tempListFun(setList);
      });
  };

  useEffect(() => {
    tempListFun(setList);
  }, []);

  const onClick = async (idx) => {
    axios.post("/api/admin/delete", { idx }).then(() => {
      alert("삭제됐습니다.");
      tempListFun(setList);
    });
  };

  return (
    <AccountComponent onSubmit={onSubmit} listArr={listArr} onClick={onClick} />
  );
};

export default AccountContainer;
