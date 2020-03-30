import React, { useEffect, useState } from 'react';
import classes from '../../styles/common/containerForms.module.scss';
import { useSelector } from 'react-redux';
import { staffFormConfig } from '../../configs/formConfigs/staffFormConfig';

import { useLocale } from '../../Context/LocaleContext';
import useForm from '../../hooks/useForm/useForm';
import useAxios from '../../hooks/useAxios/useAxios';
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';
import useTableDisplay from '../../hooks/useTableDisplay/useTableDisplay';
import axios from '../../Axios/axiosInstance';
import { URLS } from '../../Axios/urls';

import Form from '../../Components/Form/Form';
import TableDisplay from '../../Components/TableDisplay/TableDisplay';
import Title from '../../Components/Title/Title';
import Button from '../../Components/Button/Button';

import usePopup from '../../hooks/usePopup/usePopup';
import Popup from '../../Components/PopupComponents/Popup';
import StaffPopup from '../../Components/PopupComponents/StaffPopup';

import objToArray from '../../helpers/objToArray/objToArray';
import Spinner from '../../Components/Spinner/Spinner';

const FORM_NAME = 'staff';

const StaffManagementContainer = () => {
    const locale = useLocale();
    const { types } = useSelector(state => state);
    const { staff } = useSelector(state => state);
    const [isUpdate, setIsUpdate] = useState(null);

    const [displayFields, setDisplayFields] = useState(
        staff.config.formName[FORM_NAME].create
            ? staff.config.formName[FORM_NAME].create
            : staff.config.formName[FORM_NAME].update
    );
    const { openPopup, closePopup, isOpen } = usePopup();

    const { toDisplayList,
        init,
        addItem,
        updateItem
    } = useTableDisplay();

    const { createMessageDispatch } = useDispatchHook();
    const temp = objToArray(types.locations);
    const {
        fullForm,
        buildFormObject,
        controlForm,
        clearForm,
        populateValues,
        validateFull,
        validatePartial
    } = useForm({ formConfig: staffFormConfig(locale.errors), state: { locations: temp } });

    const {fetchState, makeCall } = useAxios(axios);


    useEffect(() => {
        if (staff.staff.role === 3) {
            makeCall({
                url: URLS.staff,
                method: 'GET',
                callBack: displayFetchCallback,
                newId: 'fetchInit'
            })
        } else {
            init([staff.staff]);
        }
    }, []);


    /** Callbacks */
    const displayFetchCallback = (res) => {
        if (res.error) {

        } else {
            const t = JSON.parse(JSON.stringify(res.data));
            init(t);
        }
    }

    const addCallback = (res) => {
        if (res.error) {
            console.log('something went wrong');
            console.log(res.errors);
        } else {
            createMessageDispatch({ message: `${res.item.name} ${locale.succ_added}`, messageType: 'succType' });
            addItem(res.item);
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

    const updateCallback = (res) => {
        if (res.error) {
            console.log(res.error);
        } else {
            createMessageDispatch({ message: `${res.item.name} ${locale.succ_update}`, messageType: 'succType' });
            updateItem(res.item, res.item._id);
            resetUpdate();
            clearForm();
        }
    }


    /** Action clicks */

    const resetUpdate = () => {
        setIsUpdate(null);
        setDisplayFields(staff.config.formName[FORM_NAME].create);
    }


    const submitForm = (e) => {
        e.preventDefault();

        if (isUpdate && isUpdate._id === staff.staff._id && fullForm.role.touched) {
            alert('cant add change own role');
        } else {
            const valid = isUpdate ? validatePartial() : validateFull();
            if (valid) {
                const all = isUpdate ? buildFormObject(true) : buildFormObject();

                const conf = isUpdate
                    ? { url: `${URLS.staff}/${isUpdate._id}`, method: 'PUT', callBack: updateCallback }
                    : { url: URLS.staff, method: 'POST', callBack: addCallback };

                makeCall({
                    ...conf,
                    data: all,
                    newId: 'submit'
                });
            }
        }
    }


    const update = (obj) => {
        const t = JSON.parse(JSON.stringify(obj));
        setIsUpdate(t);
        setDisplayFields(staff.config.formName[FORM_NAME].update);
        populateValues(obj);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    const quickBlock = () => {
        makeCall({
            url: `/staff/${isUpdate._id}/${!isUpdate.isBlocked}`,
            method: 'PUT',
            callBack: updateCallback
        });
    }

    return (
        <div>
            {(fetchState.isLoading && fetchState.id === 'submit') && <Spinner/>}
            <Title size={'h1'} message={locale.cont_staff} center />
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

            {(staff.staff.role === 3 && isUpdate) &&
                <Button
                    onClick={() => quickBlock()}
                    type='danger'
                    label={isUpdate.isBlocked ? locale.unBlock_staff : locale.block_staff}
                />
            }

            {(staff.config.formName[FORM_NAME].tableDisplay) &&

                (fetchState.isLoading && fetchState.id === 'fetchInit')
                ? <Spinner withBackground={false} />
                : <div className={classes.tableSpacing}>
                    <TableDisplay
                        list={toDisplayList}
                        config={staff.config.formName[FORM_NAME].tableDisplay.toDisplay}
                        update={staff.config.formName[FORM_NAME].update ? update : null}
                        viewMore={openPopup}
                        formName={FORM_NAME}
                        isSelected={isUpdate ? isUpdate._id : null}
                    />
                </div>
            }

            <Popup isOpen={isOpen.show}>
                <StaffPopup onClose={closePopup} item={isOpen.selected} />
            </Popup>
        </div>
    )
}

export default StaffManagementContainer;