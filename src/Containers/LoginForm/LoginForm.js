import React, { useEffect } from 'react';
import classes from './Login.module.scss';
import Form from '../../Components/Form/Form';
import { loginConfig } from '../../configs/formConfigs/loginFormConfig';

import axios from '../../Axios/axiosInstance';
import useAxios from '../../hooks/useAxios/useAxios';
import useForm from '../../hooks/useForm/useForm';
import useDispatchHook from '../../hooks/useDispatchHook/useDispatchHook';
import { useLocale } from '../../Context/LocaleContext';

import Title from '../../Components/Title/Title';
import Spinner from '../../Components/Spinner/Spinner';

const tempUserConfig = {
    role: 99,
    formName: {
        login: {
            create: {
                phone: true,
                password: true
            }
        }
    }
}

const FORM_NAME = 'login';

const LoginForm = () => {
    const locale = useLocale();
   

    const { userLoginDispatch, initTypesDispatch } = useDispatchHook();
    const { fetchState, makeCall } = useAxios(axios);

    const {
        fullForm,
        formRef,
        buildFormObject,
        controlForm,
        validateFull
    } = useForm({ formConfig: loginConfig(locale.errors) });




    // useEffect(()=>{
    //     makeCall({
    //         url: '/login',
    //         method: 'POST',
    //         data: {phone: '13103718079', password: 'david_mills'},
    //         callBack: loginCallback
    //     })
    // }, []);


    const loginCallback = (res) => {
        if (res.staff && res.token) {
            initTypesDispatch();
            userLoginDispatch(res);
        }
    };


    const submitForm = (e) => {
        e.preventDefault();

        const valid = validateFull();
        if (valid) {
            const all = buildFormObject();

            makeCall({
                url: '/login',
                method: 'POST',
                data: all,
                callBack: loginCallback
            })
        }
    }

    return (
        <React.Fragment>
            <div className={classes.image_container}></div>
            <div className={classes.overlay}>
                <div className={classes.login}>
                    
                {fetchState.isLoading && <div><Spinner/></div>}
                <React.Fragment>
                    <Title size={'h1'} message={locale[FORM_NAME]} />
                </React.Fragment>
                <React.Fragment>
                <Form
                    controlForm={controlForm}
                    title='Login'
                    displayFields={tempUserConfig.formName.login.create}
                    formName={FORM_NAME}
                    user={tempUserConfig}
                    fullForm={fullForm}
                    formRef={formRef}
                    submitCb={submitForm}
                    withTitle={false}
                />
                </React.Fragment>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoginForm;