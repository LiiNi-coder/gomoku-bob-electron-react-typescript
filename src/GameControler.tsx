import React from 'react';
import { Spinner, Button } from 'react-bootstrap';  // 예시로 react-bootstrap의 Spinner와 Button을 사용합니다.
import { matchStatus } from './DashBoard';

type gameControlerProps = {
    isMatched:matchStatus;
}

export default function GameControler({isMatched}:gameControlerProps) {
    switch(isMatched) {
        case matchStatus.UNMATCHED:
            return null;  // 아무것도 렌더링하지 않습니다.
        case matchStatus.MATCHING:
            return <Spinner animation="border" />;  // 로딩창을 렌더링합니다.
        case matchStatus.MATCHED:
            return (
                <div>
                    <Button>버튼1</Button>
                    <Button>버튼2</Button>
                </div>
            );
        default:
            return <p>에러</p>;  // matchStatus가 0, 1, 2 이외의 값일 경우 아무것도 렌더링하지 않습니다.
    }
}
