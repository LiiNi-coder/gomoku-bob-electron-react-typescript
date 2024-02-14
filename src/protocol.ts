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
    CLOESED, //m5n이 닫힘
}

export enum Game{
    SETSTONE="set_stone"
}