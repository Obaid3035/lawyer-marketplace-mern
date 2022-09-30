import React from 'react';
import './Quote.scss';
import QuoteMain from "../../Assets/quote_coma.png";

const Quote = () => {
    return (
        <div className={'quote_main'}>
            <img src={QuoteMain} alt={'quote'} />
            <h4>“One of the most important things you can do on this earth is to let <br />
                people know they are not alone.”</h4>
        </div>
    );
};

export default Quote;
