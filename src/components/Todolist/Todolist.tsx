import Header from './Header/Header';
import React, {Props} from 'react';
import styles from './style.module.css';
import List from "./List/List";
import Footer from "./Footer/Footer";
import {TaskType} from "../../App";

type PropsType = {
    tasks: Array<TaskType>
}

const Todolist = (props: PropsType) => {
    return (
        <div className={styles.todolist}>
            <Header/>
            <List tasks={props.tasks}/>
            <Footer/>
        </div>
    );
}

export default Todolist;


