import React, { useEffect, useState } from 'react';
import classes from './Popup.module.scss';
import Title from '../Title/Title';
import { withOrientationChange } from 'react-device-detect';
import useAxios from '../../hooks/useAxios/useAxios';
import axios from '../../Axios/axiosInstance';
import { URLS } from '../../Axios/urls';
import Button from '../Button/Button';

import PopupProductRow from './Rows/PopupProductRow';
import PopupStaffRow from './Rows/PopupStaffRow';
import Spinner from '../../Components/Spinner/Spinner';
import {useLocale} from '../../Context/LocaleContext';


const LocationPopup = (props) => {
    const { item, onClose, isPortrait } = props;
    const [staff, setStaff] = useState([]);
    const [prods, setProds] = useState([]);
    const { fetchState, makeCall } = useAxios(axios);
    const locale = useLocale();

    const initPopup = async () =>{
        const t = makeCall({
            url: `${URLS.allProducts}/${item._id}/0/0`,
            method: 'GET',
            newId: 'products'
        });
    
        const d = makeCall({
            url: `${URLS.staffLocations}/${item._id}`,
            method: 'GET',
            newId: 'staff'
        });

        Promise.all([t, d])
        .then(res=>{
            if(!res[0].errors && !res[1].errors){
                setProds(res[0].data.products);
                setStaff(res[1].data.data);
            }
        })
    }

    useEffect(() => {
        initPopup();
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
                : <div>
                    <PopupStaffRow staff={staff} isPortrait={isPortrait}/>
                    <PopupProductRow prods={prods} isPortrait={isPortrait}/>
                </div>
            }
            <Button onClick={onClose} label={locale['close']} full />
        </div>
    )
}

export default withOrientationChange(LocationPopup);