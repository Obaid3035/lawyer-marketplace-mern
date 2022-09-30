import React from 'react';
import {Modal} from "react-bootstrap";
import "./SiteModal.scss";
import {AiOutlineCloseCircle} from "react-icons/ai";


interface ISiteModal {
    title: string,
    show: boolean,
    onCloseModal: () => void;
    children?: JSX.Element,
    size?: "sm" | "lg" | "xl" | undefined,
}

const SiteModal: React.FC<ISiteModal> = ({ title, show, size, onCloseModal, children }) => {
    return (
        <Modal show={show} size={size} backdrop="static" keyboard={false} className={"site_modal"}>
            {
                title === 'Reviews' ? (
                    <Modal.Header>
                        <div className={'review_header'}>
                            <h4>{title}</h4>
                            <AiOutlineCloseCircle onClick={onCloseModal}/>
                        </div>
                    </Modal.Header>
                ) : null
            }
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};
export default SiteModal;