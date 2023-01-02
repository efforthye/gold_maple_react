import { useState } from "react";
import styled from "styled-components";
import findImg from "../../Img/backimg.png";

const FindPwComponent = ({ findPwfunc, setFindPw, findPw }) => {
  const [findIdData, setFindIdData] = useState("");

  return (
    <div>
      {!findPw ? (
        <FindDiv>
          <FindDivBox>
            <h4>비밀번호를 찾기 위해 본인의 아이디를 입력해주세요.</h4>
            <p>아이디</p>

            <FindDivText>
              <input
                type={"text"}
                placeholder={"아이디를 입력해주세요."}
                value={findIdData}
                onInput={(e) => {
                  setFindIdData(e.target.value);
                }}
              />
              <div>
                <button
                  onClick={() => {
                    findPwfunc(findIdData);
                  }}
                >
                  확인
                </button>
                <button
                  onClick={() => {
                    setFindPw((state) => !state);
                  }}
                >
                  취소
                </button>
              </div>
            </FindDivText>
          </FindDivBox>
        </FindDiv>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FindPwComponent;

const FindDiv = styled.div`
  background-color: rgba(240, 240, 240, 1);
  width: 50vw;
  height: 50vh;
  margin: 25vh 25vw;
  position: absolute;
  border-radius: 20px;
  z-index: 1;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(${findImg});
    opacity: 0.8;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    border-radius: 20px;
    z-index: -1;
  }

  @media only screen and (max-width: 1024px) {
    top: -40px;
    height: 40vh;

    & > div > h4 {
      font-size: 20px;
    }
    & > div > div {
      flex-direction: column;
    }
    & > div > div > input {
      margin: 0;
    }
  }

  @media only screen and (max-width: 802px) {
    & > div > div > input {
      width: 300px;
    }
  }

  @media only screen and (max-width: 768px) {
    top: -60px;
    & > div > h4 {
      font-size: 16px;
    }

    & > div > p {
      font-size: 16px;
    }

    & > div > div > div > button {
      width: 60px;
      height: 30px;
    }
  }

  @media only screen and (max-width: 600px) {
    & > div > div > input {
      width: 200px;
    }
  }

  @media only screen and (max-width: 480px) {
    top: -90px;
    & > div > h4 {
      font-size: 14px;
    }
    & > div > p {
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 410px) {
    & > div > div > input {
      width: 150px;
    }
  }
`;

const FindDivBox = styled.div`
  & > h4 {
    text-align: center;
    margin: 10px 0;
    color: white;
  }

  & > p {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 5px 40px;
    color: white;
  }
`;

const FindDivText = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  & > input {
    width: 400px;
    height: 40px;
    border: none;
    border-radius: 5px;
    margin-left: 40px;
  }

  & div > button {
    width: 80px;
    height: 40px;
    border-radius: 5px;
    border: none;
    margin: 5px;
    background-color: purple;
    color: white;
  }
`;
