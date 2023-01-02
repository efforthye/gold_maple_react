import styled from "styled-components";
import hanz from "../Img/shortcut_maple_hanz.png";
import facebook from "../Img/shortcut_facebook.png";
import twitter from "../Img/shortcut_twitter.png";
import youtube from "../Img/shortcut_youtube.png";
import { Link } from "react-router-dom";
import NotFound from "../../../NotFound";

const Shortcut = () => {
  return (
    <ShortcutComponent>
      <div className={"shortcut_innerBox"}>
        <div className="flexBox">
          <img src={hanz} />{" "}
          <HorizontalCenterBox>
            <Link
              to="/Error"
              element={<NotFound />}
              rel="noopener noreferrer"
              target="_blink"
            >
              <span className="shortcut_smallLink">Android</span>
            </Link>
          </HorizontalCenterBox>{" "}
          <HorizontalCenterBox>
            <Link
              to="/Error"
              element={<NotFound />}
              rel="noopener noreferrer"
              target="_blink"
            >
              <span className="shortcut_smallLink">ios</span>
            </Link>
          </HorizontalCenterBox>
        </div>
        <div>
          <Link
            to="/Error"
            element={<NotFound />}
            rel="noopener noreferrer"
            target="_blink"
          >
            <img src={facebook} />
          </Link>
        </div>
        <div>
          <Link
            to="/Error"
            element={<NotFound />}
            rel="noopener noreferrer"
            target="_blink"
          >
            <img src={twitter} />
          </Link>
        </div>
        <div>
          <Link
            to="/Error"
            element={<NotFound />}
            rel="noopener noreferrer"
            target="_blink"
          >
            <img src={youtube} />
          </Link>
        </div>
      </div>
    </ShortcutComponent>
  );
};
export default Shortcut;

const ShortcutComponent = styled.div`
  @media only screen and (min-width: 1024px) {
    background-color: rgb(238, 238, 238);
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;

    a {
      text-decoration-line: none;
    }
    .shortcut_innerBox {
      width: 1200px;
      display: flex;
      justify-content: space-between;
    }

    .flexBox {
      display: flex;
    }

    .shortcut_smallLink {
      width: 65px;
      display: inline-block;
      border-radius: 30px;
      background-color: #fff;
      padding: 3px;
      color: lightgray;
      word-break: normal;
      font-size: 14px;
      text-align: center;
    }
  }

  @media only screen and (max-width: 1024px) {
    background-color: rgb(238, 238, 238);
    display: flex;
    justify-content: start;
    padding-top: 10px;
    padding-bottom: 10px;

    .shortcut_innerBox {
      div:first-child {
        padding-left: 20px;
      }
      div:nth-child(n + 2) {
        display: none;
      }
    }
  }
`;
const HorizontalCenterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-right: 5px;
`;
