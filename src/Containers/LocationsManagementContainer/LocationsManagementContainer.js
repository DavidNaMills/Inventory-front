import React, { useState, useEffect } from 'react';
import classes from '../../styles/common/containerForms.module.scss';
import { useSelector } from 'react-redux';
import { locationsTypeFormConfig } from '../../configs/formConfigs/locationsTypeFormConfig';

import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';
import useForm from '../../hooks/useForm/useForm';
import useAxios from '../../hooks/useAxios/useAxios';
import axios from '../../Axios/axiosInstance';
import { URLS } from '../../Axios/urls';

import Form from '../../Components/Form/Form';
import TableDisplay from '../../Components/TableDisplay/TableDisplay';
import Title from '../../Components/Title/Title';

import {useLocale} from '../../Context/LocaleContext';
import usePopup from '../../hooks/usePopup/usePopup';
import Popup from '../../Components/PopupComponents/Popup';
import LocationPopup from '../../Components/PopupComponents/LocationPopup';

import objToArray from '../../helpers/objToArray/objToArray';
import Spinner from '../../Components/Spinner/Spinner';


const LOCATIONS = 'LOCATIONS';
const FORM_NAME = 'locationTypes';

const LocationManagementContainer = () => {
    const locale = useLocale();
    const { staff } = useSelector(state => state);
    const { types } = useSelector(state => state);

    const [isUpdate, setIsUpdate] = useState(null);
    const [displayFields, setDisplayFields] = useState(staff.config.formName[FORM_NAME].create);
    const { openPopup, closePopup, isOpen } = usePopup();

    const { addNewLocationDispatch, createMessageDispatch } = useDispatchHook();
    const {fetchState, makeCall } = useAxios(axios);

    const {
        fullForm,
        buildFormObject,
        controlForm,
        clearForm,
        populateValues,
        validateFull,
        validatePartial
    } = useForm({ formConfig: locationsTypeFormConfig(locale.errors) });

    useEffect(()=>{
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        });
    }, [])

    const addAndUpdateCallback = (res) => {
        if (res.error) {

        } else {
            createMessageDispatch({ message: `${res.item.displayValue} ${isUpdate ? locale.succ_update : locale.succ_added}`, messageType: 'succType' });
            addNewLocationDispatch(res.item);
            resetUpdate();
            clearForm();
        }
    }
    const resetUpdate = () => {
        setIsUpdate(null);
        setDisplayFields(staff.config.formName[FORM_NAME].create);
    }

    const submitForm = (e) => {
        e.preventDefault();
        const valid = isUpdate ? validatePartial() : validateFull();
        if (valid) {
            const all = buildFormObject();
            const conf = isUpdate
                ? { url: `${URLS.types}${isUpdate._id}`, method: 'PUT', callBack: addAndUpdateCallback }
                : { url: `${URLS.types}${LOCATIONS}`, method: 'POST', callBack: addAndUpdateCallback }

            makeCall({
                ...conf,
                data: all,
            });
        }
    }

    const update = (obj) => {
        const t = JSON.parse(JSON.stringify(obj));
        setIsUpdate(t);
        setDisplayFields(staff.config.formName[FORM_NAME].update);
        populateValues(obj);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const clearCb = () => {
        clearForm();
        if (isUpdate) { setIsUpdate(null) }
    }

    return (
        <div>
            {fetchState.isLoading && <Spinner/>}
            <Title size={'h1'} message={locale.cont_location_type} center/>

            <div className={classes.container}>
            <Form
                formConfig={fullForm}
                displayFields={displayFields}
                controlForm={controlForm}
                title={locale[staff.config.formName[FORM_NAME].title]}
                formName={FORM_NAME}
                user={staff.config}
                fullForm={fullForm}
                submitCb={submitForm}
                clearCb={clearCb}
                updating={isUpdate ? isUpdate.displayValue : null}
            />
            </div>

            {staff.config.formName[FORM_NAME].tableDisplay &&
                <div className={classes.tableSpacing}>
                    <TableDisplay
                        list={objToArray(types.locations)}
                        config={staff.config.formName[FORM_NAME].tableDisplay.toDisplay}
                        update={staff.config.formName[FORM_NAME].update ? update : null}
                        formName={FORM_NAME}
                        viewMore={openPopup}
                        isSelected = {isUpdate ? isUpdate._id : null}
                    />
                </div>
            }

            <Popup isOpen={isOpen.show}>
                <LocationPopup onClose={closePopup} item={isOpen.selected}/>
            </Popup>
        </div>
    )
}

export default LocationManagementContainer;