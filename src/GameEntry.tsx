import React from 'react';
import { matchStatus } from "./Page";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import { MouseEventHandler } from "react";

type GameEntryProps = {
    isMatched:matchStatus
    handleAiLocalPlayClick:MouseEventHandler<HTMLButtonElement>
}

export default function GameEntry({isMatched, handleAiLocalPlayClick}:GameEntryProps){
    switch(isMatched){
        case matchStatus.UNMATCHED:
            return (<Button variant="primary" onClick={handleAiLocalPlayClick}>[myAI]Local Server대전 시작</Button>);
        case matchStatus.MATCHING:
            return (
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />상대를 찾고 있습니다...
            </Button>);  // 로딩창을 렌더링합니다.
        case matchStatus.MATCHED:
            return (
            <Button variant="primary" disabled>
                상대와의 대국 진행중
            </Button>
            );
    }
}