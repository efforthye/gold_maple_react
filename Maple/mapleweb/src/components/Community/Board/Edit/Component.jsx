
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useEffect,  useState } from "react";
import { CATEGORY, WORLDLIST } from "../../../../modules/community";

import axios from "axios";
import { useSelector } from "react-redux";


const EditComponent = ({ contentsValue }) => {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 270, behavior: "smooth" });
  }, []);

  const userWorld = useSelector((state) => state.user.currServerName);
  const userName = useSelector((state) => state.user.currUserName);

  const boardNum = useSelector((state) => state.community.board[0].id);
  const boardTitle = useSelector((state) => state.community.board[0].title);
  const boardContents = useSelector((state) => state.community.board[0].contents);
  const boardTags = useSelector((state) => state.community.board[0].tags);
  const category = useSelector((state) => state.community.board[0].category);

  let route = "";

  CATEGORY.map((item, idx) => {
    if (item.name == category) {
      route = item.label;
    }
  });

  const [titleText, setTitleText] = useState(boardTitle);
  const [contentData, setContentData] = useState(contentsValue);
  const [tags, setTags] = useState(boardTags);
  const [selected, setSelected] = useState(userWorld);
  const handleSelect = (e) => {
    setSelected(e?.target?.value);
  };

  if (!userName) {
    alert("유저 정보가 없습니다.");
    navigate("/");
    return;
  }



  return (

    <>
      <CategoryTitle>{category}</CategoryTitle>

      <ContentBox>
        <TitleWrap>
          <CategorySelector name='serverName' onChange={handleSelect} value={selected}>
            {WORLDLIST.map((item, idx) => {
              if (idx === 0) return null;
              return <option key={`world-${idx}`} value={`${item.name}`}>{item.name}</option>
            })}
          </CategorySelector>

          <TitleInput type={'text'} placeholder={"제목을 입력해주세요."} value={titleText} onInput={(e) => {
            setTitleText(e.target.value);
          }} />

        </TitleWrap>

        <CKEditor
          editor={ClassicEditor}
          data={boardContents}
          onReady={(editor) => {
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContentData(data);
          }}
          onBlur={(event, editor) => {
          }}
          onFocus={(event, editor) => {
          }}
        >

        </CKEditor>
        <TagWrap>
          <TagSpan>태그 달기</TagSpan>
          <TagInput type={"text"} value={tags} placeholder={"태그와 태그는 #으로 구분하며, 10개까지 입력하실 수 있습니다."} onInput={(e) => {
            setTags(e.target.value)
          }}></TagInput>
        </TagWrap>

        <ButtonBox>
          <Link to={`/Community/${route}`}>
            <CancelBtn href={`/Community/${route}`} className="btn03_g">취소</CancelBtn>
          </Link>

          <RegistBtn className="btn03_g" onClick={async (e) => {
            if (!titleText.match(/\S/g)) return alert("제목을 입력해주세요.");
            const update = await axios.post("/api/board/update", {
              title: titleText,
              world: selected,
              tags: tags,
              contents: contentData,
              boardId: boardNum,
            });

            switch (update.data.status) {
              case 200:
                alert("게시글 수정됨");
                navigate(`/Community/board/${boardNum}`);
                return;
              case 400:
                alert("게시글 수정 에러");
                return;
              case 401:
                alert("유저 정보가 없습니다.");
                return;
              default:
                break;
            }

          }}>등록</RegistBtn>
        </ButtonBox>


      </ContentBox>
    </>
  );

};

export default EditComponent;

const ContentBox = styled.div`
  & > div {
    float: left;
  }
  & input:focus,
  & div:focus {
    outline: none;
  }
  & .ck-content {
    height: 560px;
    @media all and (max-width: 479px) {
      height : 400px;
    }
  }
  & .ck-rounded-corners {
    width: 100%;
  }
  & .ck-editor__editable {
    padding: 0 15px;
  }
  & .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
    border: 1px solid #ccced1;
  }
  @media screen and (max-width: 1280px) {
    width: 700px;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 620px;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 650px;
  }
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 440px;
    margin: 0 auto;
  }
  @media all and (max-width: 479px) {
    width: 310px;
    margin-left: 20px;
  }

`;

const TitleWrap = styled.div`
  height: 50px;
  float: left;
  width: 100%;
  border-bottom: none;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #f9f9f9;
  border: none;
  border-top: 1px solid #7e7e7e;
  @media all and (max-width: 479px) {
    padding : 0 10px;
  }

`;
const CategorySelector = styled.select`
  font-size: 13px;
  height: 32px;
  padding: 0 42px 0 20px;
  margin-right: 10px;
  border: 1px solid #ccced1;
  cursor: pointer;
  @media all and (max-width: 479px) {
    margin-right: 5px;
    padding: 0 0 0 5px;
  }

`;
const TitleInput = styled.input`
  height: 32px;
  width: 730px;
  padding: 0 10px;
  font-size: 15px;
  border: 1px solid #ccced1;
  @media all and (max-width: 479px) {
    width: 310px;
    padding: 0 10px;
  }
`;

const CategoryTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin-top: 60px;
  font-weight: 600;
  width: 100%;
  float: left;
  height: 40px;
  margin-bottom: 80px;
  cursor: default;
`;

const TagWrap = styled.div`
  border: 1px solid #ccced1;
  height: 50px;
  float: left;
  width: 100%;
  border-top: none;
  display: flex;
  align-items: center;
`;
const TagSpan = styled.span`
  line-height: 50px;
  float: left;
  margin-left: 27px;
  font-size: 15px;
  color: #333;
  padding-right: 21px;
  background: url(https://ssl.nexon.com/s2/game/maplestory/renewal/common/tag_title_bg.png)
    right 17px no-repeat;

  @media screen and (max-width: 1280px) {
    white-space: nowrap;
  }
  @media all and (max-width: 479px) {
    width: 140px;
    margin-left: 12px;
    font-size: 10px;
    padding-right: 0px;
  }

`;
const TagInput = styled.input`
  margin-left: 20px;
  height: 32px;
  width: 760px;
  border-radius: 0;
  border: 1px solid #ccced1;
  font-size: 15px;
  padding: 0 10px;

  @media screen and (max-width: 1280px) {
    margin-right: 15px;
  }
  @media all and (max-width: 479px) {
    margin: 0 5px;
    font-size: 12px;
    padding-right: 0px;
    margin-right: 5px;
  }
  
`;

const ButtonBox = styled.div`
  width: 100%;
  float: left;
  margin: 16px 0;
  display: flex;
  justify-content: center;
`;
const CancelBtn = styled.span`
  min-width: 53px;
  font-size: 15px;
  color: #fff;
  text-align: center;
  background-color: #747a86;
  border-radius: 2px;
  padding: 12px 24px;
  border: 1px solid #747a86;
  display: inline-block;
  line-height: 1;
  margin: 0 5px;
  &:hover {
    color: white;
    background-color: #636872;
  }
`;
const RegistBtn = styled.span`
  min-width: 53px;
  font-size: 15px;
  color: #fff;
  text-align: center;
  background-color: #da63a6;
  border-radius: 2px;
  padding: 12px 24px;
  display: inline-block;
  line-height: 1;
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #ca5196;
  }
`;
