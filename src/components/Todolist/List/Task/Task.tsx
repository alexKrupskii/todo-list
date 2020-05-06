import React from 'react';
import styles from './style.module.css';

type TaskType = {
    title: string
    isDone: boolean
}

const Task = (props:TaskType) => {
    return (
        <div className={styles.task}>
            <input type="checkbox" checked={props.isDone}/>
            <span>{props.title}</span>
        </div>
    );
}
export default Task;