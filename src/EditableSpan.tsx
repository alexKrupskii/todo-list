import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TextField } from '@material-ui/core';

type PropsType = {
    value: string
    onChange: (newValue: string) => void
}

function EditableSpan(props: PropsType) {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.value)

    function activateEditMode () {
        setEditMode(true);
        setTitle(props.value)
    }

    function deActivateEditMode () {
        setEditMode(false); 
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.onChange(title)
            deActivateEditMode () 
        }
    }

    return editMode 
    ? <TextField value={title}
             autoFocus
             onBlur={deActivateEditMode}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}/>
    : <span onDoubleClick={activateEditMode}>{props.value}</span> 
}

export default EditableSpan;