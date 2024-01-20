import styled from "styled-components"
import { Link } from "react-router-dom"

const UserReportComponent = ({arr,a,c,d}) =>{
    return <ReportBox><div className="title">신고 된 {a}</div>
    <table><colgroup>
    <col width={"10%"}/>
    <col width={"30%"}/>
    <col width={"30%"}/>
    <col width={"10%"}/>
    </colgroup><thead><tr><th>번호</th>
    <th>작성자</th>
    <th>{a}</th>
    <th>신고횟수</th>
    </tr></thead><tbody>
        {arr.map((item,idx)=>(
            <tr key={`boardArrBox-${idx}`}>
                {item.report==0? <></>:
                <>
                <td key={`boardArrId-${idx}`}>{item.id}</td>
                <td key={`boardArrUserName-${idx}`}>{item.userName}</td>
                <td key={`boardArrTitle-${idx}`}>
                  <Link to={`/Community/board/${item[d]}`}>
                    {item[c]}
                    </Link>
                    </td>
                <td key={`boardArrReport-${idx}`}>{item.report}</td>
                </>
                }
            </tr>
        ))}
        </tbody></table>
        </ReportBox>
}

export default UserReportComponent

const ReportBox = styled.div`
border-top: 1px solid gray;
border-bottom: 1px solid gray;
background-color : rgb(245,245,245);
 margin-top : 10px;
.title {
    font-size: 20px;
    font-weight:bold;
}
table {
    text-align:center;
}
a {
    color:black;
}
`;
