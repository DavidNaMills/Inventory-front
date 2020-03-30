import React, { useEffect, useState } from 'react';
import classes from '../../styles/common/containerForms.module.scss';
import { useSelector } from 'react-redux';
import {useLocale} from '../../Context/LocaleContext';
import { productFormConfig } from '../../configs/formConfigs/productFormConfig';

import useForm from '../../hooks/useForm/useForm';
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';
import useTableDisplay from '../../hooks/useTableDisplay/useTableDisplay';
import useAxios from '../../hooks/useAxios/useAxios';
import axios from '../../Axios/axiosInstance';
import { URLS } from '../../Axios/urls';

import Form from '../../Components/Form/Form';
import TableDisplay from '../../Components/TableDisplay/TableDisplay';
import Title from '../../Components/Title/Title';

import usePopup from '../../hooks/usePopup/usePopup';
import Popup from '../../Components/PopupComponents/Popup';
import ProductPopup from '../../Components/PopupComponents/ProductPopup';

import objToArray from '../../helpers/objToArray/objToArray';
import buildFormData from '../../helpers/buildFormData/buildFormData';
import productFactoryHelper from '../../helpers/productFactoryHelper/productFactoryHelper';
import Spinner from '../../Components/Spinner/Spinner';

const FORM_NAME = 'products';

const ProductManagementContainer = () => {
    const locale = useLocale();
    const { types } = useSelector(state => state);
    const { staff } = useSelector(state => state);

    const [displayFields, setDisplayFields] = useState(
        staff.config.formName[FORM_NAME].create
            ? staff.config.formName[FORM_NAME].create
            : staff.config.formName[FORM_NAME].update
    );
    const [isUpdate, setIsUpdate] = useState(null);

    const temp = objToArray(types.products);
    const {
        fullForm,
        buildFormObject,
        controlForm,
        clearForm,
        populateValues,
        validateFull,
        validatePartial
    } = useForm({ formConfig: productFormConfig(locale.errors), state: { products: temp } });

    const {fetchState, makeCall } = useAxios(axios);

    const {
        init,
        addItem,
        updateItem,
        toDisplayList
    } = useTableDisplay();

    const { createMessageDispatch } = useDispatchHook();
    const { openPopup, closePopup, isOpen } = usePopup();

    useEffect(() => {
        initFetch();
    }, [staff.currentLoc]);


    /**
     * Callbacks
     */

    const initFetch = () => {
        makeCall({
            url: `${URLS.allProducts}/${staff.currentLoc}/0/0`,
            method: 'GET',
            callBack: initDisplayTableCallback,
            newId: 'fetchInit'
        });
    }

    const initDisplayTableCallback = (res) => {
        if (res.error) {

        } else {
            init(res.products)
        }
    }

    const addCallback = (res) => {
        if (res.error) {
            console.log('something went wrong');
            console.log(res.error);
        } else {
            createMessageDispatch({ message: `${res.item.name} ${locale.succ_added}`, messageType: 'succType' });
            addItem(res.item);
            clearForm();
            resetUpdate();
        }
    }


    const updateCallback = (res) => {
        if (res.error) {
            console.log('something went wrong');
            console.log(res.error);
        } else {
            createMessageDispatch({ message: `${res.item.name} ${locale.succ_update}`, messageType: 'succType' });
            updateItem(res.item, res.item._id);
            clearForm();
            resetUpdate();
        }
    }

    const clearCb = () => {
        clearForm();
        if (isUpdate) {
            resetUpdate();
        }
    }

    /**
     * Clicks
     */


    const resetUpdate = () => {
        setIsUpdate(null);
        setDisplayFields(staff.config.formName[FORM_NAME].create);
    }

    const submitForm = (e) => {
        e.preventDefault();
        const valid = isUpdate ? validatePartial() : validateFull();
        if (valid) {
            const all = isUpdate
                ? productFactoryHelper({ data: buildFormObject(true), types: types.products, isNew: false })
                : productFactoryHelper({ data: buildFormObject(), usrLoc: staff.currentLoc, types: types.products })

            const temp = buildFormData(all);
            const conf = isUpdate
                ? { url: `${URLS.product}/${isUpdate._id}`, method: 'PUT', callBack: updateCallback }
                : { url: URLS.product, method: 'POST', callBack: addCallback }

            makeCall({
                ...conf,
                data: temp,
                newId: 'submit'
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


    const viewMore = (obj) => {
        openPopup(obj);
    }

    return (
        <div>
            {(fetchState.isLoading && fetchState.id === 'submit') && <Spinner/>}
            <Title size={'h1'} message={locale.cont_product} center/>

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
                    updating={isUpdate ? isUpdate.name : null}
                />
            </div>

            {staff.config.formName[FORM_NAME].tableDisplay 
                &&
                (fetchState.isLoading && fetchState.id === 'fetchInit')
                ? <Spinner withBackground={false}/>
                : <div className={classes.tableSpacing}>
                    <TableDisplay
                        list={toDisplayList}
                        config={staff.config.formName[FORM_NAME].tableDisplay.toDisplay}
                        update={staff.config.formName[FORM_NAME].tableDisplay.update ? update : null}
                        viewMore={viewMore}
                        formName={FORM_NAME}
                        isSelected={isUpdate ? isUpdate._id : null}
                    />
                </div>
                
            }

            <Popup isOpen={isOpen.show}>
                <ProductPopup onClose={closePopup} item={isOpen.selected} fields={staff.config.formName[FORM_NAME].tableDisplay.toDisplay.popup} />
            </Popup>

        </div>
    )
}

export default ProductManagementContainer;