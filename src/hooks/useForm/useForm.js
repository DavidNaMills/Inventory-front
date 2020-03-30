import { useEffect, useState, useRef } from 'react';
import validation from '../../helpers/validation/validation';

const useForm = ({ formConfig, state }) => {
    const initFormRef = useRef();

    const [fullForm, setFullForm] = useState({});


    useEffect(() => {
        configureForm();
    }, []);

    const configureForm = () => {
        let tempConf = formConfig.form;
        if (formConfig.select) {
            const updates = formConfig.select.map(x => ({
                field: x.field,
                newOptions: state[x.add]
            }));
            tempConf = updateSelectOptions(tempConf, updates);
        }
        initFormRef.current = tempConf;
        setFullForm(tempConf);
    }

    const updateSelectOptions = (form, updates) => {
        const tempOrig = JSON.parse(JSON.stringify(form));

        if (updates.length > 0) {
            updates.forEach(x => {
                const tempConfig = { ...tempOrig[x.field] };
                const newConfig = {
                    ...tempConfig.elementConfig,
                    options: x.newOptions
                }
                tempConfig.elementConfig = newConfig;

                if (x.newOptions.length > 0) {
                    tempConfig.value = x.newOptions[0]._id
                }

                tempOrig[x.field] = tempConfig;
            })
        }
        return tempOrig;
    }


    const populateValues = (vals) => {
        const tempForm = JSON.parse(JSON.stringify(initFormRef.current));
        delete vals._id;

        for (let x in vals) {
            // TODO: skip if is image
            if (tempForm[x]) {
                tempForm[x].value = vals[x];
            }
        }

        setFullForm(tempForm);
    }


    const controlForm = (e, id) => {
        let newValue;
        const type = e.target.type ? e.target.type : '';
        switch (type.toLowerCase()) {
            case 'select-multiple':
                const select = e.target.options;
                newValue = [...select].filter(o => o.selected).map(o => o.value);
                break;
            
            case 'file':
                newValue = e.target.files;
                break;

            default:
                newValue = e.target.value;
        }

        const updatedState = { ...fullForm };      // copy of the state
        const updatedElement = { ...fullForm[id] };
        updatedElement.value = newValue;
        updatedElement.touched = true;
        updatedState[id] = updatedElement;

        setFullForm(updatedState)
    }


    const buildFormObject = (touched = false) => {
        const all = {};
        if (touched) {
            for (let x in fullForm) {
                if (fullForm[x].value && fullForm[x].touched) {
                    all[x] = fullForm[x].value;
                }
            }
        } else {
            for (let x in fullForm) {
                if (fullForm[x].value) {
                    all[x] = fullForm[x].value;
                }
            }
        }
        return all;
    }

    const clearForm = () => {
        setFullForm(initFormRef.current);
    }


    const validateFull = () => {
        const res = validation({ theForm: fullForm });
        setFullForm(res.updatedForm);
        return res.isValid ? true : false;
    }

    const validatePartial = () => {
        const tempForm = {};
        let res;
        for(let x in fullForm){
            if(fullForm[x].touched){
                tempForm[x] = fullForm[x];
            }
        }
        if(Object.keys(tempForm).length > 0){
            res = validation({ theForm: tempForm });
            setFullForm({...fullForm, ...res.updatedForm});
        } else { 
            res = {
                isValid: false
            };
        }
        return res.isValid ? true : false;
    }

    return {
        fullForm,
        buildFormObject,    //
        controlForm,        //
        clearForm,          //
        populateValues,     //
        validateFull,       //
        validatePartial     //
    }
}

export default useForm;