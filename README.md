> 추후 수정 예정

<div align="center">

# PromtPlace FE

**UMC 8th**

</div>
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

- public
  - favicons - 파비콘
  - fonts - 폰트
- src
  - assets - 사용되는 모든 에셋
  - components - 공용 컴포넌트 및 스타일
  - data - json 데이터
  - hooks - 전역으로 사용되는 훅
  - routes - 도메인 별 라우팅 페이지와 컴포넌트 및 스타일 등
  - styles - 글로벌 스타일
  - utils - 전역으로 사용되는 함수
