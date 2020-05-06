import styles from './App.module.css';
import React from 'react';
import Todolist from "./components/Todolist/Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const App = () => {
    const tasks: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Patterns", isDone: true}
    ];

    return (
        <div className={styles.App}>
            <Todolist tasks={tasks}/>
            <Todolist tasks={tasks}/>
            <Todolist tasks={tasks}/>
        </div>
    );
}

export default App;
