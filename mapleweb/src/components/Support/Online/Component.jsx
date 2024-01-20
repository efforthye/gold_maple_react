import styled from "styled-components";
import RequestContainer from "./Request/Container";
const OnlineComponent = () => {
  return (
    <OnlineBox>
      <div className="request-box">
        <div className="category-title">문의유형 선택</div>
        <div>
          문의유형을 선택하면 문의유형에 따라 [자주 찾는 도움말]을 확인할 수
          있습니다.
        </div>
        <div>
          찾는 도움말이 보이지 않으면 [도움말 검색]을 이용해 원하는 도움말을
          찾아 주세요.
        </div>
      </div>
      <RequestContainer />
    </OnlineBox>
  );
};

export default OnlineComponent;

const OnlineBox = styled.div`
.request-box{
  margin-bottom:20px;

  
  @media screen and (max-width:1023px){
    width:100%;
    table{
      margin:auto;
    }
    & > div:nth-child(2){
      display:none;
    }
  }
  @media screen and (max-width:800px){
    & > div:nth-child(3){
      display:none;
    }
    .category-title{
      margin-bottom:100px;
    }
  }
  @media screen and (max-width:540px){
    margin-left:20px;
   
  }
  @media screen and (max-width:435px){
    margin-left:45px;
    
  } 

}
`;
