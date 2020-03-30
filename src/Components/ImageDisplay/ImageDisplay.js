import React from 'react';
import classes from './imagedisplay.module.scss';
import noImage from './noImage.jpg';

const ImageDisplay = (props) =>{
    const{url, alt='', size='medium', blur=false, dispNoImage=true} = props;
    const style = [classes.imageDisplay];

    switch(size){
        case 'small': style.push(classes.imageDisplay__small); break;
        case 'medium': style.push(classes.imageDisplay__medium); break;
        case 'large': style.push(classes.imageDisplay__large); break;
        case 'desktop': style.push(classes.imageDisplay__desktop); break;
        default: style.push(classes.imageDisplay__medium); break;
    }
    
    if(blur){
        style.push(classes.imageDisplay__blur);
    }

    return (
        <img src={url ? url : dispNoImage ? noImage : null} alt={alt} className={style.join(' ')}/>
    )
}

export default React.memo(ImageDisplay);