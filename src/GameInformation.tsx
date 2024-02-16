import { color } from "./DashBoard";

type GameInformationProps = {
    myColor:color,
}

export default function GameInformation({myColor}:GameInformationProps){    
    return (
    <>
    <div className="color-info" style={{display:"flex", height:60}}>
        <div className="my-color" style={inline_css}>
            나: {myColor===color.BLACK ? "⚫" : "⚪"}
        </div>
        <div className="opponent-color" style={inline_css}>
            상대: {myColor===color.BLACK ? "⚪" : "⚫"}
        </div>
    </div>
    </>
    );
}

const inline_css:React.CSSProperties = {
    fontSize:30,
    width:125,
    fontWeight:"bold"
}