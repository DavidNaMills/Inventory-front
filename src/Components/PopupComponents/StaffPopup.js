import React from 'react';
import classes from './Popup.module.scss';
import { useSelector } from 'react-redux';
import Title from '../Title/Title';
import Button from '../Button/Button';
import { useLocale } from '../../Context/LocaleContext';


const tempStyle = {
    backgroundColor: 'rgb(237, 237, 237)',
    padding: '50px',
    border: 'solid black 2px',
    minWidth: '80%'
}

const bold = {
    fontWeight: 'bold'
}

const locs = {
    border: 'solid black 1px',
    backgroundColor: 'white',
    padding: '10px'
}

const StaffPopup = (props) => {
    const { item, onClose } = props;
    const { types } = useSelector(state => state);
    const locale = useLocale();

    const isRole = (key, txt) =>{
        if(key === 'role'){
            return locale[txt];
        } else {
            return txt;
        }
    }

    return (
        // <div style={tempStyle}>
        <div className={classes.popup}>
            <Title message={item.name} size='h2' center />
            <div className={classes.popup__smallSpacing}>
                <label style={bold}>{locale['role']}</label>
                <p>{locale[item.role]}</p>
            </div>
            <div className={classes.popup__smallSpacing}>
                <label style={bold}>{locale['phone']}</label>
                <p>{item.phone}</p>
            </div>
            <div className={classes.popup__mediumSpacing}>
                <label style={bold}>{locale['frm_staff_wechat']}</label>
                <p>{item.wechat}</p>
            </div>

            <div style={locs} className={classes.popup__mediumSpacing}>
            <label style={bold}>{locale['location']}</label>
                {
                    item.baseId.map(x => <p key={x}>{types.locations[x].displayValue}</p>)
                }
            </div>
            <Button onClick={onClose} label={locale['close']} full />
        </div>
    )
}

export default StaffPopup;