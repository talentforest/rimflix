# 🎞 Rimflix 림플릭스

### ✨ <strong>프로젝트에 사용한 스택</strong> ✨

<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=Recoil&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">
</div>

### 📍 Rimflix 소개

<div>
  <img width="400px" alt="스크린샷 2022-10-29 오후 7 37 24" src="https://user-images.githubusercontent.com/91457443/198826880-609fa031-ba55-4ffe-8a04-b3abdf7b2b8e.png">
  <img width="400px" alt="스크린샷 2022-10-29 오후 7 37 24" src="https://user-images.githubusercontent.com/91457443/222661890-94089ba1-934f-437a-a7be-3f63464978e7.png">
  <img width="400px" alt="스크린샷 2022-10-29 오후 7 37 24" src="https://user-images.githubusercontent.com/91457443/222664411-ad0423e2-8b84-4041-a178-1a5a01c1ecd4.png">
</div>

> 다양한 영화 정보와 검색 기능, 캔버스 기능을 제공하는 림플릭스 사이트입니다. 영어와 한국어 두가지의 언어 설정 기능을 제공하며 주제별 다양한 콘텐츠 리스트와 콘텐츠의 트레일러 영상, 상세정보를 제공합니다. 또한 내가 좋아하는 콘텐츠를 따로 리스트로 저장하거나 포토카드로 만들어볼 수 있습니다.
>
> #### [Demo 보기 👀](https://talentforest.github.io/rimflix/)

<br/>

### 📍 목차

> #### [목차 1. Rimflix 기능 소개](#1-rimflix-기능-소개)
>
> #### [목차 2. 프로젝트 스펙과 파일구조 살펴보기](#2-프로젝트-스펙과-파일구조-살펴보기)
>
> #### [목차 3. 프로젝트 덕분에 공부한 부분](#3-프로젝트-덕분에-공부한-부분)
>
> - <strong>3-1. 반응형 웹페이지, 모바일 터치 이벤트</strong>
>
> - <strong>3-2. 성능 최적화</strong>
>
> - <strong>3-3. React-Query</strong>
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

- 태블릿과 데스크탑에서는 버튼으로 다음 슬라이드를 볼 수 있지만 모바일에서는 <strong>터치이벤트도 함께 구현</strong>해 버튼을 누르지 않고 슬라이드 모션으로도 다음 슬라이드를 볼 수 있도록 구현했습니다.

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

> <strong>1-4. 콘텐츠 검색 기능</strong>

검색 키워드를 쓰면 영화와 텔레비젼 쇼로 나누어 검색 결과가 제공됩니다.

<br/>

> <strong>1-5. 내가 저장한 콘텐츠 리스트 보기</strong>

<img width="400px" alt="스크린샷 2022-10-29 오후 8 02 29" src="https://user-images.githubusercontent.com/91457443/222675114-d57d4ad0-9cb4-4f5f-9af5-1aafb0aaa57d.png">

콘텐츠 상세보기 모달에 있는 나의 리스트에 추가하기 버튼을 클릭하면 나의 리스트에 저장됩니다. 저장한 콘텐츠는 My List 페이지에서 볼 수 있습니다.

<br/>

> <strong>1-6. 나만의 포토카드 만들기</strong>

<img width="200px" alt="스크린샷 2022-10-29 오후 8 02 29" src="https://user-images.githubusercontent.com/91457443/222675082-7b2d84ea-4b01-4577-b1ad-37396be46f34.png">

PhotoCard 페이지에서는 넣고 싶은 영화 포스터를 찾고, 해당 포스터를 canvas 기능을 통해 꾸밀 수 있습니다. 드로잉 기능과 텍스트 넣기 기능을 통해 꾸밀 수 있으며 꾸민 영화 포스터는 저장할 수 있습니다.

<br/>

## [2. 프로젝트 스펙과 파일구조 살펴보기](#목차-2-프로젝트-스펙과-파일구조-살펴보기)

><strong>2-1. 프로젝트 스펙</strong>

<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

React Query 이번 프로젝트에서 처음 사용해봤는데, 비동기 데이터를 많이 다룬 이번 프로젝트에서 정말 유용했고, 장점을 많이 느낀 라이브러리였습니다. 특히 영화 포스터나 정보를 많이 보여줘야 해 많은 리소스가 필요한 이번 프로젝트에서 맞게 쓴 라이브러리인 것 같습니다. `useEffect`를 통해 가져오는 것보다 더 적은 코드로 서버의 비동기 데이터를 가져오기 때문에 코드의 가독성이 좋아졌고, React Query 쿼리를 통한 강력한 캐싱 기능을 통해 더 빠른 속도와 성능 향상을 경험할 수 있었습니다. 뿐만 아니라 중복 요청을 방지하고, React Query의 enabeld과 같은 설정을 통해 어떤 특정 조건에서만 API를 호출할 수 있는 컨트롤 기능까지 제공해서 잘 사용해본 것 같습니다.

<img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">

