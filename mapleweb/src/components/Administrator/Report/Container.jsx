import axios from "axios";
import { useEffect } from "react"
import UserReportComponent from "./Component"

const BoardArrFun = async (setBoard) =>{
 try{
    let boardArr = (await axios.post("/api/admin/reportboard")).data;
    setBoard(boardArr);
 }catch(err){
    console.error(err);
 }
}

const UserReportContainer=({boardArr,setBoard})=>{
    useEffect(()=>{BoardArrFun(setBoard)},[])
    return <UserReportComponent arr={boardArr} a="게시글" c="title" d="id"/>
}

export default UserReportContainer

