import React from "react";

type PropsType = {
    placeholder: string
}

const Input = (props: PropsType) => {
    return (
        <input placeholder={props.placeholder}/>
    );
}

export default Input;
