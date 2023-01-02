import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BugCSContainer from '../BugCs/Container';
import FirstContainer from '../HelpCategoryDisplay/Container1';
import UserManageContainer from '../UserManage/Container';
import UserReportContainer from '../Report/Container';
import UserReportContainerComment from '../Report/Container1';
import { useSelector } from 'react-redux';
import AccountContainer from '../Account/Container';
function ControlledTabsExample() {
  const [key, setKey] = useState('home');
  const [commentArr,setComment] = useState([])
  const [boardArr,setBoard] = useState([])
  const [reportArr,setReportArr] = useState([])
  const tempAdmin = useSelector((state) => state?.admin);
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
        {tempAdmin.name =="정재훈" ? <Tab eventKey="admin" title="관리자등록">
            <AccountContainer/>
        </Tab>:<></>}
        <Tab eventKey="user" title="유저관리">
        <UserManageContainer setComment={setComment} setBoard={setBoard} setReportArr={setReportArr}/>
        <UserReportContainer boardArr={boardArr} setBoard={setBoard}/>
        <UserReportContainerComment setComment={setComment} commentArr={commentArr}/>
    </Tab>
      <Tab eventKey="report" title="버그리포트게시판">
        <BugCSContainer reportArr={reportArr} setReportArr={setReportArr}/>
      </Tab>
      <Tab eventKey="online" title="온라인상담문의">
      <FirstContainer/>
      </Tab>
    </Tabs>
  );
}

export default ControlledTabsExample;