import React from 'react';
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";

const Header = () => {
    return (
        <div className="todoList-header">
            <h3 className="todoList-header__title">What to Learn</h3>
            <div className="todoList-newTaskForm">
                {/*<input type="text" placeholder="new title"/>*/}
                <Input placeholder={"New title"}/>
                <Button text={"ADD"}/>
            </div>
        </div>
    );
}

export default Header
