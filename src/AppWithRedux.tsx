import React, {useReducer, useState} from 'react';
import './App.scss';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    function addTask(title: string, todoLIstID: string) {
        const action = addTaskAC(title, todoLIstID);
        dispatch(action);
    }

    function removeTask(id: string, todoLIstID: string) {
        const action = removeTaskAC(id, todoLIstID);
        dispatch(action);
    }

    function changeStatus(id: string, isDone: boolean, todoLIstID: string) {
        const action = changeTaskStatusAC(id, isDone, todoLIstID);
        dispatch(action);
    }

    function changeTitle(id: string, title: string, todoLIstID: string) {
        const action = changeTaskTitleAC(id, title, todoLIstID);
        dispatch(action);
    }



    function changeFilter(id: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(id, value);
        dispatch(action);
    }

    function removeTodoList(id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }

    // создаем переменную todolist
    // (берем todolists, если id тудулиста совпадает с id тудулиста на который мы нажали, 
    // записываем в нее результат поиска с помощью метода find)
    // далее проверяем, если действительно todolist (true),
    // то берем title этого todolist'a и записываем в него newTitle,
    // далее перерисовываем тудулист с помощью setTodoLists(создаем копию todolists)
    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatch(action);
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
    }

    return (
        <div className="App">
            {/* добавил визуализацию меню через MUI/AppBar */}
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map(tl => {

                            let allTasks = tasks[tl.id];
                            let tasksForTodoList = allTasks;

                            if (tl.filter === "active") {

                                tasksForTodoList = allTasks.filter(t => t.isDone === true);
                            }

                            if (tl.filter === "completed") {

                                tasksForTodoList = allTasks.filter(t => t.isDone === false);
                            }

                            return <Grid item>
                                <Paper style={{ padding: "20px" }}>
                                    <Todolist
                                        changeTitle={changeTitle}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
