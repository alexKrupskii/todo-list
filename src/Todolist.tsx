import React, { useState } from 'react';
import {FilterValuesType} from './App';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}


export function Todolist(props: PropsType) {

let [title, setTitle] = useState('');

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={e => {setTitle (e.currentTarget.value)}}/>
            <button onClick={()=>{props.addTask(title)}}>+</button>
        </div>
        <ul>
            {
                props.tasks.map( t =>  <li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={ () => {props.removeTask(t.id)} }>x</button></li>)
            }
        </ul>
        <div>
            <button onClick={()=> {props.changeFilter("all")}}>All</button>
            <button onClick={()=> {props.changeFilter("active")}}>Active</button>
            <button onClick={()=> {props.changeFilter("complited")}}>Completed</button>
        </div>
    </div>
}
