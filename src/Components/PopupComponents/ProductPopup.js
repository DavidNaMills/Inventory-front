import React from 'react';
import classes from './Popup.module.scss';
import { useSelector } from 'react-redux';
import Title from '../Title/Title';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import Button from '../Button/Button';
import { isMobileOnly } from 'react-device-detect';
import {useLocale} from '../../Context/LocaleContext';

const tempStyle = {
    backgroundColor: 'rgb(237, 237, 237)',
    padding: '50px',
    border: 'solid black 2px',
    display: 'flex',
    flexDirection: 'column',
}

const bold = {
    fontWeight: 'bold'
}

/**
 * later show more info about how many have been sold:
 * current month
 * in total
 */

const ProductPopup = ({ item, onClose, fields }) => {
    const { types } = useSelector(state => state);
    const locale = useLocale();
    // style={tempStyle} 
    return (
        <div className={classes.popup}>
            <div className={classes.popup__mediumSpacing}>
                <Title message={item.name} size='h2' center />
            </div>
            <div className={classes.popup__image}>
                <ImageDisplay
                    url={item.url ? `/productImages/${item.url}` : null}
                    alt={`${item.name}-${item.code}`}
                    size={isMobileOnly ? 'medium' : 'desktop'}
                    blur
                />
            </div>

            <div className={classes.popup__smallSpacing}>
                <label style={bold} >{locale['prodType']}:</label>
                <p>{types.products[item.type].displayValue}</p>
            </div>

            <div className={classes.popup__smallSpacing}>
                <label style={bold}>{locale['code']}:</label>
                <p>{item.code}</p>
            </div>

            {
                item.description &&
                <div className={classes.popup__smallSpacing}>
                    <label style={bold}>{locale['description']}:</label>
                    <p>{item.description}</p>
                </div>
            }
            {
                fields.map((x, y) =>
                    <div key={y} className={classes.popup__smallSpacing}>
                        <label style={bold}>{locale[x]}:</label>
                        <p key={x}>{item[x]}</p>
                    </div>
                )
            }
            <div className={classes.popup__smallSpacing}>
                <Button onClick={onClose} label={locale['close']} full />
            </div>
        </div>
    )
}

export default ProductPopup;