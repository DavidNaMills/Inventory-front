import React from 'react';
import classes from './title.module.scss';


const Title = (props) => {
    const { size = null, message = '', center = false } = props;
    let element = null;

    switch (size) {
        case 'h1':
            element = <h1 className={[classes.title_h1, center ? classes.title__center : null].join(' ')} >{message}</h1>
            break;
        case 'h2':
            element = <h2 className={[classes.title_h2, center ? classes.title__center : null].join(' ')}>{message}</h2>
            break;
        case 'h3':
            element = <h3 className={[classes.title_h3, center ? classes.title__center : null].join(' ')}>{message}</h3>
            break;
        case 'h4':
            element = <h4 className={[classes.title_h4, center ? classes.title__center : null].join(' ')}>{message}</h4>
            break;
        case 'h5':
            element = <h5 className={[classes.title_h5, center ? classes.title__center : null].join(' ')}>{message}</h5>
            break;
        case 'h6':
            element = <h6 className={[classes.title_h6, center ? classes.title__center : null].join(' ')}>{message}</h6>
            break;
        default:
            element = <h2 className={[classes.title_h2, center ? classes.title__center : null].join(' ')}>{message}</h2>
            break;
    };

    return (
        <div>
            {element}
        </div>
    )
}

export default React.memo(Title);