import axios from "axios";
import DetailComponent from "./Component";

const DetailContainer = ({categorys, category, route}) =>{
    const reportBoard = (id)=>{
        axios.post("/api/board/reportboard",{id}).then((data)=>{
            alert(data.data);
        })
    }
    const reportComment = (id)=>{
        axios.post("/api/comment/reportcomment",{id}).then((data)=>{
            alert(data.data)
        })
    }
    return (
        <DetailComponent categorys={categorys} category={category} route={route} reportBoard={reportBoard} reportComment={reportComment} />
    );
}

export default DetailContainer;