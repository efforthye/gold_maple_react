import styled from "styled-components";
import communityBackground from "../Img/main_community_background.jpg";
import CommunityComponet from "../../Community";
import RankComponent from "../../Ranking";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const MainCommunityComponent = ({
  communityNewestPost,
  totalData,
  totalRanking,
}) => {
  useEffect(() => {
    totalRanking();
  }, []);
  return (
    <MainCommunityBox img={communityBackground}>
      <div className="mainCommunity_innerBox">
        <div className="mainCommunity_innerBox_community">
          <div className="mainCommunity_innerBox_community_title">
            <h1 className="mainCommunity_innerBox_community_intro">
              <span>금쪽이스토리</span> <span>커뮤니티</span>
              <Link to="/Community/Free" element={<CommunityComponet />}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="30px"
                  className="communityPlusSVG"
                >
                  <path d="M200 344V280H136C122.7 280 112 269.3 112 256C112 242.7 122.7 232 136 232H200V168C200 154.7 210.7 144 224 144C237.3 144 248 154.7 248 168V232H312C325.3 232 336 242.7 336 256C336 269.3 325.3 280 312 280H248V344C248 357.3 237.3 368 224 368C210.7 368 200 357.3 200 344zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z" />
                </svg>
              </Link>
            </h1>
          </div>
          <div className="mainCommunity_innerBox_community_list">
            {communityNewestPost.map((item, index) => {
              return (
                <div
                  className="mainCommunity_innerBox_community_item_cover"
                  key={`mainCommunity_innerBox_community_item_cover_${index}`}
                >
                  <div
                    className={`mainCommunity_innerBox_community_item`}
                    key={`communityLi${index}`}
                  >
                    <div
                      className={"mainCommunity_innerBox_community_item_top"}
                    >
                      <div
                        className={
                          "mainCommunity_innerBox_community_item_top_innerBox"
                        }
                      >
                        <div
                          className={
                            "mainCommunity_innerBox_community_item_top_innerBox_category"
                          }
                        >
                          [{item?.category}]
                        </div>
                        <Link
                          to={`/Community/board/${item?.id}`}
                          element={<CommunityComponet />}
                        >
                          <div
                            className={
                              "mainCommunity_innerBox_community_item_top_innerBox_title"
                            }
                          >
                            {item?.title}
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div
                      className={"mainCommunity_innerBox_community_item_mid"}
                    >
                      <div
                        className={
                          "mainCommunity_innerBox_community_item_mid_innerBox"
                        }
                      >
                        <div
                          className={
                            "mainCommunity_innerBox_community_item_mid_innerBox_contents"
                          }
                        >
                          <Link
                            to={`/Community/board/${item?.id}`}
                            element={<CommunityComponet />}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item?.contents,
                              }}
                            ></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div
                      className={"mainCommunity_innerBox_community_item_bottom"}
                    >
                      <div
                        className={
                          "mainCommunity_innerBox_community_item_bottom_innerBox"
                        }
                      >
                        <span
                          className={
                            "mainCommunity_innerBox_community_item_bottom_innerBox_userName"
                          }
                        >
                          {item?.userName}
                        </span>
                        <span
                          className={
                            "mainCommunity_innerBox_community_item_bottom_innerBox_createdAt"
                          }
                        >
                          {item?.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mainCommunity_innerBox_ranking">
          <div className="mainCommunity_innerBox_ranking_title">
            <h1 className="mainCommunity_innerBox_ranking_intro">
              금쪽이 랭커
              <Link to="/Ranking/" element={<RankComponent />}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="30px"
                  className="rankingPlusSVG"
                >
                  <path d="M200 344V280H136C122.7 280 112 269.3 112 256C112 242.7 122.7 232 136 232H200V168C200 154.7 210.7 144 224 144C237.3 144 248 154.7 248 168V232H312C325.3 232 336 242.7 336 256C336 269.3 325.3 280 312 280H248V344C248 357.3 237.3 368 224 368C210.7 368 200 357.3 200 344zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z" />
                </svg>
              </Link>
            </h1>
          </div>
          <div className="mainCommunity_innerBox_ranking_ranking">
            <div className="mainCommunity_innerBox_ranking_ranking_1">1</div>
            <div className="mainCommunity_innerBox_ranking_ranking_2">2</div>
            <div className="mainCommunity_innerBox_ranking_ranking_3">3</div>
            <div className="mainCommunity_innerBox_ranking_ranking_4">4</div>
            <div className="mainCommunity_innerBox_ranking_ranking_5">5</div>
          </div>
          <div className="mainCommunity_innerBox_ranking_avatar">
            {totalData?.map((item, index) => {
              return (
                <div
                  className={`mainCommunity_innerBox_ranking_avatar_${
                    index + 1
                  }`}
                  key={`mainCommunity_innerBox_ranking_avatar_${index + 1}`}
                >
                  <Link to="/Ranking" element={<RankComponent />}>
                    <img
                      src={`/api/download${item.profileImg}`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="mainCommunity_innerBox_ranking_userName">
            {totalData?.map((item, index) => {
              return (
                <div
                  className={`mainCommunity_innerBox_ranking_userName_${
                    index + 1
                  }`}
                  key={`mainCommunity_innerBox_ranking_userName_${index + 1}`}
                >
                  <Link to="/Ranking" element={<RankComponent />}>
                    {item.tempUserName}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainCommunityBox>
  );
};

export default MainCommunityComponent;

const MainCommunityBox = styled.div`
  @media only screen and (min-width: 1025px) {
    background-image: url(${(props) => props.img});
    height: 1056px;
  }
  @media only screen and (max-width: 1024px) {
    background-color: #eee;
  }
  background-position: center;

  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  @media only screen and (min-width: 1024px) {
    padding-top: 100px;
  }
  @media only screen and (max-width: 1024px) {
    padding-top: 20px;
  }

  .mainCommunity_innerBox {
    @media only screen and (min-width: 1024px) {
      width: 1200px;
    }

    @media only screen and (max-width: 1024px) {
      width: 100%;
    }

    .mainCommunity_innerBox_community {
      @media only screen and (min-width: 1024px) {
        margin-bottom: 90px;
      }

      @media only screen and (max-width: 1024px) {
        margin-bottom: 30px;
      }

      .mainCommunity_innerBox_community_title {
        margin-bottom: 40px;

        .mainCommunity_innerBox_community_intro {
          text-align: center;
          font-weight: lighter;
          font-size: 40px;
          text-align: center;
          position: relative;

          span {
            white-space: nowrap;
          }
          @media only screen and (min-width: 1024px) {
            color: white;
          }
          @media only screen and (max-width: 1024px) {
            color: #222;
          }
        }
      }
      .mainCommunity_innerBox_community_list {
        @media only screen and (min-width: 1024px) {
          display: flex;
          justify-content: center;
        }

        @media only screen and (max-width: 1024px) {
          display: block;
        }

        .mainCommunity_innerBox_community_item_cover {
          @media only screen and (min-width: 1024px) {
            display: flex;
            width: 25%;
            padding-left: 10px;
            padding-right: 10px;
            justify-content: center;
          }

          @media only screen and (max-width: 1024px) {
            display: flex;
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
            justify-content: center;
          }
        }
        .mainCommunity_innerBox_community_item {
          background-color: white;
          border-radius: 5px;

          height: 370px;
          margin-right: 28px;
          padding-top: 20px;
          padding-left: 20px;
          padding-right: 20px;

          @media only screen and (min-width: 1024px) {
            width: 100%;
          }

          @media only screen and (max-width: 1024px) {
            margin-right: 20px;
            margin-left: 20px;
            margin-bottom: 20px;
            flex: 1;
          }

          .mainCommunity_innerBox_community_item_top {
            margin-top: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid gainsboro;

            .mainCommunity_innerBox_community_item_top_innerBox {
              .mainCommunity_innerBox_community_item_top_innerBox_category {
                color: #5897dc;
                font-size: 13px;
              }
              .mainCommunity_innerBox_community_item_top_innerBox_title {
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: break-all;
              }
            }
          }
          .mainCommunity_innerBox_community_item_mid {
            padding-top: 20px;
            padding-bottom: 10px;
            height: 230px;

            .mainCommunity_innerBox_community_item_mid_innerBox {
              height: 100%;

              .mainCommunity_innerBox_community_item_mid_innerBox_contents {
                overflow: hidden;
                height: 100%;
              }
              .mainCommunity_innerBox_community_item_mid_innerBox_contents
                > a
                > span {
                height: 100%;
                color: #666;
                font-size: 13px;
              }
              .mainCommunity_innerBox_community_item_mid_innerBox_contents
                > a
                > span
                > p {
                height: 100%;
                overflow: hidden;
                line-height: 25px;
              }
            }
          }
          .mainCommunity_innerBox_community_item_bottom {
            .mainCommunity_innerBox_community_item_bottom_innerBox {
              display: flex;
              justify-content: space-between;

              .mainCommunity_innerBox_community_item_bottom_innerBox_userName {
                font-size: 13px;
                color: #888;
              }
              .mainCommunity_innerBox_community_item_bottom_innerBox_createdAt {
                font-size: 13px;
                color: #888;
              }
            }
          }
        }
        & > div:last-child {
          margin-right: 0px;
        }
      }
    }
    .mainCommunity_innerBox_ranking {
      @media only screen and (max-width: 1024px) {
        display: none;
      }
      .mainCommunity_innerBox_ranking_title {
        .mainCommunity_innerBox_ranking_intro {
          font-weight: lighter;
          font-size: 40px;
          text-align: center;
          position: relative;
          color: white;

          .rankingPlusSVG {
            position: absolute;
            right: 0px;
            fill: lightgray;
          }
        }
      }

      .mainCommunity_innerBox_ranking_ranking {
        // display: flex;
        // justify-content: center;
        margin-top: 20px;
        position: relative;

        .mainCommunity_innerBox_ranking_ranking_1,
        .mainCommunity_innerBox_ranking_ranking_2,
        .mainCommunity_innerBox_ranking_ranking_3,
        .mainCommunity_innerBox_ranking_ranking_4,
        .mainCommunity_innerBox_ranking_ranking_5 {
          width: 250px;
          text-align: center;
          font-weight: 1000;
          font-size: 35px;
        }
        .mainCommunity_innerBox_ranking_ranking_2,
        .mainCommunity_innerBox_ranking_ranking_3,
        .mainCommunity_innerBox_ranking_ranking_4,
        .mainCommunity_innerBox_ranking_ranking_5 {
          color: rgb(90, 89, 105);
        }

        .mainCommunity_innerBox_ranking_ranking_1 {
          position: absolute;
          color: rgb(225, 131, 29);
          right: 475px;
        }
        .mainCommunity_innerBox_ranking_ranking_2 {
          position: absolute;
          right: 725px;
        }
        .mainCommunity_innerBox_ranking_ranking_3 {
          position: absolute;
          right: 225px;
        }
        .mainCommunity_innerBox_ranking_ranking_4 {
          position: absolute;
          right: 965px;
        }
        .mainCommunity_innerBox_ranking_ranking_5 {
          position: absolute;
          right: 0px;
        }
      }
      .mainCommunity_innerBox_ranking_avatar {
        margin-top: 150px;
        position: relative;

        .mainCommunity_innerBox_ranking_avatar_1,
        .mainCommunity_innerBox_ranking_avatar_2,
        .mainCommunity_innerBox_ranking_avatar_3,
        .mainCommunity_innerBox_ranking_avatar_4,
        .mainCommunity_innerBox_ranking_avatar_5 {
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
        }

        .mainCommunity_innerBox_ranking_avatar_1 {
          position: absolute;
          right: 550px;
          bottom: -133px;
        }
        .mainCommunity_innerBox_ranking_avatar_2 {
          position: absolute;
          right: 810px;
        }
        .mainCommunity_innerBox_ranking_avatar_3 {
          position: absolute;
          right: 310px;
        }
        .mainCommunity_innerBox_ranking_avatar_4 {
          position: absolute;
          right: 1040px;
          bottom: -64px;
        }
        .mainCommunity_innerBox_ranking_avatar_5 {
          position: absolute;
          right: 65px;
          bottom: -64px;
        }
      }
      .mainCommunity_innerBox_ranking_userName {
        margin-top: 320px;
        position: relative;

        .mainCommunity_innerBox_ranking_userName_1,
        .mainCommunity_innerBox_ranking_userName_2,
        .mainCommunity_innerBox_ranking_userName_3,
        .mainCommunity_innerBox_ranking_userName_4,
        .mainCommunity_innerBox_ranking_userName_5 {
          width: 250px;
          text-align: center;
          a {
            color: white;
          }
        }

        .mainCommunity_innerBox_ranking_userName_1 {
          position: absolute;
          right: 475px;
        }
        .mainCommunity_innerBox_ranking_userName_2 {
          position: absolute;
          right: 725px;
        }
        .mainCommunity_innerBox_ranking_userName_3 {
          position: absolute;
          right: 225px;
        }
        .mainCommunity_innerBox_ranking_userName_4 {
          position: absolute;
          right: 965px;
        }
        .mainCommunity_innerBox_ranking_userName_5 {
          position: absolute;
          right: 0px;
        }
      }
    }
  }

  .communityPlusSVG {
    position: absolute;
    right: 0px;
    fill: lightgray;
    @media only screen and (max-width: 1024px) {
      display: none;
    }
  }
`;
