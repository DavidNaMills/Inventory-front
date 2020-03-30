import React, { useState, useEffect } from 'react';
import classes from '../../styles/common/containerForms.module.scss';
import { useSelector } from 'react-redux';
import { productsTypeFormConfig } from '../../configs/formConfigs/productsTypeFormConfig';

import {useLocale} from '../../Context/LocaleContext';
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';
import useForm from '../../hooks/useForm/useForm';
import useAxios from '../../hooks/useAxios/useAxios';
import axios from '../../Axios/axiosInstance';
import { URLS } from '../../Axios/urls';

import Form from '../../Components/Form/Form';
import TableDisplay from '../../Components/TableDisplay/TableDisplay';
import Title from '../../Components/Title/Title';

import usePopup from '../../hooks/usePopup/usePopup';
import Popup from '../../Components/PopupComponents/Popup';
import ProductTypePopup from '../../Components/PopupComponents/ProductTypePopup';

import objToArray from '../../helpers/objToArray/objToArray';
import Spinner from '../../Components/Spinner/Spinner';

const PRODUCTS = 'PRODUCTS';
const FORM_NAME = 'productTypes';

const ProductTypeManagementContainer = () => {
    const locale = useLocale();
    const { types } = useSelector(state => state);
    const { staff } = useSelector(state => state);

    const { addNewProductDispatch, createMessageDispatch } = useDispatchHook();

    const [displayFields, setDisplayFields] = useState(staff.config.formName[FORM_NAME].create);
    const [isUpdate, setIsUpdate] = useState(null);

    const {
        fullForm,
        buildFormObject,
        controlForm,
        clearForm,
        populateValues,
        validateFull,
        validatePartial
    } = useForm({ formConfig: productsTypeFormConfig(locale.errors) });
    const {fetchState, makeCall } = useAxios(axios);
    const { openPopup, closePopup, isOpen } = usePopup();

    useEffect(()=>{
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        });
    }, [])

    const resetUpdate = () => {
        setIsUpdate(null);
    }


    const addAndUpdateCallback = (res) => {
        if (res.error) {

        } else {
            createMessageDispatch({ message: `${res.item.displayValue} ${isUpdate ? locale.succ_update : locale.succ_added}`, messageType: 'succType' });
            addNewProductDispatch(res.item);
            resetUpdate();
            clearForm();
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        const valid = isUpdate ? validatePartial() : validateFull();
        if (valid) {
            const all = buildFormObject();
            const conf = isUpdate
                ? { url: `${URLS.types}${isUpdate._id}`, method: 'PUT' }
                : { url: `${URLS.types}${PRODUCTS}`, method: 'POST' }

            makeCall({
                ...conf,
                data: all,
                callBack: addAndUpdateCallback
            });
        }
    }


    const update = (obj) => {
        const t = JSON.parse(JSON.stringify(obj));
        setIsUpdate(t);
        populateValues(obj);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const clearCb = () => {
        clearForm();
        if (isUpdate) { setIsUpdate(null) }
    }


    return (
        <div>
            {fetchState.isLoading && <Spinner/>}
            <Title size={'h1'} message={locale.cont_product_type} center />
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
                        list={objToArray(types.products)}
                        config={staff.config.formName[FORM_NAME].tableDisplay.toDisplay}
                        update={staff.config.formName[FORM_NAME].update ? update : null}
                        // remove={userConfig.formName[FORM_NAME].tableDisplay.remove ? remove : null}
                        viewMore={openPopup}
                        formName={FORM_NAME}
                        isSelected={isUpdate ? isUpdate._id : null}
                    />
                </div>
            }

            <Popup isOpen={isOpen.show}>
                <ProductTypePopup onClose={closePopup} item={isOpen.selected} fields={staff.config.formName[FORM_NAME].tableDisplay.toDisplay.popup} />
            </Popup>
        </div>
    )
}

export default ProductTypeManagementContainer;