import React, { useEffect } from 'react';
import Title from '../Title/Title';
import { isMobileOnly } from 'react-device-detect';
import classes from './Popup.module.scss';
import ProductRow from '../TableDisplay/Row/ProductRow/ProductRow';

import useAxios from '../../hooks/useAxios/useAxios';
import axios from '../../Axios/axiosInstance';
import { URLS } from '../../Axios/urls';

import Button from '../Button/Button';
import Spinner from '../../Components/Spinner/Spinner';
import {useLocale} from '../../Context/LocaleContext';

const scrollHeight = { maxHeight: '50vh' };
const config = {
    main: ['', 'name', 'qtyInStock']
}

const ProductTypePopup = (props) => {
    const { item, onClose } = props;
    const { fetchState, makeCall } = useAxios(axios);
    const locale = useLocale();

    useEffect(() => {
        makeCall({
            url: `${URLS.allProductsWithTypes}/${item._id}`,
            method: 'GET'
        });
    }, [])

    return (
        <div className={classes.popup}>
            <Title message={item.displayValue} size='h2' center />
            {
                item.description &&
                <p className={classes.popup__mediumSpacing}>{item.description}</p>
            }

            {fetchState.isLoading
                ? <Spinner withBackground={false}/>
                : <div className={classes.popup__color1}>
                    <div className={classes.popup__mediumSpacing}>
                        <Title message={`${locale['products_msg']}: ${fetchState.data ? fetchState.data.count : 0} ${locale['in_ttl']}`} size='h4' />
                    </div>
                    <div className={classes.popup__scrollable} style={scrollHeight}>
                        {
                            (fetchState.data && fetchState.data.products)
                                ? fetchState.data.products.map((c, d) =>
                                    <div key={d} className={d % 2 ? classes.popup__row_odd : classes.popup__row_even}>
                                        <ProductRow
                                            data={c}
                                            config={config}
                                            withTitle={false}
                                            withImage={isMobileOnly ? false : true}
                                            stack={isMobileOnly ? true : false}
                                        />
                                    </div>
                                )

                            : <p className={classes.popup__mediumSpacing}>{locale['no_products_type']}</p>
                        }
                    </div>
                </div>
            }
            <Button onClick={onClose} label={locale['close']} full />
        </div>
    )
}

export default ProductTypePopup;