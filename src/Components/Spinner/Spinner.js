import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {isMobileOnly} from 'react-device-detect';
import usePositionHook from '../../hooks/usePositionHook/usePositionHook';
import logo from '../../images/logo.jpg';
import logoSmall from '../../images/logo-small.jpg';

const base = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px'
};

const background = (pos, backImg) => ({
    position: 'absolute',
    top: `${pos}px`,
    left: '0px',
    width: '90%',
    height: '100%',
    backgroundColor: 'rgba(250, 250, 250, 0.6)',
    zIndex: '9999',
    backgroundImage: backImg ? `url(${isMobileOnly? logoSmall : logo})`: null,
    backgroundRepeat: backImg ? 'no-repeat': null,
    backgroundPosition: backImg ? 'center': null,
    backgroundSize: backImg ? 'fixed': null,
    ...base
})


const Spinner = ({ withBackground = true, backImg=false }) => {
    const { posRef } = usePositionHook();
    return (
        <div style={withBackground ? background(posRef, backImg) : base}>
            <Loader
                type="CradleLoader"
                color="#a6f5ee"
                height={100}
                width={100}
                timeout={15000} //3 secs

            />
        </div>
    )
}

export default Spinner;