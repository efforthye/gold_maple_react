import styled from "styled-components";
import catImag from "../imgs/cat_4.png";
import { Link } from "react-router-dom";
const BugReportComponent = ({ isCookie }) => {
  return (
    <BugReportBox>
      <h1>버그악용/불법프로그램 신고</h1>
      <div className="displayBox">
        <div className="imgBox">
          <img src={catImag}></img>
        </div>
        <div className="text">
          <div>
            금쪽이스토리는 [버그악용/불법프로그램 신고 보상 프로그램]을 운영하고
            있습니다.
          </div>
          <div className="text-child">
            깨끗한 금쪽이월드를 위해 힘써주신 용사님들께는 제보의 심각성에 따라
            금쪽이포인트, 게임 아이템 등의 보상을 지급해 드립니다.
          </div>
          <div className="text-child">
            게임에 영향이 큰 문제를 제보할수록 더 좋은 보상이 지급되니 적극적인
            신고 부탁드립니다.
          </div>
          {isCookie ? (
            <Link to={"Create"}>
              <button>버그악용/불법프로그램 신고하러 가기</button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <button>버그악용/불법프로그램 신고하러 가기</button>
            </Link>
          )}
        </div>
      </div>
      <hr />
      <div className="describe">
        <div>신고 참고사항</div>
        <div>
          <ul>
            <li>
              [버그악용/불법프로그램 신고] 결과는 공지사항 게시판으로 안내되며
              개별 답변은 제공되지 않습니다.
            </li>
            <li>
              버그 악용이 아닌 해킹신고, 게임오류 문의 등은 고객센터
              [1:1문의하기]를 이용해주세요.
            </li>
            <li>
              불법프로그램 파일 제보가 아닌 이용자 신고, 욕설/음란대화 신고 등은
              [게임 내 신고하기]를 이용해주세요.
            </li>
          </ul>
        </div>
      </div>

      <hr />
      <div className="describe">
        <div>보상 지급 제외사유</div>
        <div>
          <ul>
            <li>
              신고한 내용을 악용하거나 이득을 얻는 경우 (운영정책에 따라 게임
              이용이 제한될 수 있습니다.)
            </li>
            <li>신고한 내용을 홈페이지나 커뮤니티 게시판에 유포하는 경우</li>
            <li>
              같은 내용을 다른 이용자가 먼저 신고한 경우 (보상은 최초 신고에
              한해 지급됩니다.)
            </li>
            <li>신고한 내용으로 정확한 문제를 파악하기 어려운 경우 등</li>
          </ul>
        </div>
      </div>
      <hr />
    </BugReportBox>
  );
};

export default BugReportComponent;

const BugReportBox = styled.div`
  width: 1200px;
  margin: auto;
  padding: 10px 30px;
 
  .displayBox {
    width: 100% ;
    height: 306px;
    padding: 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 20px solid #d0d0d0;
    margin-bottom: 30px;
  }
  & .imgBox {
    width: 152px;
    & img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }

  button {
    border: none;
    padding: 10px 20px;
    background-color: gray;
    color: white;
    font-size: 1rem;
    font: bold;
    cursor: pointer;
  }
  button:hover {
    background-color: #664e37;
  }
  button:active {
    background-color: #13814c;
  }

  .text {
    color: #646464;
    margin-left: 30px;
    & div:first-child {
      font-size: 1.3rem;
      color: black;
    }

    & div:nth-child(3) {
    }
  }
  .describe {
    display: flex;
    color: #646464;
    align-items: center;
  }

  .describe div:first-child {
    padding: 40px 30px;
    width: 230px;
    font-size: 1.2rem;
    font-weight: bold;
    color: black;
  }
  hr {
    background-color: #646464;
  }
  li {
    list-style-type: disc;
  }
  
@media screen and (max-width:1280px){
  width: 80%;
  .imgBox {
    width:300px;
  }
  .text {
    font-size:1rem;
  }
}

@media screen and (max-width:1023px){
  width:100%;
  .imgBox {
    width:250px;
  }
  .text {
    font-size:0.4rem;
  }
  .text-child {
    display:none;
  }
}
@media screen and (max-width:768px){
  width:100%;
  .imgBox {
    width:200px;
  }
  .text{
    font-size:0.3rem;

  }
  .text div:first-child {
   display: none;
  }
  button {
    font-size:1.3rem;
  }
}
@media screen and (max-width:480px){
  .displayBox{
    flex-direction: column;
    border: none;
    justify-content:center;
    align-items:center
  }
  .imgBox {
    width:150px;
  }
  .text{
    font-size:0.3rem;
    margin-left: 0px;
  }

  .describe{
    flex-direction: column;

  }
  button {
    margin: auto;
    width:150px;
    font-size:0.1rem;
  }
}

}
`;
