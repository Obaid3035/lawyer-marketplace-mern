import React from 'react';
import {Button} from "react-bootstrap";
import "./Button.scss";

interface IButton {
    children: any;
    type: string
    onClick?: () => void
}

const button:React.FC<IButton> = (props: any) => {
    return (
        <Button className={'btn_style'} type={props.type} onClick={props.onClick}>
            {props.children}
        </Button>
    );
};
export default button;