import FindLoginComponent from "./Component";
import axios from "axios";
import { useState } from "react";

const FindLoginContainer = ({ findId, setFindId }) => {
  const [finded, setFinded] = useState("");
  const findIdfunc = (findNickname) => {
    axios
      .post("/api/user/findId", { nickName: findNickname })
      .then((data) => {
        if (!data.data.userId) {
          alert("닉네임에 맞는 아이디가 없습니다.");
          setFinded("");
        }
        setFinded(data.data.userId);
      });
  };
  return (
    <FindLoginComponent
      findIdfunc={findIdfunc}
      finded={finded}
      findId={findId}
      setFindId={setFindId}
    />
  );
};
export default FindLoginContainer;
