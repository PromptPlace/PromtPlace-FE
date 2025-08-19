<div align="center">

<img src="https://capsule-render.vercel.app/api?type=transparent&fontColor=2979FF&section=header&height=90&text=Prompt%20Place%20FE&fontSize=60" />
<img src="https://capsule-render.vercel.app/api?type=transparent&fontColor=0D47A1&section=header&height=80&text=UMC%208th&fontSize=20" />

</div>
<br>

## 🔹 서비스 소개
<img width="4768" height="412" alt="image" src="https://github.com/user-attachments/assets/6d2e0581-1199-4f97-a30c-9daf4033915a" />

<h3>프롬프트 플레이스는 프롬프트를 공유하고 거래하는 마켓플레이스 서비스입니다.</h3>

1. **프롬프트 다운로드** 다른 사용자가 업로드한 프롬프트를 구매하거나, 무료로 다운받을 수 있습니다.
    
2. **프롬프트 리뷰** 해당 프롬프트 구매자의 리뷰와 평점을 확인할 수 있습니다.
3. **프롬프트 업로드** 내가 작성한 프롬프트를 공유하거나 판매할 수 있습니다.
4. **프롬프터 프로필** 프롬프트 작성자에 대한 정보를 알 수 있습니다.
5. **프롬프트 작성 가이드 및 가이드라인 제공** 분야별 프롬프트 작성 가이드를 제공하고 프롬프트 작성 시 유의사항(저작권 등)을 공지합니다.

<br>

## 💻 기술 스택

| **역할** | **종류** | **선정 이유** |
| --- | --- | --- |
| Library | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> | 컴포넌트 기반 구조로 재사용성과 유지보수성이 높아 개발 효율을 극대화 가능 |
| Programming Language | <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> | 정적 타입을 제공하여 코드의 안정성과 가독성을 높이고, 개발 중 오류를 사전에 방지할 수 있어 유지보수에 유리 |
| Styling | <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> | 유틸리티 클래스 기반의 스타일링으로 반복되는 CSS 코드 작성을 줄이고, 빠르고 일관된 UI 구현 가능 |
| Data Fetching | <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> | 직관적인 API 사용법과 자동 JSON 변환 기능으로 비동기 통신이 간편 |
| Routing | <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white"> | SPA에 최적화된 라우팅 기능 제공, 선언적 방식으로 라우트를 쉽게 구성 가능 |
| Formatting | <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-000000?style=for-the-badge&logo=prettier&logoColor=F7B93E"> <img src="https://img.shields.io/badge/stylelint-263238?style=for-the-badge&logo=stylelint&logoColor=white"> | 코드 스타일을 통일하고 잠재적인 오류를 사전에 방지하여 협업 시 효율성을 높임 |
| Package Manager | <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"> | 고유한 패키지 캐싱 방식으로 설치 속도가 빠르고 디스크 공간을 효율적으로 사용하며, 모노레포 환경에 적합 |
| Deployment | <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> | Git 연동 기반의 자동 배포, 프론트엔드 프로젝트에 최적화된 환경 제공으로 빠른 개발 및 배포 사이클 지원 |
| CI/CD | <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"> | 코드 푸시 시 자동으로 배포를 실행해 개발 효율성과 안정성을 높임 |
| Bundler | <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> | 빠른 서버 시작과 모듈 번들링 성능으로 개발 생산성을 향상 |

<br>

## ✅ Package Manager

- **pnpm 버전**
  - 10.12.1

- **pnpm 버전 설치 방법**
```
pnpm set version 버전 # 프로젝트 최상위 폴더 위치에서 명령어 입력
```

- **pnpm 명령어 예시**
```
pnpm install # 전체 설치
pnpm add 라이브러리 # 라이브러리 설치
pnpm dev # 실행
```

<br>

## ⌨️ Code Styling

- **camelCase**
  - 변수명, 함수명에 적용
  - 첫글자는 소문자로 시작, 띄어쓰기는 붙이고 뒷 단어의 시작을 대문자로
    - ex- handleDelete
  - 언더바 사용 X (클래스명은 허용)

