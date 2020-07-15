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

function AppWithReducers() {

    let todoLIstID1 = v1();
    let todoLIstID2 = v1();

    let [todolists, dispatchToTodolistsReduser] = useReducer(todolistsReducer, [
        { id: todoLIstID1, title: 'What to learn', filter: 'all' },
        { id: todoLIstID2, title: 'What to buy', filter: 'all' },
    ]);

    let [tasks, dispatchToTasksReduser] = useReducer(tasksReducer, {
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
    });

    function addTask(title: string, todoLIstID: string) {
        const action = addTaskAC(title, todoLIstID);
        dispatchToTasksReduser(action);
    }

    function removeTask(id: string, todoLIstID: string) {
        const action = removeTaskAC(id, todoLIstID);
        dispatchToTasksReduser(action);
    }

    function changeStatus(id: string, isDone: boolean, todoLIstID: string) {
        const action = changeTaskStatusAC(id, isDone, todoLIstID);
        dispatchToTasksReduser(action);
    }

    function changeTitle(id: string, title: string, todoLIstID: string) {
        const action = changeTaskTitleAC(id, title, todoLIstID);
        dispatchToTasksReduser(action);
    }



    function changeFilter(id: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(id, value);
        dispatchToTodolistsReduser(action);
    }

    function removeTodoList(id: string) {
        const action = removeTodolistAC(id);
        dispatchToTasksReduser(action);
        dispatchToTodolistsReduser(action);
    }

    // создаем переменную todolist
    // (берем todolists, если id тудулиста совпадает с id тудулиста на который мы нажали, 
    // записываем в нее результат поиска с помощью метода find)
    // далее проверяем, если действительно todolist (true),
    // то берем title этого todolist'a и записываем в него newTitle,
    // далее перерисовываем тудулист с помощью setTodoLists(создаем копию todolists)
    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle);
        dispatchToTodolistsReduser(action);
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatchToTasksReduser(action);
        dispatchToTodolistsReduser(action);
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

export default AppWithReducers;
