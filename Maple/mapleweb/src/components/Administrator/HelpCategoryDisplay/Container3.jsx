import axios from "axios";
import { useEffect, useState } from "react";
import HelpCategoryDisplayComponent from "./Component";
const CommentArrFun = async (setComment) =>{
  try{
     let commentArr = (await axios.post("/api/admin/reportcomment")).data;
     setComment(commentArr);
  }catch(err){
     console.error(err);
  }
 }
 

const tempArrFun = async (setText) => {
  try {
    let textArr = (await axios.post("/api/admin/addchild"))
      .data;
    setText(textArr);
  } catch (err) {
    console.error(err);
  }
};

const tempChildFun = async (setChildText) => {
  let childArr = (
    await axios.post("/api/admin/displaychild")
  ).data;
  setChildText(childArr);
};

const ThirdContainer = ({ propsArr }) => {
  const [textArr, setText] = useState([]);
  const [childArr, setChildText] = useState([]);
  const [isBool, setBool] = useState(-1);
  const [editText, setEdit] = useState("");
  const [changeToArr,setChangeTo] = useState([]);
  const [changeFromArr,setChangeFrom] =useState([])
  useEffect(() => {
    tempArrFun(setText);
    tempChildFun(setChildText);
  }, []);

  useEffect(()=>{
    tempChildFun(setChildText);

  },[propsArr])

  const textSubmit = (category, text) => {
    if (!category || category=="선택하시오") return alert("카테고리를 선택하세요");
    if (!text) return alert("내용을 입력하세요");
    axios
      .post("/api/admin/addchildtext", {
        category,
        text,
      })
      .then(() => {
        alert("추가되었습니다");
        tempChildFun(setChildText);
      });
  };
  const delBtn = (text) => {
    axios
      .post("/api/admin/delchild", { text })
      .then(() => {
        alert("삭제되었습니다");
        tempChildFun(setChildText);
        
      })
  };
  const editBtn = (idx, text) => {
    if (idx == isBool) {
      setBool(-1);
    } else setBool(idx);
    setEdit(text);
  };
  const editSubmit = (text, id) => {
    if (!text) return setBool(-1);
    setBool(-1);
    axios
      .post("/api/admin/editchild", { text, id })
      .then(() => {
        tempChildFun(setChildText);
      });
  };
  const cancel = () => {
    setBool(-1);
  };
  const changeFromBtn = (id,category) =>{
    setChangeFrom({category,id})
  }
  const changeToBtn = (id,category)=>{
    
    setChangeTo({category,id})
  }
  useEffect(()=>{ 
    

    if(changeToArr){
    if(changeToArr.id){
      axios.post("/api/admin/changethird", {changeFromArr,changeToArr}).then((data)=>{
        alert(data.data);
        tempChildFun(setChildText);

      })
    }}
  },[changeToArr])
  return (
    <HelpCategoryDisplayComponent
      categoryArr={propsArr}
      childArr={childArr}
      isBool={isBool}
      editText={editText}
      textSubmit={textSubmit}
      delBtn={delBtn}
      editBtn={editBtn}
      editSubmit={editSubmit}
      cancel={cancel}
      a="textChild"
      b="textCategory"
      c="text"
      d="텍스트"
      changeToBtn={changeToBtn}
      changeFromBtn={changeFromBtn}
    />
  );
};

export default ThirdContainer;
