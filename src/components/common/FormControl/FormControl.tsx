import React from "react";
import s from "./FormControl.module.css";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { ValidatorType } from "../../../utils/validators/form-validators";


type FormControlPropsType = {
  meta: WrappedFieldMetaProps,
  children: React.ReactNode
  type?: string 
}

const FormControl:React.FC<FormControlPropsType> = (props) => {

  const {
    meta: { error, touched },
    type,
    children,
  } = props;

  const hasError = touched && error ? s.error : "";
  const isCheckBox = type === "checkbox" || type === "radio" ? s.checkbox : "";
  return (
    <div className={`${s.formControl} ${isCheckBox} ${hasError}`}>
      {children}
      {error && touched && <span>{error}</span>}
    </div>
  );
};
export const Textarea: React.FC<WrappedFieldProps> = (props) => {

  const { input} = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...props} />
    </FormControl>
  );
};
export const Input: React.FC<WrappedFieldProps> = (props) => {
  
  const { input } = props

  return (
    <FormControl {...props}>
      <input {...input} {...props} />
    </FormControl>
  );
};
export const CheckBox: React.FC<WrappedFieldProps> = (props) => {
  const { input } = props

  return (
    <FormControl {...props} type = "checkbox">
      <input {...input} {...props} type = "checkbox" />
    </FormControl>
  );
}

export const createField = (name: string, component:string|React.FC<WrappedFieldProps>, validators:Array<ValidatorType<string>|ValidatorType<number>>, props?:any) => {
  return (
    <Field name={name} component={component} validate={validators} {...props} />
  );
};
