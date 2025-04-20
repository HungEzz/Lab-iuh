import { useCallback, useMemo, useReducer, useState } from "react";
import React from "react"

const ChildComponent=React.memo(({childState})=>{
    console.log("child comp rerender")
    return(
        <div className="w-[200px] h-[100px] bg-amber-400">
            <p>childState:{childState}</p>
        </div>
    )
})

export const ReactMemo=()=>{
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

export const UseReducer=()=>{
    const counterReducer=(state,action)=>{
        switch (action) {
            case "+":
                return ++state
            case "-":
                return --state
            default:
                break;
        }
    }
    const [counter,dispatchCounter]=useReducer(counterReducer,0);
    
    const [a,setA]=useState(0);
    const [b,setB]=useState(0)
    const calReducer=(state,action)=>{
        switch (action) {
            case '+':
                return Number(a)+Number(b)
            case '-':
                return a-b
            case '*':
                return a*b
            case '/':
                return a/b
            default:
                break;
        }
    }
    const [result,dispatchResult]=useReducer(calReducer,0);
    return (
        <div>
            <div className="border p-5 gap-2">
                <h1 className="mb-5">Inc/Dec Counter</h1>
                <p>Counter:{counter}</p>
                <button onClick={()=>{dispatchCounter("+")}}>+</button>
                <button onClick={()=>{dispatchCounter("-")}}>-</button>
            </div>
            <div className="border p-5 gap-2 flex flex-col items-center">
                <h1 className="mb-5">Calculator</h1>
                <input type='number' onChange={(e)=>setA(e.target.value)} className="border rounded-md p-2" placeholder='input a'/>
                <input type='number' onChange={(e)=>setB(e.target.value)} className="border rounded-md p-2" placeholder='input b'/>
                <div className="flex gap-2 justify-center">
                    <button onClick={()=>dispatchResult("+")}>+</button>
                    <button onClick={()=>dispatchResult("-")}>-</button>
                    <button onClick={()=>dispatchResult("*")}>*</button>
                    <button onClick={()=>dispatchResult("/")}>/</button>
                </div>
                <p>Result:{result}</p>
            </div>
        </div>
    )
}

export const UseMemo=()=>{
    const heavyFunction=(num)=>{
        console.log("run heaveFunction");
        
        let result = 0;
        for (let i = 0; i < 10000; i++) {
            result += num;
        }
        return result;
    }

    const [num,setNum]=useState(0);
    const [counter,setCounter]=useState(0);
    const result=useMemo(()=>heavyFunction(Number(num)),[num]);
    return(
        <div className="w-[500px] h-[200px] border flex flex-col items-center">
            <p className="w-full p-4">result:{result}</p>
            <input type='number' onChange={(e)=>setNum(e.target.value)} className="border p-1 w-[75%]" placeholder='input number here to heavy calculate'/>
            <button onClick={e=>setCounter(counter+1)}>Increase counter</button>
            <p>Counter:{counter}</p>
        </div>
    )
}

export const UseCallback=()=>{


    const ChildComp=({cb})=>{
        return(
            <div className="w-[300px] h-[200px] border">
                <button onClick={cb}>call cb</button>
            </div>
        )
    }

    const [state,changeState]=useState("true");
    const propFunc=useCallback(()=>{
        console.log('child comp render');
    },[])
    return(
        <div className="h-[400px] w-[600px] border flex flex-col items-center justify-between">
            <p>parent state:{state}</p>
            <button onClick={()=>changeState(state=="true"?"false":"true")}>change parent comp state</button>
            <ChildComp cb={propFunc}/>
        </div>
    )
}