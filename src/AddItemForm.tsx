import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import style from './Todolist.module.scss';
import {IconButton, TextField} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (title.trim() !=='') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is Required');
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    };

    return <div>
        <TextField variant="outlined" label="Input value" className={error ? style.error : ''}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText={error} />
        <IconButton className={style.button} onClick={addItem} color={"primary"}><ControlPoint/></IconButton>
    </div>
});

