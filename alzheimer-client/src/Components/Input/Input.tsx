import React from 'react';
import {Form} from "react-bootstrap";
import './Input.scss';
import {IInput} from "../../interfaces";

const Input:React.FC<IInput> = (props) => {
    return (
        <Form.Group className={'form_group'}>
            {props.children}
        </Form.Group>
    );
};
export default Input;