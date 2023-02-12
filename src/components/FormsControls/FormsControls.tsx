import React, {FC, ReactNode} from "react";
import s from './FormControl.module.css';
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: ReactNode
}

const FormControl: FC<FormControlPropsType> = ({ meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const TextArea: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
   return <FormControl {...props}>
       <textarea {...input} {...restProps}/>
   </FormControl>
}

export const Input: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}

//type StringKeys = Extract<keyof LoginFormValuesType, string>