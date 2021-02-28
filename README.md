# React 部落格

## 簡介

本部落格為 React hook 的練習作品，功能含有登入登出、文章顯示、新增文章及留言板，並使用 react-router-dom 來實作路由。
留言板因 API 緣故無法實作單篇文章留言。

## 專案架構

src
App 管理路由、設置全域變數
components 組件
Navbar 導覽列
Footer 置底訊息
PostInfoCard 文章縮圖
pages 頁面
HomePage 首頁（顯示最新五篇）
Posts 全文列表
Post 單篇文章顯示
NewPost 發布文章
Login 登入頁面
Board 留言板
Register 註冊頁面
utils 通用
WebAPI.js 管理 API
contexts.js 管理要提供的 Props
auth.js 身份驗證
constants 實作 RWD 使用的常數

## 功能介紹

### 文章顯示

API 取自 Lidemy 學生專用 API Server。

#### 單篇文章顯示（ Post ）

使用 react-router-dom 的 useParams 登功能來顯示單篇文章。

#### 首頁（ HomePage ）

顯示最前五篇文章的標題以及發文時間。

#### 全部文章（ Posts ）

顯示所有文章的標題。

### 導覽列（ Navbar ）

可讓使用者藉由點選進入該功能頁，由 react-router-dom 來實作路由，再使用 useLocation 來實作 active 狀態。

### 登入登出（ Login & Logout ）

將 Session ID 存入 localStorage 的方式來進行身份驗證。登入之後 Sever 會回傳一個 JWT ( JSON Web Token )， Client 端將此 JWT 存入 localStorage。而要使用 API 時，會在 Header 中帶入此 JWT 一並傳入 Server，經過 Server 確認之後回傳使用者資訊。

使用 useContext 讓其他 Component 也能讀取 user 資料，並將 user 資料存於頂端的 App.js，並藉此讓其他子層 Components 藉此來判斷是否要顯示登入登出狀態各要顯示的畫面。 再使用 useEffect 於 render 之後驗證身份，以避免重新整理後會顯示錯誤的畫面。

登入後使用 useHistory 將使用者導入首頁。

### 發文（ NewPost ）

### 留言板（ Board ）

### 註冊（ Register ）
