import React from "react";
import { useState,useEffect } from "react";

function Cell(props){

    const [booked ,setBooked] = useState(false);

    useEffect(() => {
        if(props.highlight.includes(props.btnValue)){
            setBooked(true)
        }else{
            setBooked(false);
        }
    },[props.highlight])

    return(
        <td 
            style={{backgroundColor: booked&&'yellow'}}
            onClick={() => props.returnIndex(props.rowIndex,props.colIndex,props.btnValue)}>
            {props.btnValue}
        </td>
    )
}

export default Cell;