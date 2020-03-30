import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import classes from './ProductRow.module.scss';
import ImageDisplay from '../../../ImageDisplay/ImageDisplay';
import Title from '../../../Title/Title';
import { useLocale } from '../../../../Context/LocaleContext';

const ProductRow = (props) => {
    const { config, data, withTitle=true, withImage=true, withInfo=true, stack=false } = props;
    const locale = useLocale();

    return (
        <div className={classes.productRow}>
            {withImage && <ImageDisplay url={data.url ? `/productImages/${data.url}` : null} alt={`${data.name}-${data.code}`} size='medium'/>}
            <div className={classes.productRow__infoCont}>
                {withTitle && <Title message={data[config.main[0]]} size='h4' />}
                {withInfo &&
                    <div className={stack? classes.productRow__cellCont_stack : classes.productRow__cellCont}>
                        <p><span>{locale[config.main[1]]}:</span>{data[config.main[1]]}</p>
                        <p><span>{locale[config.main[2]]}:</span>{data[config.main[2]]}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductRow;