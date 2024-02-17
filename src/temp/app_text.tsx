import React from 'react';
import ReactDOM from 'react-dom/client';

const Temp = ()=>
{
    const { ipcRenderer } = window.require("electron");
    console.log(window);
    return (
        <h1>테스트</h1>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Temp />
    </React.StrictMode>
);