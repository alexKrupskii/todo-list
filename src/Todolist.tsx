import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from './AppWithRedux';
import style from './Todolist.module.scss';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import {IconButton, Button, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {changeTaskStatusAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoLIstID: string) => void
    changeFilter: (id: string, value: FilterValuesType) => void
    addTask: (title: string, todoLIstID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoLIstID: string) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    changeTitle: (id: string, title: string, todoLIstID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo( (props: PropsType) => {

    const dispatch = useDispatch();

const addTask = useCallback ( (title: string) => {
    props.addTask(title, props.id);
}, []);

const removeTodoList = () => {
    props.removeTodoList(props.id)
};

const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
};

const onAllClickHandler = () => props.changeFilter(props.id, "all");
const onActiveClickHandler = () => props.changeFilter(props.id, "active");
const onComplitedClickHandler = () => props.changeFilter(props.id, "completed");

let tasksForTodoList = props.tasks;

    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true);
    }

    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false);
    }



    return <div className={style.todoList}>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodoList}><Delete/></IconButton></h3>
        <AddItemForm addItem={addTask}/>
        <div className={style.task}>
            {
                tasksForTodoList.map( t => {
                const onClickHandler = () => props.removeTask(t.id, props.id);
                const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                };
                const onChangeTaskTitle = (title: string) => {
                    props.changeTitle(t.id, title, props.id)
                };
                return <div key={t.id} className={t.isDone ? style.isDone : ''}>
                       <Checkbox onChange={onChangeHandler} checked={t.isDone}/> 
                       <EditableSpan value={t.title} onChange={onChangeTaskTitle}/>
                       <IconButton onClick={onClickHandler}><Delete/></IconButton>
                    </div>
                })
            }
        </div>
        <div className={style.buttons}>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'} 
                    onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'} 
                    onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onComplitedClickHandler}>Completed</Button>
        </div>
    </div>
});
