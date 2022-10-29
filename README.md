# 🎞 Rimflix 림플릭스

### ✨ <strong>프로젝트에 사용한 스택</strong> ✨

<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=Recoil&logoColor=white">
  <img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styledcomponent&logoColor=white">
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">
</div>

### 📍 Rimflix 소개

<img width="70%" alt="스크린샷 2022-10-29 오후 7 37 24" src="https://user-images.githubusercontent.com/91457443/198826880-609fa031-ba55-4ffe-8a04-b3abdf7b2b8e.png">

> 넷플릭스를 모티브로 만든 림플릭스 사이트입니다. 현재 상영하고 있는 영화나 인기있는 텔레비젼 쇼 등 다양한 주제별 콘텐츠 리스트들을 볼 수 있으며, 콘텐츠의 트레일러 영상이나 상세정보를 볼 수 있습니다. 또한 원하는 콘텐츠를 직접 찾아보는 검색 기능과 언어 설정 기능도 제공합니다. 또한 내가 좋아하는 영화나 TV를 저장하여 따로 내가 저장한 리스트를 볼 수 있으니 좋아하는 콘텐츠를 저장해보세요!
>
> ### [Demo 보기 👀](https://talentforest.github.io/rimflix/)

### 📍 목차

> #### [목차 1. Rimflix 기능 소개](#1-rimflix-기능-소개)
>
> #### [목차 2. 프로젝트 스펙과 파일구조 살펴보기](#2-프로젝트-스펙과-파일구조-살펴보기)
>
> #### [목차 3. 프로젝트 덕분에 공부한 부분](#3-프로젝트-덕분에-공부한-부분)
>
> - <strong>3-1. 성능 최적화</strong>
>
> - <strong>3-2. 반응형 웹페이지</strong>
>
> - <strong>3-3. 부드러운 모션</strong>
>
> #### [목차 4. 프로젝트 후기](#4-프로젝트-후기)

<br/>

## [1. Rimflix 기능 소개](#목차-1-rimflix-기능-소개)

> <strong> 1-1. 반응형 웹페이지 </strong>

데스크탑, 태블릿, 모바일을 기준으로 한 반응형 웹페이지로 제작했습니다.

<div>
  <img height="300px" alt="스크린샷 2022-10-29 오후 8 13 09" src="https://user-images.githubusercontent.com/91457443/198828240-2d10b560-9b30-4e2c-9394-0100524b1943.png">
  <img height="300px" alt="스크린샷 2022-10-29 오후 8 12 51" src="https://user-images.githubusercontent.com/91457443/198828260-42bcb065-c08d-4a14-b0f3-12ab929d17dd.png">
  <img height="300px" alt="스크린샷 2022-10-29 오후 8 17 03" src="https://user-images.githubusercontent.com/91457443/198828387-bc75abfa-11e2-4963-9276-9f77f90157f8.png">
</div>

<p>iPhone SE ➔ iPad Air ➔ Nest Hub</p>

<br/>

> <strong>1-2. 주제별 콘텐츠 리스트와 콘텐츠 상세정보 제공</strong>

주제별 콘텐츠 리스트는 슬라이드로 볼 수 있습니다.

- 태블릿과 데스크탑에서는 버튼으로 다음 슬라이드를 볼 수 있지만 모바일에서는 터치이벤트도 함께 구현해 버튼을 누르지 않고 슬라이드 모션으로도 다음 슬라이드를 볼 수 있도록 구현했습니다.

콘텐츠 박스를 클릭하면 해당 콘텐츠의 상세정보(트레일러, 개봉일, 평점, 출연진, 줄거리 등)와 관련 추천 콘텐츠를 제공합니다.
<div> 
  <img width="48%" alt="스크린샷 2022-10-29 오후 7 47 35" src="https://user-images.githubusercontent.com/91457443/198827359-046cb2e0-f297-4f6b-8e27-f7b9eded8194.png">
  <img width="48%" alt="스크린샷 2022-10-29 오후 7 50 56" src="https://user-images.githubusercontent.com/91457443/198827362-bd811c07-a826-4608-b648-5685dfccc8cf.png">
</div>

<br/>

><strong>1-3. 언어(한국어, 영어) 설정 기능</strong>

하단 푸터에서 한국어와 영어 둘중 하나의 언어를 선택할 수 있습니다.

<div>
  <img width="48%" alt="스크린샷 2022-10-29 오후 8 02 29" src="https://user-images.githubusercontent.com/91457443/198827819-53a8ca4b-81b4-4e8d-bd7d-07faa684f9ea.png">
  <img width="48%" alt="스크린샷 2022-10-29 오후 7 55 21" src="https://user-images.githubusercontent.com/91457443/198827542-f3f77280-fd4b-4d9f-8020-3ba5f1bc63b0.png">
</div>

<br/>

><strong>1-4. 콘텐츠 검색 기능</strong>

검색 키워드를 쓰면 영화와 텔레비젼 쇼로 나누어 검색 결과가 제공됩니다.

<br/>

><strong>1-5. 내가 저장한 콘텐츠 보기</strong>

콘텐츠 상세보기 모달에 있는 나의 리스트에 추가하기 버튼을 클릭하면 나의 리스트에 저장됩니다. 저장한 콘텐츠는 My List 페이지에서 볼 수 있습니다.

