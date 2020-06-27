import React, { useState } from 'react';
import './App.scss';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    
}
export type FilterValuesType = "all" | "complited" | "active"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

let todoLIstID1 = v1()
let todoLIstID2 = v1()    

let [todolists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoLIstID1, title: 'What to learn', filter: 'all'},
    {id: todoLIstID2, title: 'What to buy', filter: 'all'},
])

let [tasks, setTasks] = useState({
    [todoLIstID1]: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ],
    [todoLIstID2]: [
        { id: v1(), title: "HTML&CSS2", isDone: true },
        { id: v1(), title: "JS2", isDone: true },
        { id: v1(), title: "ReactJS2", isDone: false }
    ],
})

function addTask (title: string, todoLIstID: string) {
    let newTask = {id: v1(), title: title, isDone: false}
    let todoListTasks = tasks[todoLIstID]
    tasks[todoLIstID] = [newTask, ...todoListTasks]
    setTasks({...tasks});
}

function removeTask (id: string, todoLIstID: string) {
    let todoListTasks = tasks[todoLIstID]
    tasks[todoLIstID] = todoListTasks.filter(t => t.id !== id )
    setTasks({...tasks});
}



function changeStatus (id: string, isDone: boolean, todoLIstID: string) {
    let todoListTasks = tasks[todoLIstID]
    let task = todoListTasks.find(t => t.id == id)
    if (task) {
        task.isDone = isDone
        setTasks({...tasks})
    }
}
function changeFilter (id: string, value: FilterValuesType) {
    let todoList = todolists.find(tl => tl.id === id)
    if (todoList) {
        todoList.filter = value;
        setTodoLists([...todolists])
    }
}
    
    return (
        <div className="App">
            {
                todolists.map(tl => {

                    let allTasks = tasks[tl.id]
                    let tasksForTodoList = allTasks

                    if (tl.filter === "active") {
                        tasksForTodoList = allTasks.filter(t => t.isDone === true);
                    }
                    
                    if (tl.filter === "complited") {
                        tasksForTodoList = allTasks.filter(t => t.isDone === false);
                    }

                    return (
                        <Todolist 
                        key={tl.id}
                        id={tl.id}
                        title={tl.title} 
                        tasks={tasksForTodoList} 
                        removeTask={removeTask} 
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        />
                    )
                })
            }
            {/* <Todolist 
            title="What to learn" 
            tasks={tasksForTodolist} 
            removeTask={removeTask} 
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={filter}
            /> */}
        </div>
    )
}

export default App;
