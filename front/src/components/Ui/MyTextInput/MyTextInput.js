import React from "react";
import { useField } from "formik";
import style from "../UiStyles.module.scss";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={style.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className={style.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default MyTextInput;
