import React from 'react';
import { isTablet, withOrientationChange } from 'react-device-detect';
import Title from '../../Title/Title';
import classes from './ProductTypeRow/ProductTypeRow.module.scss';
import { useLocale } from '../../../Context/LocaleContext';

const StaffTypeRow = (props) => {
    const locale = useLocale();
    const { config, data, withTitle = true, showInfo=true } = props;

    const isRole = (key, txt) =>{
        if(key === 'role'){
            return locale[txt];
        } else {
            return txt;
        }
    }

    return (
        <div className={classes.productTypeRow}>
            {withTitle &&
                <div className={classes.productTypeRow__title}>
                    <Title message={data[config.main[0]]} size='h3' />
                </div>
            }
            {showInfo &&
                <div className={(isTablet && props.isPortrait) ? classes.productTypeRow__cellContPortrait : classes.productTypeRow__cellCont}>
                    <p><span>{locale[config.main[1]]}:</span>{isRole(config.main[1], data[config.main[1]])}</p>
                    <p><span>{locale[config.main[2]]}:</span>{isRole(config.main[2], data[config.main[2]])}</p>
                </div>
            }
        </div>
    )
}

export default withOrientationChange(StaffTypeRow);