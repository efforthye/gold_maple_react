import styled from "styled-components";
import { Link } from "react-router-dom";

const UserOutComponent = ({ signOutBtn }) => {
  return (
    <UserOutBox>
      <p className="alert-msg">
        <span>회원 탈퇴 후 복구가 불가능하니 </span>
        <span>신중하게 결정하시기 바랍니다.</span>
      </p>
      <UserOutBtnBox>
        <button
          onClick={() => {
            signOutBtn();
          }}
        >
          회원 탈퇴
        </button>
        <Link to={"/mypage"}>
          <button>취소</button>
        </Link>
      </UserOutBtnBox>
    </UserOutBox>
  );
};

export default UserOutComponent;

const UserOutBox = styled.div`
  border: 1px solid #5e7bcb;
  .alert-msg {
    font-size: 20px;
    font-weight: 600;
    color: black;
    display: flex;
    justify-content: center;
  }

  @media only screen and (max-width: 680px) {
    .alert-msg {
      font-size: 1.3rem;
    }
  }
  @media only screen and (max-width: 590px) {
    .alert-msg {
      font-size: 1.1rem;
    }
  }
  @media only screen and (max-width: 500px) {
    .alert-msg {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const UserOutBtnBox = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  & button:first-child {
    width: 150px;
    height: 50px;
    border: none;
    border-radius: 5px;
    background-color: #5e7bcb;
    color: white;
    font-size: 18px;
  }

  & button:last-child {
    width: 150px;
    height: 50px;
    margin-left: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
    color: #5e7bcb;
  }

  @media only screen and (max-width: 590px) {
    & > button:first-child,
    button:last-child {
      width: 100px;
      height: 40px;
      font-size: 16px;
    }
  }
`;
