import React from 'react';

const styleObj = {
    backgroundColor: 'rgb(151, 184, 240)',
    borderRadius: '5px'
}

const Toggle = ({ onClick, isOpen = false }) => {


    const style = isOpen
    ? "hamburger hamburger--collapse is-active"
    : "hamburger hamburger--collapse"
    return (
        <button className={style} type="button" style={styleObj} onClick={onClick}>
            <span className={"hamburger-box"}>
                <span className={"hamburger-inner"}></span>
            </span>
        </button>
    )
}

export default Toggle;