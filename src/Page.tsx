import Board from "./Board";
import DashBoard from "./DashBoard";
const Page = ()=>{
    return (
        <div style={parent_inline_sytle}>
            <div style={dashboard_inline_style}>
                <DashBoard />
            </div>
            <div>
                <Board />
            </div>
        </div>
    );
}
export default Page;

const parent_inline_sytle:React.CSSProperties = {
    display:"flex",/* 자식들 가로배치 */
    alignItems:"flex-start"/* flex하면 두번째자식이 첫번째자식의 height를 따라가는 문제있어서 이를 무시 */
}
const dashboard_inline_style:React.CSSProperties = {
    width:250
}