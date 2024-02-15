export enum ReplyCode{
    SUCCESS,
    FAIL,
    ERROR,
}

export enum Channel{
    PROCESS="process",//m5n의 자식프로세스를 컨트롤하는 명령들의 채널
    GAME="game",//m5n내부 게임 로직을 전달하는 명령들의 채널
    //ERROR="Error", //m5n이 에러가 났다를 통보
}

export enum Process{
    START,//m5n자식프로세스를 실행시켜라
    EXIT, //m5n이 닫힘(whther well closed, or abnormally)
    STDERR, //m5n이 예기치못한 에러내뿜음(stderr를 내뱉음)
}

export enum Game{
    ESTABLISHCONNECTION="establish connection",
    SETSTONE="set_stone"
}