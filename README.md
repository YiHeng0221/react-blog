# React 部落格

網址：[Heng's Blog](https://yiheng0221.github.io/react-blog/)

## 簡介

本部落格為 React hook 的練習作品，功能含有登入登出、文章顯示、新增文章及留言板，並使用 react-router-dom 來實作路由。
留言板因 API 緣故無法實作單篇文章留言。

## 專案架構

src
＿App 管理路由、設置全域變數
＿components 組件
＿＿Burger 漢堡表單
＿＿Footer 置底訊息
＿＿Loading 載入中畫面
＿＿Menu 直列表單
＿＿Navbar 導覽列
＿＿PostInfoCard 文章資訊
＿pages 頁面
＿＿Board 留言板
＿＿HomePage 首頁（顯示最新五篇）
＿＿Login 登入頁面
＿＿NewPost 發布文章
＿＿Post 單篇文章顯示
＿＿Posts 全文列表
＿＿Register 註冊頁面
＿RWD CSS 實作 RWD 使用的常數
＿utils 通用
＿＿auth.js 身份驗證
＿＿contexts.js 管理要提供的 Props
＿＿useRWD.js 實作 RWD 的 custom hook
＿＿WebAPI.js 管理 API

## 功能介紹

### 文章顯示

API 取自 Lidemy 學生專用 API Server。

#### 單篇文章顯示（ Post ）

使用 react-router-dom 的 useParams 功能來顯示單篇文章。

#### 首頁（ HomePage ）

顯示最前五篇文章的標題以及發文時間。

#### 全部文章（ Posts ）

顯示所有文章的標題。

### 導覽列（ Navbar ）

可讓使用者藉由點選進入該功能頁，由 react-router-dom 來實作路由，再使用 useLocation 來實作 active 狀態。

使用 custom hook 及 css Media query 來實作 RWD，於手機螢幕會顯示漢堡清單，平板螢幕會將 logo 及導覽列分為兩行，電腦螢幕則為單行。使用和 Boostrap 相同的標準來分辨裝置。

### 登入登出（ Login & Logout ）

將 Session ID 存入 localStorage 的方式來進行身份驗證。登入之後 Sever 會回傳一個 JWT ( JSON Web Token )， Client 端將此 JWT 存入 localStorage。而要使用 API 時，會在 Header 中帶入此 JWT 一並傳入 Server，經過 Server 確認之後回傳使用者資訊。

使用 useContext 讓其他 Component 也能讀取 user 資料，並將 user 資料存於頂端的 App.js，並藉此讓其他子層 Components 藉此來判斷是否要顯示登入登出狀態各要顯示的畫面。 再使用 useEffect 於 render 之後驗證身份，以避免重新整理後會顯示錯誤的畫面。

登入後使用 useHistory 將使用者導入首頁。

另有註冊鈕可導向註冊頁面。

### 發文（ NewPost )

輸入文章標題及內文，點擊送出會將使用者導向至首頁，內文或標題其一未輸入時，會於 placeholder 顯示 Server 回傳的錯誤訊息。

點擊預覽會顯示出發文後的文章頁面預覽，接下來點擊畫面內任一處即可回到發文頁面。

### 留言板（ Board ）

不需註冊即可使用，結合發留言及顯示留言功能。輸入暱稱及內文點擊送出即可。暱稱及內文其一未輸入時，會於 placeholder 顯示 Server 回傳的錯誤訊息。

### 註冊（ Register ）

需輸入暱稱、帳號及密碼，因爲 API 緣故，註冊後密碼統一會更改成 Lidemy，註冊完畢使用 useContext 帶入登入狀態，並使用 useHistory 導向至首頁。