<br/>

## [2. 프로젝트 스펙과 파일구조 살펴보기](#목차-2-프로젝트-스펙과-파일구조-살펴보기)

><strong>2-1. 프로젝트 스펙</strong>

<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

React Query는 이 프로젝트에서 처음 사용해봤는데,

React Query 이번 프로젝트에서 처음 사용해봤는데, 비동기 데이터를 많이 다룬 이번 프로젝트에서 정말 유용했고, 장점을 많이 느낀 라이브러리였습니다. 일단 몇줄의 코드로 쉽게 서버 데이터를 가져오고, 가져온 데이터를 다양한 기능을 통해 다룰 수 있게 해주기 때문에 코드의 양이 줄고, 깔끔해져서 좋았습니다. 간단하게 비동기 데이터를 다룰 수 있는 것도 장점인데, React Query 캐싱 기능 부분이 앱의 많은 도움이 되었던 것 같습니다. 특히 React Query의 핵심 개념인 쿼리에 대해 공부한 것 같습니다.

<img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">

이 프로젝트를 통해서 framer-motion 애니메이션 라이브러리 사용에도 조금 더 익숙해졌습니다. 전체적으로 애니메이션을 사용하니 웹사이트의 인터랙션도 더욱 좋아졌습니다. 로고의 선을 그리고 서서히 바탕색을 채운다던가, 아래로 스크롤을 내리면 네비게이션 헤더의 배경색이 바뀌는 등 다양한 모션을 적용해볼 수 있었던 것 같습니다.

<br/>

><strong>2-2. 파일 구조</strong>

```bash
.root
├── node_modules
├── public
├── src
│   ├── api              # tmdb의 다양한 데이터 fetch api 함수
│   ├── component
│   │   ├── common       # 공통으로 사용되는 컴포넌트
│   │   ├── modaldetail  # 콘텐츠 상세정보를 담은 모달에 관련된 컴포넌트
│   ├── data             # recoil atom
│   ├── hooks            # 슬라이드 로직, 나의 리스트 추가 로직 등 커스텀 훅
│   │   ├──query         # React Query과 관련된 로직
│   ├── layout           # Router 밖에서 사용되는 컴포넌트(헤더, 푸터, 로고)
│   ├── routes
│   ├── theme            # 전역에서 자주 사용하는 스타일과 미디어쿼리 변수, 색상
│   ├── util             # 전역에서 자주 사용하는 유용한 함수와 변수
│   ├── App.tsx
│   ├── index.tsx
│   └── Router.tsx
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json

```



<br/>

## [3. 프로젝트 덕분에 공부한 부분](#목차-3-프로젝트-덕분에-공부한-부분)

> <strong>3-1. 성능 최적화</strong>

먼저 페이지의 대부분을 이미지가 차지하고 있고, 또 반응형 웹으로 제작하면서 화면 사이즈에 따라 사진이 변경되기 때문에 꼭 성능 최적화 작업이 필요하다고 생각했습니다.

성능을 최적화한 부분으로는

- React Query의 캐싱 기능
- Resize 이벤트에 throttling 기법 적용
- 화면 사이즈에 따라 이미지 해상도 변경
- [HTML 반응형 이미지 아트 디렉션 적용](https://developer.mozilla.org/ko/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- 이미지에 LazyLoading 적용

><strong>3-2. 반응형(모바일과 데스크탑의 차이)</strong>

데스크탑, 태블릿, 모바일을 기준으로 반응형 웹페이지를 제작했습니다. 이 프로젝트로 화면 요소를 재배치하는 것뿐만 아니라, 이벤트 처리 또한 따로 해야 한다는 것을 배웠습니다.

- 반응형 미디어 쿼리
- HTML 반응형 이미지 아트 디렉션 적용
- 모바일 반응형에는 터치 이벤트 핸들러 적용하고, `:hover`와 같은 가상 셀렉터 제거

><strong>3-3. 다양한 모션</strong>

framer-motion을 통해 사용자의 행동에 따른 인터렉션 모션을 좀 더 쉽고 다양하게 구현할 수 있었던 것 같습니다.

- 언어 설정 버튼을 부드럽게 움직이기
- 로고의 선부터 안의 색을 서서히 채우기
- 콘텐츠 박스를 hover할 때의 애니메이션 등등

<br/>

## [4. 프로젝트 후기](#목차-4-프로젝트-후기)

넷플릭스를 참고하여 림플릭스를 만들어봤는데 정말 재미있었던 작업이었습니다. 처음에는 챌린지로 만들었다가 너무 재미있어서 챌린지가 끝나고도 계속해서 여러 api를 받아오며 작업을 계속했습니다. 그렇게 만들다보니 용량이 커져서 최적화를 해야겠다는 생각이 들었고, 중간에 성능 최적화를 공부하며 프로젝트에 적용해보았습니다. 또한 배포를 하고 나니 뭔가 모바일에서는 클릭이 아니라 터치 이벤트 리스너가 더 좋겠다는 생각이 들어 다시 고치는 등 만들면서 많은 생각을 들게하고 공부가 많이 되었던 프로젝트였습니다. : )