<br>

## 🔗 Git Convention

### 📌 Git Flow

```
develop ← 작업 브랜치
```

- `main branch` : 배포 브랜치
- `develop branch` : 개발 브랜치, feature 브랜치가 merge됨
- `feature branch` : 페이지/기능 브랜치

<br>

### ✨ Flow
- 이슈 생성
- 이슈 번호에 맞게 `develop 브랜치`에서 새로운 브랜치를 생성
- 작업을 완료하고 커밋 컨벤션에 맞게 커밋
- Pull Request 생성
- 코드 리뷰 후 `develop` 브랜치로 병합

<br>

### 🌱 Code Review
- **한 명**의 승인 필요
- pr 보내고 연락 남기기
- 가장 먼저 보는 사람이 리뷰 남기기
- 머지는 pr 올린 사람이

<br>

### 🔥 Commit Message Convention

- **커밋 유형**
  - 🎉 Init: 프로젝트 세팅
  - ✨ Feat: 새로운 기능 추가
  - 🐛 Fix : 버그 수정
  - 💄 Design : UI(CSS) 수정
  - ✏️ Typing Error : 오타 수정
  - 📝 Docs : 문서 수정
  - 🚚 Mod : 폴더 구조 이동 및 파일 이름 수정
  - 💡 Add : 파일 추가 (ex- 이미지 추가)
  - 🔥 Del : 파일 삭제
  - ♻️ Refactor : 코드 리펙토링
  - 🚧 Chore : 배포, 빌드 등 기타 작업
  - 🔀 Merge : 브랜치 병합

