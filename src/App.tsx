import React, { useState } from 'react';
import './App.scss';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from '@material-ui/core';
import {Menu} from '@material-ui/icons';

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

function App() {

    let todoLIstID1 = v1();
    let todoLIstID2 = v1();

    let [todolists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoLIstID1, title: 'What to learn', filter: 'all' },
        { id: todoLIstID2, title: 'What to buy', filter: 'all' },
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let newTask = { id: v1(), title: title, isDone: false };
        let todoListTasks = tasks[todoLIstID];
        tasks[todoLIstID] = [newTask, ...todoListTasks];
        setTasks({ ...tasks });
    }

    function removeTask(id: string, todoLIstID: string) {
        let todoListTasks = tasks[todoLIstID];
        tasks[todoLIstID] = todoListTasks.filter(t => t.id !== id);
        setTasks({ ...tasks });
    }

    function changeStatus(id: string, isDone: boolean, todoLIstID: string) {
        // let todoListTasks = tasks[todoLIstID]
        let task = tasks[todoLIstID].find(t => t.id == id);
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks })
        }
    }

    function changeTitle(id: string, title: string, todoLIstID: string) {
        let task = tasks[todoLIstID].find(t => t.id == id);
        if (task) {
            task.title = title;
            setTasks({ ...tasks })
        }
    }



    function changeFilter(id: string, value: FilterValuesType) {
        let todoList = todolists.find(tl => tl.id === id);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todolists])
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todolists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({ ...tasks })
    }

    // создаем переменную todolist
    // (берем todolists, если id тудулиста совпадает с id тудулиста на который мы нажали, 
    // записываем в нее результат поиска с помощью метода find)
    // далее проверяем, если действительно todolist (true),
    // то берем title этого todolist'a и записываем в него newTitle,
    // далее перерисовываем тудулист с помощью setTodoLists(создаем копию todolists)
    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todolists]);
        }
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodoListType = { id: newTodolistId, title: title, filter: 'all' };
        setTodoLists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
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

export default App;
