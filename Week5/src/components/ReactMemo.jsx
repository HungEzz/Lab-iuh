import React from "react"
import { useState } from "react"

const ChildComponent=React.memo(({childState})=>{
    console.log("child comp rerender")
    return(
        <div className="w-[200px] h-[100px] bg-amber-400">
            <p>childState:{childState}</p>
        </div>
    )
})
const ReactMemo=()=>{
    const [childState,setChildState]=useState("true")
    const [parentState,setParentState]=useState("true")
    return(
        <div className="w-[400px] h-[300px] flex flex-col bg-blue-400 items-center justify-between">
            <div className="flex flex-col gap-5">
                <p>parentState:{parentState}</p>
                <button onClick={()=>setParentState(parentState==="true"?"false":"true")}>change parent state</button>
                <button onClick={()=>setChildState(childState==="true"?"false":"true")}>change child state</button>
            </div>
            <ChildComponent childState={childState}></ChildComponent>
        </div>
    )
}

export default ReactMemo