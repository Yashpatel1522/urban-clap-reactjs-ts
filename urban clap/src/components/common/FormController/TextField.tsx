import React from "react";
import { ErrorMessage, useField } from "formik";

export interface InputProps {
  label: string;
  name: string;
  validate?: (value: any) => undefined | string | Promise<any>;
  type?: string;
  multiple?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: any;
  className?: string;
  options?: any;
  id?: string;
  style?: {};
}

const TextField = ({ label, ...props }: InputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      {label ? <label htmlFor={field.name}>{label}</label> : <></>}
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};

export default TextField;
