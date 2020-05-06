import React from 'react';
import styles from './style.module.css';
import Task from "./Task/Task";
import {TaskType} from "../../../App";

type PropsType = {
    tasks: Array<TaskType>
}

const List = (props: PropsType) => {
    let tasksElements = props.tasks
        .map( t => <Task title={t.title} isDone={t.isDone}/>)
    return (
        <div className={styles.list}>
            {tasksElements}
        </div>
    );
}

export default List;
