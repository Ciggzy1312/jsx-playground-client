import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";

const CellList: React.FC = ()=>{

    const cells = useTypedSelector(({cells})=>{
        return cells?.order.map((id)=>{
            return cells.data[id]
        })
    })

    const renderedCells = cells && cells.map((cell)=>{
        return <CellListItem key={cell.id} cell={cell} /> 
    })

    return (
        <div>{renderedCells}</div>
    )
}

export default CellList