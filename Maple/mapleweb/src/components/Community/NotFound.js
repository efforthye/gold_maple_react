import React, { useEffect } from "react";
import styled from "styled-components";
import catErrorImg from "./images/mong03b.gif";

export const NotFound = () => {

    useEffect(() => {
        window.scrollTo({ left: 0, top: 270, behavior: "smooth" });
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }, []);

    return <NotFoundBox>

        <NotFoundImg src={catErrorImg} alt="404페이지" onClick={()=>{
            window.location.href = "../";
        }}></NotFoundImg>

    </NotFoundBox>;
};

export default NotFound;

const NotFoundBox = styled.div`
    text-align: center;
    text-shadow: -1.5px 0 #000, 0 1.5px #000, 1.5px 0 #000, 0 -1.5px #000;
    color: #C9D1D9;
    cursor: pointer;
`;
const NotFoundImg = styled.img`
    cursor: pointer;
    width: 810px;
    margin-top: 117px;
`;
