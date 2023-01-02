# GoldSaeKki
<img src="https://mblogthumb-phinf.pstatic.net/MjAxODA1MTRfNDUg/MDAxNTI2MjgxNzYyODg5.oHk4cQMVLz3pM1k1_ZcWuy9jRZ8tEg0y08u-8B5AeKMg.JefNm06Oxfk2aAQG8gsalulIPVFHG7pFDcQWJRJpHy4g.JPEG.retspe/bn14.jpg?type=w800">

# 금쪽이들과 예리미 (주)

- 금쪽이와 아이들 팀(정재훈, 이가원, 고우석, 박혜림)
- Maple
- 기간 : 2022. 12. 09. ~ 2022. 12. 30. (3주간)
- Notion : notion(https://handsomely-carp-676.notion.site/1-3a9f2b7ba5244360be142649f731b57d)
- AWS connect Domain : http://jaetube.errorcode.help

# 개발환경
- FrontEnd : HTML5, CSS3 ,React, Redux, node.js, react-bootstrap
- BackEnd : node.js(express server), mysql(database, MySQL Workbench)
- 형상관리 : git(GitHub Desktop)
- Cloud : AWS(ec2, route53) <br/></br>



# 타임라인

|　구분　　<br>|                                                내용                                                 |           기간            |
| :--: | :-------------------------------------------------------------------------------------------------: | :-----------------------: |
|  팀  | **회의 및 팀 노션 생성** - https://handsomely-carp-676.notion.site/624ec8c54d584bbf9dad21c5d491e380 |        2022.12.09.        |
|  팀  |                             **Git Branch 생성 및 깃허브 데스크탑 연결**                             |        2022.12.09.        |
|  팀  |                                  **React 폴더 생성 및 기본 설정**                                   |        2022.12.09.        |
|  팀  |                                    **Node.js express 서버 세팅**                                    |        2022.12.13.        |
|  팀  |                                    **반응형 웹 구현**                                    |        2022.12.26. ~ 2022.12.19.|
| 정재훈 |                                   **고객지원 및 버그리포트 페이지**                                    | 2022.12.09 ~ 2022.12.13.  |
| 정재훈 |                                      **관리자 페이지 및 원격처리**                                       | 2022.12.14. ~ 2022.12.27. |
| 정재훈 |                                  **유저 관리 페이지**                                   |        2022.12.22. ~ 2022.12.27.        |
| 이가원 |                                   **로그인, 회원가입 페이지**                                    | 2022.12.09 ~ 2022.12.15.  |
| 이가원 |                                      **마이페이지**                                       | 2022.12.15. ~ 2022.12.23. |
| 이가원 |                                  **랭킹 페이지**                                   |        2022.12.24. ~ 2022.12.28.       |
| 고우석 |                                   **헤더 제작**                                    | 2022.12.09 ~ 2022.12.12.  |
| 고우석 |                                      **메인 페이지**                                       | 2022.12.13. ~ 2022.12.28. |
| 고우석 |                                  **검색 페이지**                                   |        2022.12.29.        |
| 박혜림 |                                      **네비게이션 바 제작**                                       | 2022.12.9. ~ 2022.12.11. |
| 박혜림 |                                  **커뮤니티 페이지**                                   |        2022.12.12. ~ 2022.12.28.       |


<br/><br/>

# 주요 구현 사항
1. react로 프론트 구현하기.
2. redux 사용해보기.
3. node.js를 사용해서 express server 열기.
4. mysql database 연결
5. apache2를 사용한 AWS에 배포

# 구현 페이지
### 정재훈 : 고객지원 및 관리자 페이지
### 이가원 : 회원가입/로그인 회원정보 및 랭킹 페이지
### 고우석 : 메인 및 헤더/푸터 + 검색 페이지
### 박혜림 : 커뮤니티 페이지 및 네비바<br/><br/>

# 핵심 기능
> ### 원격으로 추가시 도움말페이지에 있는 문의유형, 카테고리, 텍스트 순으로유지보수를 원활하게함 수정, 삭제, 및 위치변경 가능.
> ### 회원가입시 프로필 기본 이미지 등록 및 이미지 변경  
> ### 화살표 클릭 시 첫번쨰/마지막 순서인지 판정하고 첫번쨰/마지막 순서에만 슬라이드 이동
> ### 이슈 게시글 들의 태그를 이슈태그 목록에 출력 및 해당 게시글 이동 
<br><br>

# Database 스키마 다이어그램
<img src="https://cdn.imweb.me/upload/S2020090710444c43a5dc5/6b82ca12ae291.jpg" alt="Database 연결 관계 설정 다이어그램 이미지"><br/><br/>

# 이슈사항
> ### 재훈 : AWS 로 연동 시 기존의 로컬호스트 연동이 안됌. -> 프록시 설정을 통해 해결하였다.
> 
> ### 가원 : 로그인 성공 시 개발자도구의 application 부분에 쿠키 생성이 안되는 이슈발생 -> 서버 index.js에서 cores 부분에 credentials : true를 설정하고 src index.js에서 axios.defaults.withCredentials = true; 설정 후 cookie를 정상적으로 확인할 수 있었다.
>```
>    // server index.js cors
>    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
>    // web src index.js
>    axios.defaults.withCredentials = true;
>```
> ### 우석 : 메인 페이지의 Carousel 이동 시 범위를 아예 벗어나는 오류가 있었다. -> 이동할 때 길이를 퍼센트로 계산하는데 Carousel 전체 칸 개수가 홀수일 경우 소수점이   깨지는 오류였다. 퍼센트가 아니라 px로 계산하여 해결하였다.
> 
> ### 혜림 : Database 및 게시글의 시간이 현재 시간의 -9시간 으로 저장되어 출력됨 -> config.json에 timezone을 "+09:00"으로 설정해 db에 정상적인 날짜가 들어가도록 하였고, moment.js를 이용해 db의 값을 정상적으로 띄우도록 하였다.
