import React, { useState } from 'react';
import classes from './personal.module.scss';
import { useSelector } from 'react-redux';
import { personalFormConfig } from '../../configs/formConfigs/personalFormConfig';
// import TimedLogout from '../../Components/TimedLogout/TimedLogout';

import useForm from '../../hooks/useForm/useForm';
import useAxios from '../../hooks/useAxios/useAxios';
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';
import axios from '../../Axios/axiosInstance';
import { useLocale } from '../../Context/LocaleContext';
import { isMobileOnly } from 'react-device-detect';
import Form from '../../Components/Form/Form';
import Title from '../../Components/Title/Title';
import Button from '../../Components/Button/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { localeOptions } from '../../Locale/localeOptions';
import useChangeLanguage from '../../hooks/useChangeLanguage/useChangeLanguage';


const FORM_NAME = 'personal';

const PersonalDetailsContainer = (props) => {
    const locale = useLocale();
    const { staff } = useSelector(state => state);
    const { makeChange } = useChangeLanguage();

    const displayFields = staff.config.formName[FORM_NAME].create;

    const { createMessageDispatch } = useDispatchHook();
    const {
        fullForm,
        buildFormObject,
        controlForm,
        clearForm,
        validatePartial
    } = useForm({ formConfig: personalFormConfig(locale.errors) });

    const { makeCall } = useAxios(axios);

    const submitForm = (e) => {
        e.preventDefault();

        const valid = validatePartial();
        if (valid) {
            const all = buildFormObject(true);
            delete all.passwordConfirm;

            makeCall({
                url: `/staff/${staff.staff._id}`,
                method: 'PUT',
                data: all,
                callBack: updateCallback
            });
        }
    }

    const updateCallback = (res) => {
        if (res.error) {

        } else {
            createMessageDispatch({
                message: locale.succ_personal_update,
                messageType: 'succType'
            });
            // resetUpdate();
        }
    }


    return (
        <div className={classes.personal}>
            <Title size={'h1'} message={locale.cont_personal} center />
            <div style={{ marginTop: '40px' }}>
                <Button
                    onClick={() => props.history.push('/logout')}
                    label={locale.logout}
                    type='information'
                    full={isMobileOnly ? true : false}
                    Icon={ExitToAppIcon}
                />
            </div>
            <Form
                formConfig={fullForm}
                displayFields={displayFields}
                controlForm={controlForm}
                title={locale[staff.config.formName[FORM_NAME].title]}
                formName={FORM_NAME}
                user={staff.config}
                fullForm={fullForm}
                submitCb={submitForm}
                clearCb={clearForm}
                updating={locale.personal_update}
            />
            <div className={isMobileOnly ? classes.blur_mobile : classes.blur__normal}>
                <div className={classes.form}>
                    <Title size={'h3'} message={locale['chng_lang']} />
                    <select onChange={e => makeChange(e.target.value)} className={classes.personal__selectStyle} value={locale.which_lang}>
                        {
                            localeOptions.map(x =>
                                <option key={x.name} value={x.value}>
                                    {x.name}
                                </option>
                            )
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetailsContainer;