import React, { useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';  // 예시로 react-bootstrap의 Spinner와 Button을 사용합니다.
import { matchStatus } from './DashBoard';

export default function GameControler() {
    
    //맨처음 렌더링되었을때 == 게임이성사되었을때
    useEffect(()=>{
        ;
    }, [])


    return (
        <div>
            <Button>버튼1</Button>
            <Button>버튼2</Button>
        </div>
    );
}
