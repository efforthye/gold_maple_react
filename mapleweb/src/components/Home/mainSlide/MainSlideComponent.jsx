import React, { useMemo, useState } from "react";

import slideBackground from "../Img/main_slide_background.png";

import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const MainSlideComponent = ({
  carouselBackgroundArr,
  carouselImgArr,
  carouselTitleArr,
  carouselTextArr,
}) => {
  const [currSlide, setCurrSlide] = useState(0);
  const [currSlideTranslate, setCurrSlideTranslate] = useState(0);

  const [bool, setBool] = useState(true);

  const container = useRef();

  const onlyUpdateCurrSlide = useRef(true);

  useEffect(() => {
    setInterval(() => {
      setBool(true);
      setCurrSlide((state) => (state + 1) % carouselImgArr.length);
    }, 5000);
  }, []);

  useEffect(() => {
    if (onlyUpdateCurrSlide.current) {
      onlyUpdateCurrSlide.current = false;
    } else {
      if (bool) {
        if (currSlide == 0) {
          container.current.style.transform = `translate(0px)`;
          setCurrSlideTranslate(0);
        } else {
          if (currSlide % 4 == 0) {
            container.current.style.transform = `translate(${
              currSlideTranslate - 1100
            }px)`;
            setCurrSlideTranslate(currSlideTranslate - 1100);
          }
        }
      } else if (!bool) {
        if (currSlide + 1 == carouselImgArr.length) {
          container.current.style.transform = `translate(${
            parseInt((carouselImgArr.length - 1) / 4) * -1100
          }px)`;
          setCurrSlideTranslate(
            parseInt((carouselImgArr.length - 1) / 4) * -1100
          );
        } else {
          if (currSlide % 4 == 3) {
            container.current.style.transform = `translate(${
              currSlideTranslate + 1100
            }px)`;
            setCurrSlideTranslate(currSlideTranslate + 1100);
          }
        }
      }
    }
  }, [currSlide]);

  return (
    <Cover>
      <MainSlide>
        <Link to="/Error">
          <CarouselBackground bgImg={carouselBackgroundArr[currSlide]}>
            <div className="CarouselBackground_innerBox">
              <h2
                className="CarouselBackground_innerBox_title"
                dangerouslySetInnerHTML={{
                  __html: carouselTitleArr[currSlide],
                }}
              ></h2>
            </div>
          </CarouselBackground>
        </Link>
        <Carousel>
          <div className="carousel_innerBox">
            <div className="carousel_pageBox">
              <div className="carousel_pageBox_innerBox">
                <div className="carousel_pageBox_innerBox_textBox">
                  &nbsp;&nbsp;
                  <div className="carousel_pageBox_innerBox_textBox_currNum">
                    {currSlide + 1}
                  </div>
                  &nbsp;<span>/</span>&nbsp;
                  <div className="carousel_pageBox_innerBox_textBox_AllNum">
                    {carouselImgArr.length}
                  </div>
                  &nbsp;&nbsp;
                </div>
              </div>
            </div>
            <div className="carousel_slide">
              <div className="carousel_slide_innerBox">
                <div
                  className="carousel_slide_innerBox_prevBtn"
                  onClick={() => {
                    setBool(false);
                    setCurrSlide(
                      (state) =>
                        (state + carouselImgArr.length - 1) %
                        carouselImgArr.length
                    );
                  }}
                >
                  <svg width="20px" height="20px" fill="gainsboro">
                    <polyline
                      points="20,0 0,10 20,20"
                      file="none"
                      stroke="black"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className="carousel_slide_itemBox_cover">
                  <div className="carousel_slide_itemBox" ref={container}>
                    {
                      carouselImgArr.map((item, index) => {
                        return (
                          <div
                            key={`slideItem-${index}`}
                            className={`carousel_slide_item 
                          ${currSlide == index ? "on" : ""} 
                          ${(index - 1) % 4 == 0 ? "interval" : ""}`}
                            onClick={() => {
                              setCurrSlide(index);
                            }}
                          >
                            <img key={`img-${index}`} src={item} alt="" />
                            <span>{carouselTextArr[index]}</span>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                <div
                  className="carousel_slide_innerBox_nextBtn"
                  onClick={() => {
                    setBool(true);
                    setCurrSlide(
                      (state) => (state + 1) % carouselImgArr.length
                    );
                  }}
                >
                  <svg width="20px" height="20px" fill="gainsboro">
                    <polyline
                      points="0,0 20,10 0,20"
                      file="none"
                      stroke="black"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </MainSlide>
    </Cover>
  );
};

export default MainSlideComponent;

const Cover = styled.div`
  width: 100%;
`;

const MainSlide = styled.div`
  position: relative;
  height: 560px;
  width: 100%;
  
  @media only screen and (max-width: 1150px) {
    display: none;
  }
`;

const CarouselBackground = styled.div`
  background-image: url(${(state) => state.bgImg});
  background-repeat: no-repeat;
  background-position: center;
  transition: background 200ms linear;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1150px) {
    display: none;
  }

  .CarouselBackground_innerBox {
    position: relative;
    width: 1200px;
    overflow-x: hidden;

    .CarouselBackground_innerBox_title {
      color: white;
      font-size: 60px;
      white-space: nowrap;
      position: absolute;
      top: 35%;
      left: 100px;
    }
  }
`;

const Carousel = styled.div`
  width: 100%;
  height: 93px;
  background-image: url(${slideBackground});
  position: absolute;
  bottom: 0px;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 1150px) {
    display: none;
  }

  .carousel_innerBox {
    min-width: 1200px;
    padding-top: 20px;
    position: relative;

    .carousel_pageBox {
      justify-content: space-between;
      font-weight: bold;
      width: 100%;
      padding-bottom: 5px;
      display: flex;
      justify-content: center;
      position: absolute;
      top: 0px;

      .carousel_pageBox_innerBox {
        display: flex;

        .carousel_pageBox_innerBox_textBox {
          display: flex;
          font-size: 20px;

          .carousel_pageBox_innerBox_textBox_currNum {
            color: #f68500;
          }
          span {
            color: gainsboro;
          }
          .carousel_pageBox_innerBox_textBox_AllNum {
            color: gainsboro;
          }
        }
      }
    }

    .carousel_slide {
      width: 100%;
      overflow: hidden;
      position: absolute;
      bottom: 20px;

      .carousel_slide_innerBox {
        display: flex;
        justify-content: space-between;
        position: relative;

        .carousel_slide_innerBox_prevBtn {
          width: 30px;
          position: absolute;
          left: 0px;
          bottom: 13px;
        }

        .carousel_slide_itemBox_cover {
          min-width: 1100px;
          margin-left: 50px;
          margin-right: 50px;
          overflow: hidden;

          .carousel_slide_itemBox {
            display: flex;
            transition: transform 0.5s;

            .carousel_slide_item {
              min-width: 210px;
              max-width: 210px;
              margin-left: 17px;
              display: flex;

              img {
                width: 100px;
                max-width: 210px;
              }

              span {
                color: white;
                font-size: 12px;
                max-width: 100px;
                margin-left: 10px;
                word-break: keep-all;
                color: rgb(104, 104, 104);
              }
            }

            .carousel_slide_item.interval {
              margin-right: 192px;
            }

            .carousel_slide_item.on {
              img {
                border: 2px solid orange;
              }

              span {
                color: white;
              }
            }
          }
        }

        .carousel_slide_innerBox_nextBtn {
          width: 30px;
          position: absolute;
          right: 0px;
          bottom: 13px;
        }
      }
    }
  }
`;
