import { Col, Nav, Row, Tab } from "react-bootstrap";

import styled from "styled-components";
import MessageContainer from "../Message/Container";
import MyRequestContainer from "../MyRequest/Container";
import OnlineContainer from "../Online/Container";
function LeftTabsExample() {
  return (
    <TabsBox>

    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        {" "}
        <Row>
          <Col sm={3} className="tab1">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">온라인상담</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">내 문의내역</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">메세지함</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className="tab2">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div>
                  <OnlineContainer />
                </div>
              </Tab.Pane>
              {document.cookie.split("=")[0] == "admin" ? (
                <></>
              ) : (
                <>
                  {" "}
                  <Tab.Pane eventKey="second">
                    <div>
                      <MyRequestContainer />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <div>
                      <MessageContainer />
                    </div>
                  </Tab.Pane>
                </>
              )}
            </Tab.Content>
          </Col>
        </Row>
    </Tab.Container>
    </TabsBox>

  );
}

export default LeftTabsExample;

const TabsBox = styled.div`
 width:1200px;
 margin:auto;
 margin-top:40px;
 .flex-column{
  width:fit-content;
  flex-direction:row;

  background-color:gray;
  min-width:120px;
 }
 .tab1{
  width:15%;
 }
 .tab2{
  width:85%;
 }

 @media screen and (max-width:1280px){

 }
 @media screen and (max-width:1023px){
  width:100%;
 margin:0px;
 .tab2{
  width:80%;
  text-align:center;
 }

 }
 @media screen and (max-width:768px){

 }
 @media screen and (max-width:480px){

 }
`;
