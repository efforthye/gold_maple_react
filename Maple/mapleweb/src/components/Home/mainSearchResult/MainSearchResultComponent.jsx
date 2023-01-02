import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { action } from "../../../modules/search";

import exclamationIcon from "../Img/main_search_noneResult.png";

const MainSearchResultComponent = ({
  research,
  setResearch,
  researchType,
  researchData,
  setResearchType,
  setResearchData,
  dispatch,
  searchType,
  searchData,
  searchResultData,
  reGetSearchList,
}) => {
  const [searchDropdown, setSearchDropdown] = useState("false");
  const toggleSearchDropdown = () => {
    setSearchDropdown((state) => !state);
  };
  const searchTypeList = ["제목", "작성자", "태그"];

  useEffect(() => {
  }, [searchResultData]);

  const searchTypeRedux = useSelector((state) => state.search.searchType);
  const searchDataRedux = useSelector((state) => state.search.searchData);
  const [searchType2, setSearchType2] = useState(searchTypeRedux || searchType);
  const [searchData2, setSearchDate] = useState(searchDataRedux || searchData);
  useEffect(() => {
    setSearchType2(searchTypeRedux);
    setSearchDate(searchDataRedux);
  }, [research]);

  return (
    <MainSearchResult>
      <div className="mainSearchResult_innerBox">
        <div className="mainSearchResult_innerBox_researchBox">
          <div className="mainSearchResult_innerBox_research">
            <div className="mainSearchResult_innerBox_research_selectType">
              <div
                className="mainSearchResult_innerBox_research_selectType_title"
                onClick={() => {
                  toggleSearchDropdown();
                }}
              >
                <span></span> {researchType}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="20px"
                  height="20px"
                >
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </div>
              <div
                className={`mainSearchResult_innerBox_research_selectType_items ${
                  searchDropdown ? "off" : "on"
                }`}
              >
                {searchTypeList.map((item, index) => {
                  return (
                    <div
                      className="mainSearchResult_innerBox_research_selectType_item"
                      key={`mainSearchResult_innerBox_research_selectType_item_${index}`}
                      onClick={() => {
                        toggleSearchDropdown();
                        setResearchType(item);
                      }}
                    >
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mainSearchResult_innerBox_research_inputBox_cover">
              <div className="mainSearchResult_innerBox_research_inputBox">
                <input
                  type="text"
                  className="mainSearchResult_innerBox_research_inputBox_input"
                  onInput={(e) => {
                    setResearchData(e.target.value);
                  }}
                  onKeyUp={() => {
                    if (window.event.keyCode == 13) {
                      if (researchData.match(/\S/g)) {
                        setResearch((state) => !state);
                        dispatch(action.search(researchType, researchData));
                        return;
                      } else {
                        alert("검색어를 입력하세요");
                      }
                    }
                  }}
                />
                <div
                  className="mainSearchResult_innerBox_research_inputBox_img"
                  onClick={() => {
                    if (researchData.match(/\S/g)) {
                      setResearch((state) => !state);
                      dispatch(action.search(researchType, researchData));
                      return;
                    } else {
                      alert("검색어를 입력하세요");
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="20px"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainSearchResult_innerBox_summaryBox">
          '<span>{searchType2}</span>'(으)로 '<span>{searchData2}</span>' 검색한
          결과입니다.
        </div>
        <table className="mainSearchResult_innerBox_resultTable">
          <tbody>
            <tr>
              <td>커뮤니티</td>
              <td>
                {searchResultData.length == 0 ? (
                  <div className="mainSearchResult_innerBox_resultTable_noneResult">
                    <img src={exclamationIcon} alt="!" />
                    검색된 글이 없습니다.
                  </div>
                ) : searchResultData != undefined ? (
                  <>
                    {searchResultData?.map((item, index) => {
                      return item.category == "금쪽이아트" ? (
                        <div>
                          <div></div>
                          <div></div>
                        </div>
                      ) : (
                        <div
                          className="mainSearchResult_innerBox_resultTable_textBoard"
                          key={`mainSearchResult_innerBox_resultTable_textBoard_${index}`}
                        >
                          <div className="mainSearchResult_innerBox_resultTable_title">
                            <span className="mainSearchResult_innerBox_resultTable_title_category">
                              [{item.category}]
                            </span>
                            <span className="mainSearchResult_innerBox_resultTable_title_world">
                              [{item.world}]
                            </span>
                            <Link to={`/Community/board/${item.id}`}>
                              <span>{item.title}</span>
                            </Link>
                            <span className="mainSearchResult_innerBox_resultTable_title_userName">
                              {item.userName}
                            </span>
                            <span className="mainSearchResult_innerBox_resultTable_title_createdAt">
                              {item.createdAt}
                            </span>
                          </div>
                          <div className="mainSearchResult_innerBox_resultTable_content">
                            <Link to={`/Community/board/${item.id}`}>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: item.contents,
                                }}
                              ></span>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
                <div></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainSearchResult>
  );
};
export default MainSearchResultComponent;

const MainSearchResult = styled.div`
  display: flex;
  justify-content: center;

  .mainSearchResult_innerBox {
    width: 1200px;

    @media only screen and (max-width: 500px) {
      width: 100%;
    }
    @media only screen and (max-width: 1280px) {
      padding-left: 20px;
      padding-right: 20px;
    }
    .mainSearchResult_innerBox_research {
      display: flex;
      justify-content: end;
      padding-top: 80px;
      padding-bottom: 50px;
      width: 100%;

      .mainSearchResult_innerBox_research_selectType {
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;

        .mainSearchResult_innerBox_research_selectType_title {
          background-color: white;
          border: 1px solid #e3e3e3;
          text-align: center;
          font-size: 13px;
          padding-top: 10px;
          padding-bottom: 10px;
          display: flex;
          justify-content: space-between;

          svg {
            padding-right: 10px;
          }
        }

        .mainSearchResult_innerBox_research_selectType_items {
          position: absolute;
          display: none;
          background-color: white;
          width: 100%;
          bottom: -84px;
          border: 1px solid gainsboro;

          div {
            padding-top: 5px;
            padding-bottom: 5px;
            display: flex;
            justify-content: center;
            inSearch_innerBox_selectType_item:nth-child(3) {
              border-top: 1px solid #474a51;
            }
          }
          span {
            padding-left: 5px;
            padding-right: 5px;
            font-size: 12px;
            line-height: 20px;
          }
        }
      }
      .mainSearchResult_innerBox_research_selectType_items.on {
        display: block;
        overflow: auto;
      }
    }

    .mainSearchResult_innerBox_research_inputBox_cover {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .mainSearchResult_innerBox_research_inputBox {
        display: flex;
        background-color: rgb(255, 255, 255);
        border: 1px solid gainsboro;
        font-size: 13px;
        padding-top: 10px;
        padding-bottom: 10px;

        @media only screen and (max-width: 1024px) {
          width: 100%;
        }

        @media only screen and (min-width: 1024px) {
          width: 200px;
        }

        .mainSearchResult_innerBox_research_inputBox_input {
          margin-left: 10px;
          background-color: transparent;
          border: none;
          color: #222;
          outline: none;
        }

        .mainSearchResult_innerBox_research_inputBox_img {
          cursor: pointer;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
    .mainSearchResult_innerBox_summaryBox {
      display: flex;
      background-color: #f7f7f7;
      text-align: center;
      padding-top: 25px;
      padding-bottom: 25px;
      border-top: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      justify-content: center;

      margin-bottom: 40px;

      span {
        color: #ca5196;
      }
    }

    .mainSearchResult_innerBox_resultTable {
      border-top: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      width: 100%;
      margin-bottom: 50px;

      @media only screen and (max-width: 1024px) {
        padding-left: 20px;
        padding-right: 20px;
      }

      td:first-child {
        width: 20%;
        background-color: #f7f7f7;
        border-right: 1px solid #e3e3e3;
        border-bottom: 1px solid #e3e3e3;
        padding-left: 30px;
        padding-right: 30px;
        white-space: nowrap;
      }
      td:last-child {
        width: 80%;
        border-bottom: 1px solid #e3e3e3;
        padding: 40px;

        .mainSearchResult_innerBox_resultTable_noneResult {
          color: #888;
          display: flex;
          justify-content: center;

          img {
            width: 24px;
            height: 24px;
          }
        }

        .mainSearchResult_innerBox_resultTable_textBoard {
          margin-bottom: 10px;

          .mainSearchResult_innerBox_resultTable_title {
            font-size: 14px;

            .mainSearchResult_innerBox_resultTable_title_category {
              color: #ca5196;
              margin-right: 7px;
              white-space: nowrap;
            }
            .mainSearchResult_innerBox_resultTable_title_world {
              color: #ca5196;
              margin-right: 7px;
              white-space: nowrap;
            }
            a {
              margin-right: 7px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              max-width: 460px;

              span {
                color: #333;
              }
            }
            .mainSearchResult_innerBox_resultTable_title_userName {
              margin-right: 7px;
              font-size: 12px;
              color: #888888;
              white-space: nowrap;
            }
            .mainSearchResult_innerBox_resultTable_title_createdAt {
              font-size: 12px;
              color: #888888;
              white-space: nowrap;
            }
          }
          .mainSearchResult_innerBox_resultTable_content {
            width: 100%;

            span {
              max-width: 100%;
              color: #828282;
              font-size: 13px;

              p {
                max-height: 63px;
                line-height: 21px;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
`;
