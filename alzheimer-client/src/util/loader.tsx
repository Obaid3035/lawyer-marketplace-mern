import React from 'react';
import {TailSpin} from "react-loader-spinner";

const Loader = () => {
    return (
        <div className={'d-flex justify-content-center align-items-center my-5'}>
            <TailSpin ariaLabel="loading-indicator"
                      color="#21556c"
                      width={ "50px"}
                      height={"50px"}
            />
        </div>
    );
};

export default Loader;
