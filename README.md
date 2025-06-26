# 👀 Pickly

![image](https://github.com/user-attachments/assets/0bf3d322-9308-4e82-9e29-ced002f0444c)

**"Pickly"는 다양한 분야의 상품을 A/B 테스트 방식으로 비교하고, 리뷰와 별점을 기반으로 최적의 선택을 도와주는 상품 큐레이션 플랫폼입니다.**

---

## 🔗 배포 주소

https://pickly-gamma.vercel.app/

---

## 🛠 기술 스택

### 🎨 Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat&logo=framer&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat&logo=zoo&logoColor=white)

### 🔧 Backend
![Next.js API](https://img.shields.io/badge/Next.js%20API%20Routes-000000?style=flat&logo=next.js&logoColor=white) – 서버리스 백엔드
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) – 유튜브, 스포티파이, OpenAI 등 검색 결과 저장
![Auth](https://img.shields.io/badge/Cookie--based%20Auth-FFCC00?style=flat&logo=cookiecutter&logoColor=black) – 로그인 시 토큰을 HTTP-only 쿠키에 저장

### 🌐 External APIs
![Spotify API](https://img.shields.io/badge/Spotify-1DB954?style=flat&logo=spotify&logoColor=white) – 음악 상품 → 해당 앨범으로 연동
![YouTube API](https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube&logoColor=white) – 뮤직비디오 및 콘텐츠 제공
![Google Maps API](https://img.shields.io/badge/Google%20Maps-4285F4?style=flat&logo=googlemaps&logoColor=white) – 위치 기반 정보 연동
![OpenAI API](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white) – 상품명과 설명을 분석해 YouTube/Spotify/Google Maps 링크 자동 생성

---

## 👀 서비스 둘러보기

### 🏠 홈페이지

- 서비스 소개, 로그인/회원가입 버튼, 인기 상품 미리보기 등이 포함된 첫 진입 페이지입니다.

### 🔐 로그인 / 회원가입 페이지

- 유효성 검사와 Zustand를 활용해 로그인 시 사용자 정보를 클라이언트 상태로 관리합니다.
- 로그인 시 Next.js API Routes 기반 자체 백엔드에서 인증을 처리하며, 토큰은 HTTP-only 쿠키에 저장해 보안성을 높였습니다.
https://github.com/user-attachments/assets/e1ac0d29-9fad-4ff3-b00d-f7c24a7eb675



### 🧭 메인 페이지

- 상품 검색, 카테고리별 정렬, 무한 스크롤 로딩 기능 구현
https://github.com/user-attachments/assets/52d0f46a-960e-47b1-a57b-a62ffb6a3c37

- **상품 추가 기능**으로 직접 상품을 등록할 수 있습니다.
https://github.com/user-attachments/assets/94dc0b5f-bd62-464c-903c-b45be65c2873

### 📄 상품 상세 페이지

- 찜하기, 리뷰 작성/수정/삭제, 비교 기능 제공
- 상품 등록자에게는 편집 및 삭제 기능이 추가로 제공됩니다.
https://github.com/user-attachments/assets/0200de9a-2311-497c-8e46-8ca6ad687411
https://github.com/user-attachments/assets/252a6d6a-7ac5-4702-bd84-18de424a8678

### ⚖️ 비교하기 페이지

- 리뷰 수, 평균 별점, 찜 수를 기준으로 두 상품을 비교합니다.
- 로그인하지 않아도 게스트 모드로 이용 가능합니다.
https://github.com/user-attachments/assets/b12da69e-e9eb-413e-b2b4-34a27e61ee3c

---

## 📁 폴더 구조

```bash
├───public
│   ├───animations
│   ├───icons
│   └───images
└───src
    ├───app
    │   ├───api
    │   │   ├───cookie
    │   │   ├───login
    │   │   ├───logout
    │   │   ├───openai
    │   │   │   ├───extract-movie
    │   │   │   ├───extract-music
    │   │   │   └───extract-place
    │   │   ├───spotify-token
    │   │   └───youtube-search
    │   ├───compare
    │   ├───homepage
    │   │   └───[id]
    │   ├───landingpage
    │   ├───mypage
    │   ├───product
    │   │   └───[id]
    │   ├───providers
    │   ├───signin
    │   ├───signup
    │   │   └───[provider]
    │   ├───test
    │   │   └───input
    │   └───users
    │       └───[id]
    ├───components
    │   ├───input
    │   └───shared
    ├───features
    │   ├───compare
    │   │   ├───api
    │   │   ├───components
    │   │   ├───hooks
    │   │   └───types
    │   ├───header
    │   │   └───hooks
    │   ├───home
    │   │   ├───components
    │   │   ├───modals
    │   │   │   └───store
    │   │   ├───services
    │   │   └───types
    │   ├───landing
    │   │   └───components
    │   ├───productId
    │   │   ├───components
    │   │   │   ├───modal
    │   │   │   │   ├───ProductCompareModal
    │   │   │   │   └───ProductReviewModal
    │   │   │   ├───ProductApi
    │   │   │   ├───ProductIdDetail
    │   │   │   ├───ProductIdStats
    │   │   │   └───ProductReviews
    │   │   ├───hooks
    │   │   └───libs
    │   ├───Profile
    │   │   ├───api
    │   │   ├───components
    │   │   ├───hook
    │   │   └───types
    │   ├───signin
    │   │   └───components
    │   └───signup
    │       └───components
    ├───lib
    │   ├───axios
    │   └───utils
    └───types
```

## 설치 및 실행 방법
```bash
git clone https://github.com/part4-team6/Pickly.git
cd pickly
npm install
npm run dev
```

## 커밋 컨벤션 & 브랜치 전략
### 폴더/파일명 네이밍 컨벤션

| **대상** | **규칙** | **예시** |
| --- | --- | --- |
| 폴더명 | 케밥케이스 (kebab-case) | components, user-profile |
| 컴포넌트 파일명 | 파스칼케이스 (PascalCase) | UserProfile.jsx |
| 스타일 파일명 | 케밥케이스 + .styles.js | user-profile.styles.js |
| 이미지/아이콘 파일명 | 케밥케이스 | logo-icon.png, profile-default.png |
| 함수명/변수명 | 카멜케이스 (camelCase) | fetchUserData, userList |
| 환경변수 | 대문자+스네이크케이스 | REACT_APP_API_URL |

### 브랜치 네이밍 컨벤션

| 역할 | 네이밍 | 예시 |
| --- | --- | --- |
| 메인 브랜치(배포용) | main | main/ |
| 기능 개발 브랜치 | feature/기능명 | feature/이름/dashboard-modal |
| 긴급 수정 브랜치 | hotfix/이슈명 | hotfix/이름/login-error |
| 릴리즈 준비 브랜치 | release/버전명 | release/이름/v1.0.0 |
| 스타일 수정 브랜치 | style/스타일이름 | style/이름/login-mobile |


##  프로젝트 기간
**2025.05.26 ~ 2025.06.24 (약 한 달, 일요일 제외)**

## 팀 소개 및 역할 분담


| 이름 | 담당 파트 | 주요 작업 |
|------|-----------|------------|
| ![김수연](https://github.com/ramong26) <br> 김수연 | 상세 페이지, 외부 API 연동 | - 상세페이지 구현<br>- Spotify, YouTube, Google Maps, OpenAI 외부 API 연동<br>- MongoDB 연결<br>- Zustand로 유저 상태 관리 및 비교 상품 등록 기능 |
| ![박하은](https://github.com/prkhaeun) <br> 박하은 | 비교하기 페이지 | - A/B 테스트 기반 비교하기 UI 및 기능 구현 | Zustand 등록된 비교 상품 기능 연동
| ![손혁진](https://github.com/sssson0) <br> 손혁진 | 마이페이지 / 유저페이지 | - 유저 개인 정보, 활동 내역 | 유저 팔로우, 팔로잉 모달 생성 
| ![송미진](https://github.com/songmijin824) <br> 송미진 | 로그인 / 회원가입 / 에러 페이지 | - 유효성 검사 포함 로그인 및 회원가입 기능<br>- 에러 페이지 전반 |
| ![홍승원](https://github.com/sssson0) <br> 홍승원 | 랜딩페이지 / 홈페이지 / 인프라 | - 메인 페이지(랜딩/홈) UI 구현<br>- 로딩 처리<br>- 백엔드 API 개발 (Next.js API Routes)<br>- 카테고리 페이지<br>- 공통 컴포넌트(헤더)<br>- SEO 최적화, 환경설정 |

## 차별점
- 카테고리별로 상품을 비교(A/B 테스트)하고, 리뷰 기반 랭킹 시스템을 제공합니다.
- OpenAI를 통해 자동으로 유튜브/스포티파이/지도 콘텐츠를 연동해 정보 탐색 비용을 줄였습니다.
- 로그인 없이도 비교 기능을 제공하며, 상태 관리와 백엔드를 Next.js 기반으로 통합하여 효율적인 개발이 가능했습니다.
