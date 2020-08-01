import React from 'react';

const Detail = (props) => {
    const { name, value, fontSize } = props;
    const nameAllCaps = name.toUpperCase();

    return (
        <span>
            <span
                style={{fontSize: `calc(${fontSize} - 0.75vw)`}}>
                {nameAllCaps + ' : '}
            </span>
            <span
                style={{fontSize: fontSize}}>
                {value}
            </span>
        </span>
    )
}

export default Detail;