import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

const CellList: React.FC = ()=>{

    const cells = useTypedSelector(({cells})=>{
        return cells?.order.map((id)=>{
            return cells.data[id]
        })
    })

    const renderedCells = cells && cells.map((cell)=>{
        return <Fragment key={cell.id}>
            <AddCell cellId={cell.id}/>
            <CellListItem cell={cell} /> 
        </Fragment>
    })

    return (
        <div>
            {renderedCells}
            <AddCell forceVisible={cells?.length==0} cellId={null}/>
        </div>
    )
}

export default CellList