Framer Motion은 React의 라이브러리로 강력한 애니메이션 기능을 제공하고, Gesture 기능을 통해 이벤트 애니메이션을 제공합니다. 이외에도 React 라이프사이클에서 컴포넌트가 사라지는 componentWillUnmount 과정에서도 애니메이션을 적용할 수도 있습니다! 이런 강력한 React 라이브러리 애니메이션을 통해 다양한 모션을 적용해야 하는 프로젝트에서 많은 것들을 적용해본 것 같습니다. 

* `variant` 기능을 통해 첫 렌더링에 로고 SVG의 선을 그리고 서서히 바탕색을 채우기 
* `useViewportScroll` 함수를 통해 스크롤을 아래로 내리면 네비게이션 헤더의 배경색 바뀌기
* `layout`과 `transition` 기능을 통한 부드러운  위치 변경
* `AnimatePresence`를 통한 슬라이더 구현

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
│   │   ├── photocard    # 포토카드 페이지와 관련된 컴포넌트
│   ├── data             # recoil atom
│   ├── hooks            # 슬라이드 로직, 나의 리스트 추가 로직 등 커스텀 훅
│   │   ├──query         # React Query과 관련된 로직
│   ├── layout           # Router 밖에서 사용되는 컴포넌트(헤더, 푸터, 로고)
│   ├── routes
│   │   ├── Home.tsx
│   │   ├── MyList.tsx
│   │   ├── Photocard.tsx
│   │   ├── Search.tsx
│   │   ├── Tv.tsx
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

><strong>3-1. 반응형 웹페이지, 모바일 터치 이벤트</strong>

데스크탑, 태블릿, 모바일을 기준으로 반응형 웹페이지를 제작했습니다. 이 프로젝트로 화면 요소를 재배치하는 것뿐만 아니라, 이벤트 처리 또한 따로 해야 한다는 것을 배웠습니다.

- 반응형 미디어 쿼리
- HTML 반응형 이미지 아트 디렉션 적용
- 모바일 반응형에는 `onTouchStart`나 `onTouchEnd`와 같은 터치 이벤트 핸들러 적용하고, `:hover`와 같은 가상 셀렉터 제거

<br />

> <strong>3-2. 성능 최적화</strong>

먼저 페이지의 대부분을 이미지가 차지하고 있고, 또 반응형 웹으로 제작하면서 화면 사이즈에 따라 사진이 변경되기 때문에 꼭 성능 최적화 작업이 필요하다고 생각했습니다.

성능을 최적화한 부분으로는

- React Query의 캐싱 기능
- 화면 사이즈에 따라 이미지 리사이징
- 모달창에는 React.lazy 기법 적용
- Resize 이벤트에 throttling 기법 적용
- HTML 반응형 이미지 아트 디렉션 적용
- 이미지에 LazyLoading 적용

lighthouse에서 측정한 결과 데스크탑 성능이 55에서 86으로 무려 20이 넘게 올랐습니다. 이미지 리사이징이 얼마나 성능 최적화에 중요한지 알게 되었던 프로젝트였습니다.

각 최적화에 과정에 대한 더 상세한 정리는 에서 볼 수 있습니다.
[Rimflix 최적화 과정](https://www.notion.so/jellieplanet/b05fee2cd8a041488559d265d019ed4d?pvs=4#51e56295dc3d4a90950afcd6d8abda23)

<br />

><strong>3-3. React Query</strong>

이 프로젝트를 통해 React Query를 처음 사용해봤는데, 서버의 비동기 데이터를 다루는 사용 경험이 굉장히 좋았습니다. swr 라이브러리와 비슷하지만 다른 측면도 많았는데, React Query가 계층적 쿼리 키를 통해 캐싱하고 값을 찾는 기능이라면 swr은 유니크한 키로 캐싱하고 값을 찾습니다. 또한 React Query가 더 많은 기능들을 내장 기능으로 제공하지만 번들사이즈가 3배나 더 큰만큼 단순한 비동기 데이터 fetching만이 목적이라면 swr을 선택하는 것도 괜찮은 것 같습니다. 

React Query에 대해 공부한 내용은 여기에서 확인할 수 있습니다.
[React Query](https://jellieplanet.notion.site/React-Query-8ea364768d3b473b9806563571e4c86a)

- 콘텐츠 박스를 hover할 때의 애니메이션 등등

<br/>

## [4. 프로젝트 후기](#목차-4-프로젝트-후기)

넷플릭스를 참고하여 림플릭스를 만들어봤는데 정말 재미있었던 작업이었습니다. 처음에는 챌린지로 만들었다가 너무 재미있어서 챌린지가 끝나고도 계속해서 여러 api를 받아오며 작업을 계속했습니다. 그렇게 만들다보니 용량이 커져서 최적화를 해야겠다는 생각이 들었고, 중간에 성능 최적화를 공부하며 프로젝트에 적용해보았습니다. 또한 배포를 하고 나니 뭔가 모바일에서는 클릭이 아니라 터치 이벤트 리스너가 더 좋겠다는 생각이 들어 다시 고치는 등 만들면서 많은 생각을 들게하고 공부가 많이 되었던 프로젝트였습니다. : )
