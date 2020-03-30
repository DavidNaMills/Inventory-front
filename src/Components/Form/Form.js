import React from 'react';
import classes from './form.module.scss';
import { isMobileOnly } from 'react-device-detect';
import { useLocale } from '../../Context/LocaleContext';
import FormFactory from './Factory/FormFactory';
import Button from '../Button/Button';
import Title from '../Title/Title';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';

import objToArray from '../../helpers/objToArray/objToArray';


const Form = (props) => {
    const locale = useLocale();
    const {
        displayFields,
        user,
        fullForm,
        controlForm,
        updating,
        withTitle = true,

        submitCb = null,
        clearCb = null
    } = props;
    // isMobileOnly ? classes.form_mobile : classes.form__normal}
    return (
        <div className={isMobileOnly ? classes.blur_mobile : classes.blur__normal}>
            <div className={classes.form}>
                {withTitle && <Title message={updating ? `${locale.updating} ${updating}` : locale.creating} size='h3' />}
                <form onSubmit={submitCb}>
                    {
                        objToArray(fullForm).map((x, y) =>
                            <FormFactory
                                key={y}
                                config={x}
                                role={user.role}
                                displayFields={displayFields}
                                onChange={controlForm}
                            />
                        )
                    }
                    <div className={classes.form__buttonSpacing_large}>
                        <Button config={{ type: 'submit' }} type="submit" label={updating ? locale.update : locale.submit} Icon={PublishIcon} full />
                    </div>
                </form>
                {clearCb && <div className={classes.form__buttonSpacing_medium}>
                    <Button onClick={clearCb} label={locale.clear} type='clear' Icon={ClearIcon} full />
                </div>}
            </div>
        </div>
    )
}

export default Form;