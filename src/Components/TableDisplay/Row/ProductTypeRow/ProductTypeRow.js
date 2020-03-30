import React from 'react';
import classes from './ProductTypeRow.module.scss';
import Title from '../../../Title/Title';
import {isMobileOnly} from 'react-device-detect';
import { useLocale } from '../../../../Context/LocaleContext';

const ProductTypeRow = (props) => {
    const { config, data } = props;
    const locale = useLocale();

    return (
        <div className={classes.productTypeRow}>
            <div className={classes.productTypeRow__title}>
                <Title message={data[config.main[0]]} size='h4' />
            </div>
            {!isMobileOnly &&
                <div className={classes.productTypeRow__cellCont}>
                    <p><span>{locale[config.main[1]]}:</span>{data[config.main[1]]}</p>
                </div>
            }
        </div>
    )
}

export default ProductTypeRow;