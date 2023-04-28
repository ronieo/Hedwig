<p align="center">
<img src="https://user-images.githubusercontent.com/76941552/233840210-1b112162-5fb6-428f-bdd3-4aff06e8f2b9.svg" width="30%" height="30%"/>
</p>

<br />
<div align="center"><img src="https://user-images.githubusercontent.com/76941552/234288352-e3003f92-d53b-4195-8d0e-dbe6a929cb82.png" /></div>

<!--<h1 align="center"><strong>🦉 Hedwig 🦉</strong></h1>-->

<br />

## 🦉Hedwig 팀 소개
[박현준 (팀장)](https://github.com/johnphjkr)  | [정영찬](https://github.com/jyc-coder) | [임성열](https://github.com/sung34) | [고봉석](https://github.com/bongsee) | [이로운](https://github.com/ronieo) 
:----: | :----: | :----: | :----: | :----: 
<img src="https://avatars.githubusercontent.com/u/69203535?v=4" style="width: 180px;" /> | <img src="https://avatars.githubusercontent.com/u/56331400?v=4" style="width: 150px" /> | <img src="https://avatars.githubusercontent.com/u/120437898?v=4" style="width: 150px;" /> | <img src="https://avatars.githubusercontent.com/u/106302236?v=4" style="width: 150px;" /> | <img src="https://avatars.githubusercontent.com/u/76941552?v=4" style="width: 150px"/>
[johnphjkr](https://github.com/johnphjkr) | [jyc-coder](https://github.com/jyc-coder) | [sung34](https://github.com/sung34) | [bongsee](https://github.com/bongsee) |  [ronieo](https://github.com/ronieo)
[BE]<br> [BE, FE 배포]<br>|[메인 페이지]<br>[메인 페이지 하단탭]<br>[무한스크롤]<br>[게시글 테스트코드]<br>[게시글 수정 및 삭제]<br>[수정 페이지]<br>[CustomComponents]<br>|[메인페이지 상단탭]<br>[게시글상세]<br>[게시글 수정 및 삭제]<br>[게시글 moreButton]<br>[댓글]<br>[댓글 수정/삭제]<br>[글로벌 스타일]<br>|[회원가입]<br>[로그인]<br>[인증]<br>[로딩, 스낵바 컴포넌트]<br>|[글쓰기]<br>[프로젝트 노션 제작]<br>[회의 기록]<br>[로고 디자인]<br>

<br/>

 ## 🦉 Hedwig  프로젝트 소개
 
- Hedwig는 twitter 벤치마킹 프라이빗 커뮤니티 SNS 서비스입니다.
- 프라이빗 서비스이기 때문에 서비스 이용을 위해선 로그인 또는 회원가입을 해야만 컨텐츠 보기가 가능합니다.
- 유저 프로필의 이미지는 기본으로 제공 됩니다.
- 메인피드 기준 상단 탭 왼쪽부터 순서대로 <b>메인 | 내가 좋아요 한 글 | 내가 쓴 글</b>을 볼 수 있습니다.
  - 메인피드에서는 각 게시글의 댓글 갯수와 좋아요 갯수를 확인할 수 있습니다.
  - 메인피드에서 유저는 각 게시글에 좋아요를 누를 수 있고 취소를 할 수 있습니다.
- 유저는 게시글을 클릭 해 게시글 상세 페이지로 진입 할 수 있습니다.
  - 게시글 상세 페이지에서 타 유저의 댓글을 확인 할 수 있으며 댓글도 작성할 수 있습니다.
  - 게시글 상세 페이지에서 자신이 작성한 댓글은 수정 및 삭제가 가능 합니다.
- 메인피드 기준 하단 네비게이션 왼쪽부터 <b> 글쓰기 | 홈 | 프로필</b>(으)로 구성되어 있습니다.
  - 글쓰기 네비게이션을 클릭 시 글쓰기 페이지로 이동합니다.
    - 글쓰기 페이지에서는 최대 150자 까지 작성할 수 있습니다.
    - 글쓰기 페이지에서는 한 가지의 미디어만 추가 할 수 있습니다.
    - 글쓰기 페이지에서 다른 미디어를 추가 시 교체 됩니다.
  - 홈 네비게이션을 클릭 시, 메인 피드로 이동합니다.
  - 프로필 네비게이션을 클릭 시, 로그아웃 슬라이더가 출력됩니다.
    - 로그아웃 슬라이더를 클릭 시, 로그아웃 팝업이 출력됩니다.
    - 로그아웃을 클릭하면 다시 인증: 로그인 또는 회원가입 권유 페이지로 이동합니다.

<br/>

## ⏱ Hedwig작업과정
- 작업 기간 : 2023.04.17 ~ 2023.04.27
- 서비스 주소: [🦉 Hedwig 🦉](http://hedwig-fe.eba-afs9gzxm.ap-northeast-2.elasticbeanstalk.com/auth)
- 팀 레포지토리 주소 : [Hedwig ](https://github.com/FE4react5/Hedwig)
- 팀 깃 프로젝트 태스크보드 주소: [Hedwig Project Board](https://github.com/orgs/FE4react5/projects/1)
- 팀 작업과정 노션문서 주소: [Hedwig Notion](https://glowing-bit-b91.notion.site/Hedwig-5-SNS-19daae953182477899ffee4e58cc3d9c)
- 테스트용 계정

<br/>

### 🦉 인증: 로그인, 회원가입 페이지 구성
<table>
<th style={{width: "25%"}}>
  <div style={{width: "50%"}>
    <img src="https://user-images.githubusercontent.com/76941552/235031946-6d225d53-7fc2-4fd2-9e37-c76146f39a74.png" style={{width: "50%", height: "50%", objectFit: "contain"}}/>
  </div>
  <div align="center">
 🦉 로그인 또는 회원가입 권유 페이지
  </div>
</th>


<th style={{width: "25%"}}>
  <div style={{width: "50%"}>
    <img src="https://user-images.githubusercontent.com/76941552/235031944-8532e6b9-791f-48d9-907b-12726c461935.png" style={{width: "50%", height: "50%", objectFit: "contain"}}/>
  </div>
  <div align="center">
 🦉 회원가입 페이지
  </div>
</th>


<th style={{width: "25%"}}>
  <div style={{width: "50%"}>
    <img src="https://user-images.githubusercontent.com/76941552/235031943-b03cd8da-9ac0-47be-9aae-b1bea3a6f868.png" style={{width: "50%", height: "50%", objectFit: "contain"}}/>
  </div>
  <div align="center">
 🦉 로그인 페이지
  </div>
</th>
</table>

<br/>

---
<br/>

### 🦉 상단 네비게이션 페이지 구성
<table>
<th style={{width: "25%"}}>
  <div style={{width: "50%"}>
    <img src="https://user-images.githubusercontent.com/76941552/235031945-bddba2bc-416d-4512-b5c8-cfc5fd808383.png" style={{width: "50%", height: "50%", objectFit: "contain"}}/>
  </div>
  <div align="center">
 🦉 메인 페이지
  </div>
</th>


<th style={{width: "25%"}}>
  <div style={{width: "50%"}>
    <img src="https://user-images.githubusercontent.com/76941552/235032754-bd206769-b6a3-41b7-af48-1cd93a19a03c.png" style={{width: "50%", height: "50%", objectFit: "contain"}}/>
  </div>
  <div align="center">
 🦉 LIKED - 내가 좋아요한 페이지
  </div>
</th>


<th style={{width: "25%"}}>
  <div style={{width: "50%"}>
    <img src="https://user-images.githubusercontent.com/76941552/235032753-68f57ed2-f7db-4c7c-9c74-cb3df7e721e8.png" style={{width: "50%", height: "50%", objectFit: "contain"}}/>
  </div>
  <div align="center">
 🦉 MY- 내가 작성한 글 페이지
  </div>
</th>
</table>

<br/>

---

### 🦉 하단 네비게이션 페이지 구성
<table>
<th style={{width: "25%"}}>
  <div style={{width: "50%"}>
    <img src="https://user-images.githubusercontent.com/76941552/234176891-6e69308f-973f-4afa-80d6-16c786359d39.png" style={{width: "50%", height: "50%", objectFit: "contain"}}/>
  </div>
  <div align="center">
 🦉 글쓰기 - 글, 미디어 작성공간
  </div>
</th>


<th style={{width: "25%"}}>
  <div style={{width: "50%"}>
    <img src="https://user-images.githubusercontent.com/76941552/235031945-bddba2bc-416d-4512-b5c8-cfc5fd808383.png" style={{width: "50%", height: "50%", objectFit: "contain"}}/>
  </div>
  <div align="center">
 🦉 홈 - 메인 페이지 랜더링
  </div>
</th>


<th style={{width: "25%"}}>
  <div style={{width: "50%"}>
    <img src="https://user-images.githubusercontent.com/76941552/235031942-72e0566e-be6a-4214-a0ac-31c185efa966.png" style={{width: "50%", height: "50%", objectFit: "contain"}}/>
  </div>
  <div align="center">
 🦉 로그아웃 - 터치 후 로그아웃
  </div>
</th>
</table>

<br/>

---

<br/>

### 🛠️Hedwig 기술 스택
```
FE
- Basic: `React`, `Typescript`, `Next.js`, `MUI `
- Library:  `react-query`, `react-redux`, `axios`, `dotenv`, `eslint`, `nprogress`, `react-cookie`, `universal-cookie`, `nprogress`

BE
- Basic: `React`, `Typescript`
- Library:  `Express`, `TypeORM `, `Multer`, `Multer-s3` , `MySQL`, `nodemon`, `reflectMetaData`, `JsonWebToken`, `cookie-parser`, `Dotenv`
```

<br/>

---

<br/>

### 📁 Hedwig 프로젝트 구조
```
┌─ src
│  ├─ api
│  │  └─ 공동 api 및 함수
│  │  
│  ├─ components
│  │  └─ auth
│  │  |   └─ 로그인/회원가입 컴포넌트
│  │  └─ cards
│  │      └─ 게시글과 댓글 컴포넌트 
│  │  
│  ├─ pages - 컴포넌트 랜더링 페이지
│  │  └─ auth
│  │  └─post
│  │      
│  ├─ types
│  |   └─ 페이지에 필요한 타입선언
│  |  
│  ├─ utils
│  │  
├─.env
├─.eslintrc.js
├─next.config.js
├─tsconfig.json
├─README.md
├─package.json
└─package-lock.json
```
<br/>

---

<br/>

### 💻 Hedwig 프로젝트 실행 방법
```bash
1. $ git clone https://github.com/FE4react5/Hedwig.git
2. $ cd Hedwig
3. $ npm i
4. root경로에 .env 파일 생성 후, api관련 정보(API_KEY, API_URL, USER_NAME) 입력 ex) API_KEY=123456
5. $ npm run dev
``` 