- **형식**: `커밋유형: 상세설명 (#이슈번호)`
- **예시**:
  - 🎉 Init: 프로젝트 초기 세팅 (#1)
  - ✨ Feat: 메인페이지 개발 (#2)

<br>

### 🌿 Branch Convention

**Branch Naming 규칙**

- **브랜치 종류**
  - `init`: 프로젝트 세팅
  - `feat`: 새로운 기능 추가
  - `fix` : 버그 수정
  - `refactor` : 코드 리펙토링

- **형식**: `브랜치종류/#이슈번호/상세기능`
- **예시**:
  - init/#1/init
  - fix/#2/splash

<br>

### 📋 Issue Convention

**Issue Title 규칙**

- **태그 목록**:
  - `Init`: 프로젝트 세팅
  - `Feat`: 새로운 기능 추가
  - `Fix` : 버그 수정
  - `Refactor` : 코드 리펙토링

- **형식**: [태그] 작업 요약
- **예시**:
  - [Init] 프로젝트 초기 세팅
  - [Feat] Header 컴포넌트 구현

<br>

## 📂 프로젝트 구조

```
📦PROMPTPLACE_FE
 ┣ 📂.github
 ┃ ┣ 📂ISSUE_TEMPLATE
 ┃ ┗ 📜pull_request_template.md
 ┣ 📂public
 ┃ ┣ 📂favicons
 ┃ ┗ 📂fonts
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┣ 📂assets
 ┃ ┣ 📂components
 ┃ ┣ 📂constants
 ┃ ┣ 📂context
 ┃ ┣ 📂data
 ┃ ┣ 📂enums
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📂mutations
 ┃ ┃ ┣ 📂queries
 ┃ ┣ 📂layouts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂callback
 ┃ ┃ ┣ 📂MainPage
 ┃ ┃ ┣ 📂MyPage
 ┃ ┃ ┣ 📂NotFoundPage
 ┃ ┃ ┣ 📂ProfilePage
 ┃ ┃ ┣ 📂PromptCreatePage
 ┃ ┃ ┣ 📂PromptDetailPage
 ┃ ┃ ┣ 📂PromptEdit
 ┃ ┃ ┗ 📂PromptGuidePage
 ┃ ┣ 📂routes
 ┃ ┣ 📂types
 ┃ ┣ 📂utils
 ┃ ┣ 📜App.tsx
 ┃ ┗ 📜main.jsx
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜.stylelintrc
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜pnpm-lock.yaml
 ┣ 📜README.md
 ┣ 📜tsconfig.app.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┣ 📜vercel.json
 ┗ 📜vite.config.ts
```

- public
  - favicons - 파비콘
  - fonts - 폰트
- src
  - apis - 서버와 통신하는 API 함수 모음
  - assets - 사용되는 모든 에셋
  - components - 공용 컴포넌트 및 스타일
  - data - json 데이터
  - hooks - 전역으로 사용되는 훅
    - mutaions - React Query의 useMutation 훅 관련 로직
    - queries - React Query의 useQuery / useInfiniteQuery 관련 로직
  - layouts - 페이지의 공통 레이아웃 컴포넌트
  - pages - 실제 라우팅되는 페이지 컴포넌트
  - routes - 도메인 별 라우팅 페이지와 컴포넌트 및 스타일 등
  - types - TypeScript 타입 정의 모음
  - utils - 전역으로 사용되는 함수

<details>
  <summary> <h3>🔍 개발 중 어려움과 해결 과정</h3></summary>
  <h3><a href="https://www.notion.so/24f87a06720780958686fb8cf470032a"> 🔗 노션 링크</a></h3>

  <br/>

  | ✔️ 서비스 워커 캐시 문제로 배포가 반영되지 않는 문제 | |
  | ----- | ----- | 
  | <img width="1532" height="806" alt="image" src="https://github.com/user-attachments/assets/f3a6cb6b-0b47-4a00-b452-b0a4561453ee" /> | <img width="766" height="859" alt="스크린샷 2025-08-16 오전 9 00 09" src="https://github.com/user-attachments/assets/0f8c05b7-bdf2-4b51-af55-420dd97e7af6" /> | 

  | ✔️ tanstack query key 사용으로 즉각적인 데이터 변화 반영이 되지 않는 문제 |
  | ----- |
  | <img width="1532" height="1446" alt="image" src="https://github.com/user-attachments/assets/61fabfa8-7307-4142-a1eb-4c22f8733699" /> |

  | ✔️ 메인페이지 팔로우/언팔로우 문제 | 1. 메인페이지 팔로우/언팔로우 초기값 문제 |
  | ----- | ----- |
  | <img width="1532" height="1638" alt="image" src="https://github.com/user-attachments/assets/b251d384-a0b8-4b0d-9e00-65fdfa6e883d" /> | <img width="1532" height="342" alt="image" src="https://github.com/user-attachments/assets/7084e82f-3837-4baf-a196-cc609115cbcb" /> |
  
⬇️ 로그인 후 메인페이지에 초기 접속 시 팔로우 / 언팔로우 상태 반영이 제대로 되지 않는다.

https://github.com/user-attachments/assets/6a5b0182-1564-4cfd-903d-2405e92d862c


  | 2. 팔로우/언팔로우 상태 변화 미반영 문제 | 3. Optimistic Update를 활용한 문제 해결 |
  | ----- | ----- |
  | <img width="1532" height="1566" alt="image" src="https://github.com/user-attachments/assets/01800a50-fd10-4373-bddd-3ff42ce8d4f8" /> | <img width="1532" height="1566" alt="image" src="https://github.com/user-attachments/assets/3be43cfe-4d15-4601-80c8-14ac15fdb6fe" /> |

⬇️ 팔로우 버튼을 사용자가 클릭한 후 화면이 리랜더링 되어야만 isFollow 상태가 반영된다.

https://github.com/user-attachments/assets/c6342975-184a-4ecf-823e-de3ee54e933f

⬇️ Optimistic Update를 활용해 UI 변경이 안되는 문제와 useState문제를 동시에 해결해보고자 하였다. 

https://github.com/user-attachments/assets/d0e4c89b-07c6-466c-bde7-5021988ddb98

  
</details>
