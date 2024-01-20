import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const NavigationComponent = ({ categorys }) => {
  const location = useLocation();

  const locationName = useRef("");
  const nowRouterIdx = useRef(0);

  const [_, render] = useState(true);

  useEffect(() => {
    render(!_);
    const locationArr = location.pathname.split("/");
    locationName.current = locationArr[locationArr.length - 1];
  }, [location]);

  categorys.forEach((category, index) => {
    if (category.label === locationName.current) {
      nowRouterIdx.current = index;
    }
  });

  const [naviWidth, setNaviWidth] = useState(20);

  const [naviLeft, setNaviLeft] = useState(0);

  return (
    <NavigationWrap className="mnb_wrap">
      <NavigationBox className="div_inner2">
        {categorys.map((item, idx) => {
          return (
            <LiBox className="liBox" key={`listbox-${item.label}`}>
              <Link
                key={`list-${item.label}`}
                to={`./${item.label}`}
                className={`${idx === nowRouterIdx.current ? "active" : ""}`}
              >
                <CategoryLi
                  key={`category-${item.label}`}
                  onMouseOver={(e) => {
                    setNaviWidth(e.target.offsetWidth);
                    setNaviLeft(e.target.offsetLeft);
                  }}
                  onMouseLeave={(e) => {
                  }}
                >
                  {item.name}
                </CategoryLi>
              </Link>
            </LiBox>
          );
        })}

        <CategoryLine
          className="mnb_line"
          style={{ width: `${naviWidth}px`, left: `${naviLeft}px` }}
        ></CategoryLine>
      </NavigationBox>
    </NavigationWrap>
  );
};

export default NavigationComponent;

const NavigationWrap = styled.div`
  font-size: 20px;
  height: 66px;
  background-color: white;
  position: sticky;
  top: 62px;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  z-index: 2;

  width: 100%;
  @media all and (max-width: 479px) {
    display: none;
  }
`;

const NavigationBox = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: inherit;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 1280px) {
    width: 1050px;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 620px;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 650px;
    padding: 0 5px;
  }
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 440px;
    margin: 0 auto;
    padding: 0 4px;
  }
  @media all and (max-width: 479px) {
    width: 370px;
    padding: 0 5px;
  }
`;

const LiBox = styled.div`
  height: inherit;
  display: inline-block;
  li {
    font-size: 16px;
    list-style: none;
    cursor: pointer;
    height: inherit;
    line-height: 64px;
    text-align: left;
    background-color: white;
    margin-right: 44px;

    @media screen and (max-width: 1280px) {
    }
    @media all and (min-width: 768px) and (max-width: 1023px) {
      margin-right: 24px;
    }
    @media all and (min-width: 768px) and (max-width: 1023px) {
      font-size: 14px;
      margin-right: 24px;
    }
    @media all and (min-width: 480px) and (max-width: 767px) {
      font-size: 12px;
      margin-right: 12px;
    }
    @media all and (max-width: 479px) {
      font-size: 10.5px;
      margin-right: 7px;
    }
  }
  a {
    color: #666;
    text-decoration: none;
    &:hover {
      color: #242424;
    }
    &.active li {
      color: #333;
      font-weight: 600;
    }
  }
`;

const CategoryLi = styled.li``;

const CategoryLine = styled.span`
  position: absolute;
  bottom: -1px;
  height: 5px;
  background-color: #434343;
  left: 0px;
  transition: all 0.8s;
`;
