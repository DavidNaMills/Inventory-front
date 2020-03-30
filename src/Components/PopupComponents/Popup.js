import React from 'react';
import classes from './Popup.module.scss';
import usePositionHook from '../../hooks/usePositionHook/usePositionHook';

const style = (pos) => ({
    position: 'absolute',
    top: `${pos}px`,
    left: '0px',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(232, 255, 253, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999'
})

const Popup = (props) => {
    const { children, isOpen = false, onClose = null } = props;
    const { posRef } = usePositionHook();
    
    return (
        isOpen ?

            <div style={style(posRef)}>
                <div>
                    {children}
                </div>
            </div>
            : null
    )
}

export default Popup;