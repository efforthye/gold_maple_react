import React from "react";
import styled from "styled-components";
import catErrorImg from "../src/components/Community/images/mong03b.gif";

export const NotFound = () => {
    return <NotFoundBox>
        <NotFoundImg src={catErrorImg} alt="404페이지"></NotFoundImg>
    </NotFoundBox>;
};

export default NotFound;

const NotFoundBox = styled.div`
    display: flex;
    justify-content: center;
`;
const NotFoundImg = styled.img`

`;
