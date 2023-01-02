import world1Img from "../components/Community/images/worlds/icon_1.png";
import world2Img from "../components/Community/images/worlds/icon_2.png";
import world3Img from "../components/Community/images/worlds/icon_3.png";
import world4Img from "../components/Community/images/worlds/icon_4.png";
import world5Img from "../components/Community/images/worlds/icon_5.png";
import world6Img from "../components/Community/images/worlds/icon_6.png";
import world7Img from "../components/Community/images/worlds/icon_7.png";
import world8Img from "../components/Community/images/worlds/icon_8.png";
import world9Img from "../components/Community/images/worlds/icon_9.png";
import world10Img from "../components/Community/images/worlds/icon_10.png";
import world11Img from "../components/Community/images/worlds/icon_11.png";
import world12Img from "../components/Community/images/worlds/icon_12.png";
import world13Img from "../components/Community/images/worlds/icon_13.png";
import world14Img from "../components/Community/images/worlds/icon_14.png";
import world15Img from "../components/Community/images/worlds/icon_15.png";
import world16Img from "../components/Community/images/worlds/icon_16.png";

export const CATEGORY = [
    { name: '자유게시판', label: "Free" },
    { name: '정보게시판', label: "Information" },
    { name: '토론게시판', label: "TopicDiscussion" },
    { name: '연재소설', label: "Novel" },
    { name: '금쪽이아트', label: "Art" },
    { name: '이벤트게시판', label: "Event" },
];

export const CATEGORY2 = [
    { name: '<게시판 목록>', label: "BoardList", link: "/BoardList" },
    { name: '<게시글 등록>', label: "BoardAdd", link: "/BoardAdd" },
    { name: '/게시글 수정', label: "BoardUpdate", link: "/BoardUpdate" },
    { name: '<게시글 상세 페이지>', label: "Board", link: "/Board" },
    { name: '-댓글 목록', label: "CommentList", link: "/CommentList" },
    { name: '-댓글 등록', label: "CommentAdd", link: "/CommentAdd" },
    { name: '/댓글 수정', label: "CommentUpdate", link: "/CommentUpdate" },
    { name: '<페이징 처리>', label: "Pagination", link: "/Pagination" },
];

export const WORLDLIST = [
    { name: '전체월드', img: world1Img, label : "All" },
    { name: '리부트2', img: world2Img, label : "Reboot2" },
    { name: '리부트', img: world3Img, label : "Reboot" },
    { name: '오로라', img: world4Img, label : "Aurora" },
    { name: '레드', img: world5Img, label : "Red" },
    { name: '이노시스', img: world6Img, label : "Innosis" },
    { name: '유니온', img: world7Img, label : "Union" },
    { name: '스카니아', img: world8Img, label : "Scania" },
    { name: '루나', img: world9Img, label : "Luna" },
    { name: '제니스', img: world10Img, label : "Zenith" },
    { name: '크로아', img: world11Img, label : "Croix" },
    { name: '베라', img: world12Img, label : "Vera" },
    { name: '엘리시움', img: world13Img, label : "Elysium" },
    { name: '아케인', img: world14Img, label : "Arcane" },
    { name: '노바', img: world15Img, label : "Nova" },
    { name: '버닝', img: world16Img, label : "Burning" },
    { name: '버닝2', img: world16Img, label : "Burning2" },
    { name: '버닝3', img: world16Img, label : "Burning3" },
];

const TYPE = {
    TAGS : "community/tags",
    LIST: "/community/list",
    BOARD: "/community/board",
    COMMENTS: "/community/comments",
    COMMENTCOUNTS : "/community/commentCounts",
}

const tags = (tags) =>{
    return {
        type : TYPE.TAGS,
        payload : { tags }
    }
}
const list = (list) => {
    return {
        type: TYPE.LIST,
        payload: { list }
    };
};
const board = (board) => {
    return {
        type: TYPE.BOARD,
        payload: { board }
    }
}
const comments = (comments) => {
    return {
        type: TYPE.COMMENTS,
        payload: { comments }
    }
}

const commentCounts = (counts) =>{
    return{
        type : TYPE.COMMENTCOUNTS,
        payload : {counts}
    }
}

export const action = { tags, list, board, comments, commentCounts };

export const initialize = {};

export const reducer = (state = initialize, action) => {
    const { type, payload } = action;
    switch (type) {
        case TYPE.LIST:
            const { list } = payload;
            return {list};
        case TYPE.TAGS:
            const { tags } = payload;
            return {...state, tags};
        case TYPE.BOARD:
            const { board } = payload;
            return {...state, board};
        case TYPE.COMMENTS:
            const { comments } = payload;
            return {...state, comments};
        case TYPE.COMMENTCOUNTS :
            const { commentCounts } = payload;
            return{...state , commentCounts};
        default:
            return state;
    }
}