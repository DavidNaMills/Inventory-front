import React from 'react';
import classes from './button.module.scss';

const allTypes = {
    base: {
        base: classes.button__base,
        shadow: classes.button__base_shadow,
        border: classes.button__base_border,
        skeleton: classes.button__base_skeleton,
    },

    submit: {
        base: classes.button__submit,
        shadow: classes.button__submit_shadow,
        border: classes.button__submit_border,
        skeleton: classes.button__submit_skeleton,
    },

    clear: {
        base: classes.button__clear,
        shadow: classes.button__clear_shadow,
        border: classes.button__clear_border,
        skeleton: classes.button__clear_skeleton,
    },

    danger: {
        base: classes.button__danger,
        shadow: classes.button__danger_shadow,
        border: classes.button__danger_border,
        skeleton: classes.button__danger_skeleton,
    },

    information: {
        base: classes.button__information,
        shadow: classes.button__information_shadow,
        border: classes.button__information_border,
        skeleton: classes.button__information_skeleton,
    },
};


const Button = ({ config = {}, onClick, label = null, skeleton = false, raised = false, full = false, type = 'base', border = false, bold = false, wide = false, isDisabled = false, Icon = null, noStyle=null }) => {
    const fullStyle = [classes.button];
    let which = type;
    const style = {};

    if (isDisabled) {
        fullStyle.push(classes.button__disabled);
    } else if(noStyle) { fullStyle.push(classes.button_noStyle);
    } else {
        if (allTypes[type]) {
            which = type;
            fullStyle.push(allTypes[type].base);
        } else {
            which = 'base';
            fullStyle.push(allTypes['base'].base);
        }

        if (skeleton) { fullStyle.push(allTypes[which].skeleton); }
        if (raised) { fullStyle.push(allTypes[which].shadow); }
        if (border) { fullStyle.push(allTypes[which].border); }
    }
    if (full) { fullStyle.push(classes.button_full); }
    if (bold) { fullStyle.push(classes.button_bold); }
    
    
    if (wide) {
        style.width = '30%';
    }

    return (
        <button
            {...config}
            onClick={onClick}
            style={style}
            className={fullStyle.join(' ')}
            disabled={isDisabled}
        ><p>{label}</p>{Icon && <Icon />}</button>
    )
}

export default React.memo(Button);