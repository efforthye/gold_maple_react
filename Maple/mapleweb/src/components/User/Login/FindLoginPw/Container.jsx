import FindPwComponent from "./Component";
import axios from "axios";

const FindPwContainer = ({ findPw, setFindPw }) => {
  const findPwfunc = (findIdData) => {
    axios
      .post("/api/user/findPw", { findId: findIdData })
      .then((data) => {
        if (data.data.message === 504) {
          alert("존재하지 않는 아이디입니다.");
        } else {
          alert(
            `임시비밀번호를 발급해드렸습니다. 비밀번호는 ${data.data.pw}입니다. 로그인 후 꼭 비밀번호를 변경해주세요:)`
          );
        }
      });
  };
  return (
    <FindPwComponent
      findPw={findPw}
      setFindPw={setFindPw}
      findPwfunc={findPwfunc}
    />
  );
};
export default FindPwContainer;
