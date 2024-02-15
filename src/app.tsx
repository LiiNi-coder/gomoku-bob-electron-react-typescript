import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"; // react-bootstrap을 적용하기 위해선 반드시 app.tsx상에 import해야함!
import Page from "./Page";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Page />
    </React.StrictMode>
);
// game_information.render(
//     <React.StrictMode>
//         <div></div>
//     </React.StrictMode>
// );