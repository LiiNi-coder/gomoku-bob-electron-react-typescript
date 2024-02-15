import React from 'react';
import { Spinner, Button } from 'react-bootstrap';  // 예시로 react-bootstrap의 Spinner와 Button을 사용합니다.
import { matchStatus } from './DashBoard';

export default function GameControler() {
    return (
        <div>
            <Button>버튼1</Button>
            <Button>버튼2</Button>
        </div>
    );
}
