import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { Link } from "react-router-dom";
const CreateComponent = ({ onClick }) => {
  const [reportTitle, setTitle] = useState("");
  const [reportSelect, setSelect] = useState("program");
  const [imgFile, setImgFile] = useState(null);
  const [contentsText, setContentsText] = useState(
    "<p><불법프로그램 신고><div>&nbsp;</div>1. 어떤 불법프로그램인가요? 이 불법프로그램을 사용하면 어떻게 되나요?<p>&nbsp;</p>2. 이 불법프로그램을 언제, 어디서 얻게 됐나요? 인터넷으로 얻었다면 그 사이트는 어디인가요?<p>&nbsp;</p> 3. 가지고 있는 불법프로그램은 첨부 '파일첨부' 기능을 사용해서 추가해주세요.<p>&nbsp;</p> </p>"
  );
  return (
    <>
      <CreateBox>
        <div>
          <h1>버그악용/불법프로그램 신고</h1>
        </div>
        <form id="submit-form" encType="multipart/form-data">
          <div>
            {" "}
            <span className="span-text">신고종류</span>
            <span>
              <select
                value={reportSelect}
                name={"reportSelect"}
                onChange={(e) => {
                  setSelect(e.target.value);
                }}
              >
                <option value="program">불법프로그램 신고</option>
                <option value="bug">버그악용 신고하기</option>
              </select>
              <input
                className="inputTitle"
                type={"text"}
                name={"reportTitle"}
                value={reportTitle}
                onInput={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="35자 이내로 입력해 주세요."
              />
            </span>
          </div>
          <span className="span-text">첨부파일</span>
          <input
            name="reportFile"
            type="file"
            onChange={(e) => {
              setImgFile(e.target.files);
            }}
          ></input>

          <div>
            <CKEditor
              editor={ClassicEditor}
              data={contentsText}
              onReady={(editor) => {
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContentsText(data.trim());
              }}
              onBlur={(event, editor) => {
              }}
              onFocus={(event, editor) => {
              }}
            ></CKEditor>
          </div>
          <hr />
          <div className="describe">
            <div>참고해주세요!</div>
            <div>
              <ul>
                <li>
                  메이플스토리와 함께 사용해도 된다고 공식 안내하지 않았지만
                  함께 사용했을 때 게임에 영향을 주는 모든 프로그램에 대해서
                  제보 부탁 드립니다.
                  <ul>
                    <li className="dash">
                      자동으로 사냥/장사/채팅/이동/아이템 수집/이벤트 참여 등을
                      하는 프로그램
                    </li>
                    <li className="dash">
                      {" "}
                      한 pc에서 게임을 여러 개 실행시키거나, 지원하지 않는
                      해상도나 옵션을 사용할 수 있게 하는 프로그램
                    </li>
                    <li className="dash">
                      메이플스토리의 데이터를 수집하거나 변조하는 프로그램
                    </li>
                    <li className="dash">
                      자동으로 로그인/로그아웃을 하거나, 캐릭터 이름을 선점하는
                      프로그램 등
                    </li>
                  </ul>
                </li>
                <li>
                  불법프로그램신고로 제보하실 때에는 불법프로그램을 어떻게
                  얻었고, 어떤 효과를 얻는 지 알 수 있도록 구체적인 내용을 적어
                  신고합니다.
                </li>
                <li>
                  불법프로그램 파일은 반드시 압축해서 첨부해주시기
                  바랍니다.(첨부 가능한 파일 확장자는 zip, alz, egg, 7z,
                  rar입니다.)
                </li>
                <li>
                  파일의 용량이 크다면 분할압축을 해서 모든 파일을 첨부할 수
                  있을 때까지 여러 번 신고해 주시기 바랍니다.
                </li>
              </ul>
            </div>
          </div>

          <hr />
          <div className="selectBtn">
            <button
              onClick={(e) => {
                e.preventDefault();
                onClick(reportTitle, reportSelect, imgFile, contentsText);
              }}
            >
              확인
            </button>
            <Link to={"/Support/BugReport"}>
              <button>취소</button>
            </Link>
          </div>
        </form>
      </CreateBox>
    </>
  );
};

export default CreateComponent;

const CreateBox = styled.div`
  width: 1200px;
  margin: auto;
  padding: 10px 30px;
  .describe {
    display: flex;
    color: #646464;
    align-items: center;
  }
  .ck.ck-editor {
    width: 90%;
    margin: auto;
  }
  form {
  }
  select {
    padding: 2px 0px;
  }

  .inputTitle {
    margin-left: 10px;
    width: 75%;
  }

  .describe div:first-child {
    padding: 40px 30px;
    width: 250px;
    font-size: 18px;
    font-weight: bold;
    color: black;
    text-align: center;
  }
  li {
    font-size: 12px;
    list-style-type: disc;
  }
  .dash {
    list-style-type: "- ";
  }
  hr {
    background-color: #646464;
  }
  .selectBtn {
    display: flex;
    justify-content: end;
    & button {
      background-color: #42f59e;
      padding: 8px 25px;
      color: white;
      border: none;
    }
    & button:hover {
      background-color: #13814c;
    }
  }

  .selectBtn a {
    color: white;
    border: none;

    &:last-child button {
      margin-left: 10px;

      background-color: #664e37;
      padding: 8px 25px;
      color: white;
      border: none;
    }
    &:last-child:hover button {
    }
  }

  @media screen and (max-width:1280px){
    width:80%;
    .span-text {
      display:none;
    }
    .ck.ck-editor {
      width: 100%;
    }
    form > div:first-child select{
      width:20%;
    }
    form > div:first-child input{
      width:78%;
    }
  }
  @media screen and (max-width:1023px){

  }
  @media screen and (max-width:768px){
    width:90%;
    form > div:first-child input{
      margin-left:0;
    }
  }
  @media screen and (max-width:480px){
    .describe{
    flex-direction: column;
    }
  }

`;
