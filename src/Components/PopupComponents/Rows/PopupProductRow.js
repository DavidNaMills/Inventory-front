import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import ProductRow from '../../TableDisplay/Row/ProductRow/ProductRow';
import classes from '../Popup.module.scss';
import Title from '../../Title/Title';
import {useLocale} from '../../../Context/LocaleContext';


const config2 = { main: ['', 'name', 'qtyInStock'] };

const PopupProductRow = (props) => {
    const { prods, isPortrait=true } = props;
    const locale = useLocale();

    const tempScrollableProd = {
        overflowY: 'auto',
        maxHeight: isPortrait ? '30vh' : '15vw',
    }

    return (
        prods.length > 0
            ? <div className={classes.popup__color2}>
                <div className={classes.popup__mediumSpacing}>
                    <Title message={`${locale['products_msg']}: ${prods.length>0 ? prods.length : 0} ${locale['in_ttl']}`} size='h4' />
                </div>
                <div style={tempScrollableProd}>
                    {
                        prods.map((c, d) =>
                            <div key={d} className={d % 2 ? classes.popup__row_odd : classes.popup__row_even}>
                                <ProductRow
                                    data={c}
                                    config={config2}
                                    withTitle={false}
                                    withImage={isMobileOnly ? false : true}
                                    stack={isMobileOnly ? true : false}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            : <p className={classes.popup__mediumSpacing}>{locale['no_products_type']}</p>
    )
}

export default PopupProductRow;