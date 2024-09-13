# GoldSaeKki

<!-- <img src="https://mblogthumb-phinf.pstatic.net/MjAxODA1MTRfNDUg/MDAxNTI2MjgxNzYyODg5.oHk4cQMVLz3pM1k1_ZcWuy9jRZ8tEg0y08u-8B5AeKMg.JefNm06Oxfk2aAQG8gsalulIPVFHG7pFDcQWJRJpHy4g.JPEG.retspe/bn14.jpg?type=w800"> -->

![제목_없2음](https://github.com/efforthye/Gold-Maple/assets/111038259/2091c6a4-d4a8-4e50-a38a-6f8f50791573)

✨ 금쪽이들과 예리미 (주)

- 금쪽이와 아이들 팀(정재훈, 이가원, 고우석, 박혜림)
- Maple
- 기간 : 2022. 12. 09. ~ 2022. 12. 30. (3주간)
- Notion : notion(https://handsomely-carp-676.notion.site/1-3a9f2b7ba5244360be142649f731b57d)
- AWS connect Domain : http://jaetube.errorcode.help

# 개발환경

- FrontEnd : HTML5, CSS3, JavaScript React(Redux), ReactBootstrap
- BackEnd : Node.js(express), MySQL
- 형상관리 : github
- Cloud : AWS(ec2, route53) <br/></br>

# 타임라인

| 　구분　　<br> |                                                내용                                                 |           기간            |
| :------------: | :-------------------------------------------------------------------------------------------------: | :-----------------------: |
|       팀       | **회의 및 팀 노션 생성** - https://handsomely-carp-676.notion.site/624ec8c54d584bbf9dad21c5d491e380 |        2022.12.09.        |
|       팀       |                             **Git Branch 생성 및 깃허브 데스크탑 연결**                             |        2022.12.09.        |
|       팀       |                                  **React 폴더 생성 및 기본 설정**                                   |        2022.12.09.        |
|       팀       |                                    **Node.js express 서버 세팅**                                    |        2022.12.13.        |
|       팀       |                                         **반응형 웹 구현**                                          | 2022.12.26. ~ 2022.12.19. |
|     정재훈     |                                  **고객지원 및 버그리포트 페이지**                                  | 2022.12.09 ~ 2022.12.13.  |
|     정재훈     |                                    **관리자 페이지 및 원격처리**                                    | 2022.12.14. ~ 2022.12.27. |
|     정재훈     |                                        **유저 관리 페이지**                                         | 2022.12.22. ~ 2022.12.27. |
|     이가원     |                                     **로그인, 회원가입 페이지**                                     | 2022.12.09 ~ 2022.12.15.  |
|     이가원     |                                           **마이페이지**                                            | 2022.12.15. ~ 2022.12.23. |
|     이가원     |                                           **랭킹 페이지**                                           | 2022.12.24. ~ 2022.12.28. |
|     고우석     |                                            **헤더 제작**                                            | 2022.12.09 ~ 2022.12.12.  |
|     고우석     |                                           **메인 페이지**                                           | 2022.12.13. ~ 2022.12.28. |
|     고우석     |                                           **검색 페이지**                                           |        2022.12.29.        |
|     박혜림     |                                       **네비게이션 바 제작**                                        | 2022.12.9. ~ 2022.12.11.  |
|     박혜림     |                                         **커뮤니티 페이지 제작**                                         | 2022.12.12. ~ 2022.12.28. |
|     박혜림     |                                        **프로젝트 리팩토링**                                        |   2023.11.21. ~ end    |

<br/><br/>

# 리팩토링 목표

- 커뮤니티 및 댓글에 이미지 추가 기능 넣기
- 댓글에 대댓글 기능 추가하기
- 하트 한 번만 가능하도록 매핑 하기
- 기존 목표였던 게시판 별 이슈태그 지정하기
- 코드 중복 제거 및 try~catch 추가 등 예외처리
- 전체적인 코드 리팩토링 및 분석
- 더미데이터 관련 부분 수정하기 (미스터 코)

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

### 박혜림 : 커뮤니티 페이지 및 공통 네비게이션 바<br/><br/>

# Database 스키마 다이어그램

<img src="https://cdn.imweb.me/upload/S2020090710444c43a5dc5/6b82ca12ae291.jpg" alt="Database 연결 관계 설정 다이어그램 이미지"><br/><br/>

# 실행 방법

1. /Maple/server/config/config.json 에 쓰여진 대로 mysql schema를 생성합니다.
   - name : maple, username : root, password : 1234
   - charset : utf8mb4, collation : utf8mb4_general_cli
2. /Maple/server 에서 `npm install` -> `npm run start`으로 서버를 실행합니다.
3. /Maple/mapleweb에서 `yarn install` -> `yarn start`로 클라이언트 서버를 실행합니다.
4. 만약 코드 수정을 할 예정이라면 테이블 자동 삭제 방지를 위하여 /Maple/server/index.js 에서 `force`를 `false`로 설정해 줍니다.
