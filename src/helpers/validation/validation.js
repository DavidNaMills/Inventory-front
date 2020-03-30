export const isNumeric=(value)=>typeof(value)==='number'?true:false;

//FIXME:
export const isRequired=(value)=>{
    if(typeof(value)==='string'){
        return value.length>0?true:false
    }
    return value>0?true:false
};


export const minLength = (min, value)=>{
    if(typeof(value)==='string'){
        return value.length>=min?true:false;
    }else if(isNumeric(value)){
        return value>=min?true:false;
    } else {
        return false;
    }
}

export const maxLength = (max, value)=>{
    if(isNumeric(value)){
        return value<=max?true:false;
    } else if(typeof(value)==='string'){
        return value.length<=max?true:false;
    } else {
        return false;
    }
}

export const isEmail = (value)=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

export const isStringNumeric = (value)=>{
    if(typeof(value)==='string'){
        const reg = /^-?\d+\.?\d*$/;
        return reg.test(value);
    } else {
        return false;
    }
}

export const isPhone = (value) =>{
    const re = /^[1]\d{10}$/;
    return re.test(String(value).toLowerCase());
}

export const isPassword = (value1, value2) =>{
    return (value1 === value2);
}


const formValidation = ({theForm}) => {
    let isValid = true;
    const fullForm = JSON.parse(JSON.stringify(theForm));
    
    for (let value in fullForm){
        fullForm[value].errorMsg = [];

        if(fullForm[value].shouldValidate){
                if(fullForm[value].validation.isRequired){
                        if(!isRequired(fullForm[value].value)){
                            isValid = false;
                            fullForm[value].isValid=false;
                            fullForm[value].errorMsg = fullForm[value].errorMsg.concat(fullForm[value].validation.isRequired.errMsg);
                        }
                    }


                    if(fullForm[value].validation.minLength){
                        if(!minLength(fullForm[value].validation.minLength.req, fullForm[value].value)){
                            isValid = false;
                            fullForm[value].isValid=false;
                            fullForm[value].errorMsg = fullForm[value].errorMsg.concat(fullForm[value].validation.minLength.errMsg);
                        }
                    }


                    if(fullForm[value].validation.maxLength){
                        if(!maxLength(fullForm[value].validation.maxLength.req, fullForm[value].value)){
                            isValid = false;
                            fullForm[value].isValid=false;
                            fullForm[value].errorMsg = fullForm[value].errorMsg.concat(fullForm[value].validation.maxLength.errMsg);
                        }
                    }


                    if(fullForm[value].validation.isNumeric){
                        if(!isNumeric(fullForm[value].value)){
                            isValid = false;
                            fullForm[value].isValid=false;
                            fullForm[value].errorMsg = fullForm[value].errorMsg.concat(fullForm[value].validation.isNumeric.errMsg);
                        }
                    }
            

                    if(fullForm[value].validation.isEmail){
                        if(!isEmail(fullForm[value].value)){
                            isValid = false;
                            fullForm[value].isValid=false;
                            fullForm[value].errorMsg = fullForm[value].errorMsg.concat(fullForm[value].validation.isEmail.errMsg);
                        }
                    }
            

                    if(fullForm[value].validation.isStringNumeric){
                        if(!isStringNumeric(fullForm[value].value)){
                            isValid = false;
                            fullForm[value].isValid=false;
                            fullForm[value].errorMsg = fullForm[value].errorMsg.concat(fullForm[value].validation.isStringNumeric.errMsg);
                        }
                    }

            
                    if(fullForm[value].validation.isPhone){
                        if(!isPhone(fullForm[value].value)){
                            isValid = false;
                            fullForm[value].isValid=false;
                            fullForm[value].errorMsg = fullForm[value].errorMsg.concat(fullForm[value].validation.isPhone.errMsg);
                        }
                    }
                    
                    
                    if(fullForm[value].validation.isPassword){
                        if(!isPassword(
                            fullForm[value].value, 
                            fullForm[fullForm[value].validation.isPassword.field].value
                        )){
                            isValid = false;
                            fullForm[value].isValid=false;
                            fullForm[value].errorMsg = fullForm[value].errorMsg.concat(fullForm[value].validation.isPassword.errMsg);
                        }
                    }

        }
    }
    return { isValid, updatedForm: fullForm};
}

export default formValidation;
