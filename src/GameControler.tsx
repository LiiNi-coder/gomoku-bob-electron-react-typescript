import React, { useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';  // 예시로 react-bootstrap의 Spinner와 Button을 사용합니다.
import { turnStatus } from './Page';
import { Channel, Game } from './protocol';
import { color } from './DashBoard';
const { ipcRenderer } = window.require("electron");

type gameControlerProps = {
    nowTurn:turnStatus
}

export default function GameControler({nowTurn}:gameControlerProps) {
    return (
    <>
    {nowTurn===turnStatus.CHOOSECOLOR && <ChooseColorButtons />}
    </>
    );
}

const ChooseColorButtons = ()=>{
    return(
    <>
    <p>자신의 색깔을 골라주세요.</p>
    <Button onClick={()=>ipcRenderer.send(Channel.GAME, color.WHITE)} variant="secondary">⚪</Button>
    <Button onClick={()=>ipcRenderer.send(Channel.GAME, color.BLACK)} variant="secondary">⚫</Button>
    </>
    );
}