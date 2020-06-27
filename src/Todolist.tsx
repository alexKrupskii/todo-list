import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import style from './Todolist.module.scss';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoLIstID: string) => void
    changeFilter: (id: string, value: FilterValuesType) => void
    addTask: (title: string, todoLIstID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoLIstID: string) => void
    filter: FilterValuesType 
}

export function Todolist(props: PropsType) {

let [title, setTitle] = useState('');
let [error, setError] = useState<string | null>(null);

const addTask = () => {
    if (title.trim() !== '') {
        props.addTask(title, props.id);
        setTitle('')
    } else {
        setError('Title is required')
    }
};

const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
        addTask();
    }
};

const onAllClickHandler = () => props.changeFilter(props.id, "all")
const onActiveClickHandler = () => props.changeFilter(props.id, "active")
const onComplitedClickHandler = () => props.changeFilter(props.id, "complited")

    return <div className={style.todoList}>
        <h3>{props.title}</h3>
        <div className={style.inputTask}>
            <input className={error ? style.error : ''}
                value={title} 
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map( t => {
                const onClickHandler = () => props.removeTask(t.id, props.id)
                const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                }
                return <li key={t.id} className={t.isDone ? style.isDone : ''}>
                       <input  onChange={onChangeHandler} type="checkbox" checked={t.isDone}/> 
                       <span>{t.title}</span>
                       <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div className={style.buttons}>
            <button className={props.filter === 'all' ? style.activLink : ''} 
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? style.activLink : ''} 
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'complited' ? style.activLink : ''} 
                    onClick={onComplitedClickHandler}>Completed</button>
        </div>
    </div>
}
