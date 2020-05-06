import React from "react";
import styles from "./style.module.css";

type PropsType = {
    text: string
}

const Button = (props: any) => {
    return (
        <input className={styles.button} type="button" value={props.text} />
    );
}

export default Button;

