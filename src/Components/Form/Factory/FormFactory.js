import React from 'react';
import classes from './formFactory.module.scss';
import {useLocale} from '../../../Context/LocaleContext';

const FormFactory = (props) => {
    const locale = useLocale();
    const { config, displayFields, onChange } = props;
    let element = null;
    if (displayFields && displayFields[config.id]) {
        
        switch (config.elementType.toLowerCase()) {
            case 'input':

                element = <input
                    key={config.id}
                    id={config.id}
                    {...config.elementConfig}
                    placeholder= {locale[config.elementConfig.placeholder]}
                    label={locale[config.elementConfig.placeholder]}
                    onChange={e => onChange(e, config.id)}
                    value={config.value}
                    className={classes.input}
                />
                break;

            case 'select':
                element = < select
                    id={config.id}
                    onChange={e => onChange(e, config.id)}
                    className={classes.select}
                >
                    {config.elementConfig.options.map(x => {
                        return (
                            <option
                                key={x._id}
                                value={x._id}
                            >
                                {x.displayValue}
                            </option>
                        )
                    }
                    )}
                </select>
                break;

            case 'multiple':
                element = < select
                    id={config.id}
                    multiple
                    onChange={e => onChange(e, config.id)}
                    className={classes.select}
                >
                    {config.elementConfig.options.map(x => {
                        return (
                            <option
                                key={x._id}
                                value={x._id}
                            >
                                {x.displayValue}
                            </option>
                        )
                    }
                    )}
                </select>
                break;

            case 'image':
                element = <input
                    type = 'file'
                    onChange={(e) => onChange(e, config.id)}
                    placeholder={locale[config.elementConfig.placeholder]}
                    className={classes.input}
            />
                break;

            default:
                element = <p>{`${config.elementType} : ${config.elementConfig.placeholder}`}</p>
                break;
        }
    }   // end of if

    return (
        <React.Fragment>
            {
                element
                    ? <div className={classes.formFactory}>
                        <label htmlFor={config.id} className={classes.formFactory__label}>{locale[config.elementConfig.placeholder]}</label>
                        {element}
                        {
                            (config.errorMsg && config.errorMsg.length > 0 ) &&
                                <div className={classes.formFactory__errorMsg}>
                                    {config.errorMsg.map((e, c)=><p key={c}>{e}</p>)}
                                </div>
                        }
                    </div>
                    : null
            }
        </React.Fragment>
    )
}

export default FormFactory;