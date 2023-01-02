import axios from "axios";
import { useEffect} from "react"
import UserReportComponent from "./Component"

const CommentArrFun = async (setComment) =>{
 try{
    let commentArr = (await axios.post("/api/admin/reportcomment")).data;
    setComment(commentArr);
 }catch(err){
    console.error(err);
 }
}


const UserReportContainerComment=({commentArr,setComment})=>{

    useEffect(()=>{CommentArrFun(setComment)},[])
    useEffect(()=>{CommentArrFun(setComment)},[])
    return <UserReportComponent arr={commentArr} a="댓글" c="text" d="boardId"/>
}

export default UserReportContainerComment
