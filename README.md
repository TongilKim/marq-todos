## 실행 방법

### `yarn install`

프로젝트를 설치 합니다.

### `yarn start`

개발 모드에서 앱을 실행합니다.

### `yarn build`

배포용 파일을 public 폴더에 빌드합니다.

### `cd build & npx serve`

테스트 & 빌드 동작 및 배포된 파일을 브라우저에서 확인할 수 있습니다.

---

<br/>

## Application 
<img width="597" alt="image" src="https://user-images.githubusercontent.com/35641052/219678055-e0e8a60f-3cfd-4de6-81e6-9f803741d176.png">

---

<br/>

## 파일구조

📦src <br/>
┣ 📂api -> `API request 함수 정의`<br/>
┃ ┗ 📂todo <br/>
┃ ┃ ┗ 📜index.tsx <br/>
┣ 📂common -> `공통적으로 사용되는 컴포넌트`<br/>
┃ ┣ 📜Loader.scss<br/>
┃ ┣ 📜Loader.tsx <br/>
┃ ┣ 📜Snackbar.module.css <br/>
┃ ┣ 📜Snackbar.tsx <br/>
┃ ┣ 📜TodoEditModal.scss <br/>
┃ ┗ 📜TodoEditModal.tsx <br/>
┣ 📂components -> `화면을 구성하는 컴포넌트`<br/>
┃ ┣ 📜TodoContainer.scss <br/>
┃ ┣ 📜TodoContainer.tsx <br/>
┃ ┣ 📜TodoCreateBtn.scss <br/>
┃ ┣ 📜TodoCreateBtn.tsx <br/>
┃ ┣ 📜TodoHeader.scss <br/>
┃ ┣ 📜TodoHeader.tsx <br/>
┃ ┣ 📜TodoItem.scss <br/>
┃ ┣ 📜TodoItem.tsx <br/>
┃ ┣ 📜TodoList.scss <br/>
┃ ┗ 📜TodoList.tsx <br/>
┣ 📂mocks <br/>
┃ ┣ 📜browser.ts <br/>
┃ ┗ 📜handlers.ts <br/>
┣ 📂stores -> `Client State를 관리하는 Store` <br/>
┃ ┣ 📂slice <br/>
┃ ┃ ┣ 📜SnackbarSlice.tsx -> `snackbar에 대한 state 관리 (ex. snackbar open/close)` <br/>
┃ ┃ ┗ 📜TodoSlice.tsx -> `todo에 대한 state 관리 (ex. todo list, selected todo)`<br/>
┃ ┣ 📜hooks.tsx <br/>
┃ ┗ 📜index.tsx <br/>
┣ 📂types <br/>
┃ ┗ 📜index.tsx -> `글로벌로 사용 되는 type 선언`<br/>
┣ 📂utils <br/>
┃ ┗ 📜index.tsx -> `글로벌로 사용 되는 유틸 함수 선언`<br/>
┣ 📜.DS_Store <br/>
┣ 📜App.css <br/>
┣ 📜App.test.tsx <br/>
┣ 📜App.tsx <br/>
┣ 📜constant.ts -> `공통적으로 그리고 글로벌적으로 일관성 있는 값을 사용 할 상수 선언` <br/>
┣ 📜declarations.d.ts <br/>
┣ 📜index.css <br/>
┣ 📜index.tsx <br/>
┣ 📜logo.svg <br/>
┣ 📜react-app-env.d.ts <br/>
┣ 📜reportWebVitals.ts <br/>
┗ 📜setupTests.ts <br/>

---

<br/>

## 기술 스택

### redux-toolkit

- client state 관리를 위해 적용.

### Webpack

- bundle 하기 위해 사용.
- dev/prod 환경에 따라, 작업을 분기하기 위해서 사용
- 목적에 따라 webpack.dev.js / webpack.prod.js 분리
- 공통적으로 사용 되는 내용은 webpack.common.js에 적용
- hot reload 적용
- `yarn build` 스크립트 사용시 public 폴더에 js, css 파일 export

### DB

- 브라우저 LocalStorage 사용
---
