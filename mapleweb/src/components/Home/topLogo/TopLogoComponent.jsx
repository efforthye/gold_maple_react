import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../Img/goldsaekki-text.png";
const TopLogoComponent = () => {
  return (
    <TopLogo>
      <Link to="/">
        <img src={logo} alt="로고" />
      </Link>
    </TopLogo>
  );
};
export default TopLogoComponent;

const TopLogo = styled.div`
  display: none;
  @media only screen and (max-width: 1150px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: white;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  @media screen and (max-width: 900px) {
    display: flex;
    justify-content: start;
    width: 100%;
    background-color: white;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
  @media screen and (max-width: 550px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: white;
    padding-top: 20px;
    padding-bottom: 100px;
    padding-left: 20px;
    img {
    }
  }
  img {
    width: 150px;
    border-radius: 5px;
  }
`;
