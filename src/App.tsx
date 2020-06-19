import React, { useState } from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterValuesType = "all" | "complited" | "active" 

function App() {

let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false }
]);

let [filter, setFilter] = useState("all");

function addTask (title: string) {
    let task = {id: v1(), title: title, isDone: false};
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
}

function removeTask (id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id );
    setTasks(filteredTasks);
}

function changeFilter (value: FilterValuesType) {
    setFilter(value);
}

let tasksForTodolist = tasks;

if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
}

if (filter === "complited") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
}
    
    return (
        <div className="App">
            <Todolist 
            title="What to learn" 
            tasks={tasksForTodolist} 
            removeTask={removeTask} 
            changeFilter={changeFilter}
            addTask={addTask}
            />
        </div>
    )
}

export default App;
