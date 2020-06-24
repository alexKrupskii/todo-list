import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import style from './Todolist.module.scss'


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
    changeStatus: (id: string, isDone: boolean) => void
    filter: string
}

export function Todolist(props: PropsType) {

let [title, setTitle] = useState('');
let [error, setError] = useState<string | null>(null);

const addTask = () => {
    if (title.trim() !== '') {
        props.addTask(title);
        setTitle('')
    } else {
        setError('Title is required')
    }

};
const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle (e.currentTarget.value);
const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
        addTask();
    }
};

const onAllClickHandler = () => props.changeFilter("all");
const onActiveClickHandler = ()=> props.changeFilter("active");
const onComplitedClickHandler = ()=> props.changeFilter("complited");



    return <div className={style.todoList}>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? style.error : ''}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map( (t) =>  {
                    const onClickHandler = () => {props.removeTask(t.id)};
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked)
                        };
                    return <li key={t.id}
                               className={t.isDone ? style.isDone : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button></li>})
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? style.activeFilter : ''}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? style.activeFilter : ''}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'complited' ? style.activeFilter : ''}
                    onClick={onComplitedClickHandler}>Completed</button>
        </div>
    </div>
}
