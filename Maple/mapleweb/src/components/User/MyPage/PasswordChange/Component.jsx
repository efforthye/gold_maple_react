import { useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PasswordChangeComponent = ({ pwcheck, pwchangeClick, pwRecheck }) => {
  const [changePw, setChangePw] = useState("");
  const [pwchangeCheck, setPwchangeCheck] = useState("");

  const pwMemo = useMemo(() => {
    return pwcheck(changePw);
  }, [changePw]);

  const checkMemo = useMemo(() => {
    return pwRecheck(pwchangeCheck, changePw);
  }, [pwchangeCheck]);
  return (
    <PasswordBox>
      <h5>비밀번호 변경</h5>
      <div className="pw-title">변경 비밀번호</div>
      <input
        type={"password"}
        value={changePw}
        placeholder={"변경하실 비밀번호를 입력해주세요."}
        onInput={(e) => {
          setChangePw(e.target.value);
        }}
      />
      <p className={pwMemo.class}>{pwMemo.text}</p>
      <div className="pw-title">비밀번호확인</div>
      <input
        type={"password"}
        value={pwchangeCheck}
        placeholder={"확인하실 비밀번호를 입력하세요."}
        onInput={(e) => {
          setPwchangeCheck(e.target.value);
        }}
      />
      <p className={checkMemo.class}>{checkMemo.text}</p>
      <PwchangeBtnBox>
        <button
          className="pwchange-btn"
          onClick={() => {
            pwchangeClick(changePw, pwchangeCheck);
          }}
        >
          변경
        </button>
        <Link to={"/mypage"}>
          <button className="pwcancel-btn">취소</button>
        </Link>
      </PwchangeBtnBox>
    </PasswordBox>
  );
};

export default PasswordChangeComponent;

const PasswordBox = styled.div`
  border: 1px solid #5e7bcb;

  .pw-title {
    margin: 10px 0 0 10px;
    font-weight: bold;
  }
  & > h5 {
    margin: 0;
    padding-left: 20px;
    padding-top: 10px;
  }
  & > input {
    width: 300px;
    margin: 10px;
    border: none;
    background-color: lightblue;
    border-radius: 5px;
    height: 50px;

    @media only screen and (max-width: 400px) {
      width: 93%;
    }
  }

  .red {
    color: red;
    text-align: start;
    font-size: 14px;
    margin-left: 10px;
    padding: 0 0 10px 0;
  }

  .green {
    color: green;
    text-align: start;
    font-size: 14px;
    margin-left: 10px;
    padding: 0 0 10px 0;
  }
  & > p {
    margin-left: 10px;
    font-size: 14px;
    padding: 0 0 10px 0;
    margin-bottom: 0;
  }
`;

const PwchangeBtnBox = styled.div`
  padding: 0 0 10px 10px;
  .pwchange-btn {
    width: 100px;
    height: 50px;
    border: none;
    border-radius: 5px;
    background-color: #5e7bcb;
    color: white;
    font-size: 18px;
  }

  .pwcancel-btn {
    width: 100px;
    height: 50px;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
    color: #5e7bcb;
    font-size: 18px;
    margin-left: 5px;
  }

  @media only screen and (max-width: 500px) {
    .pwchange-btn,
    .pwcancel-btn {
      width: 60px;
      height: 40px;
      font-size: 14px;
    }
  }
`;
