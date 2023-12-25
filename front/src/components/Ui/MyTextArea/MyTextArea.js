import React from "react";
import style from "../UiStyles.module.scss";
import { useField } from "formik";

function MyTextArea({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={style.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea className={style.input} {...field} {...props}></textarea>
      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : null}
    </>
  );
}

export default MyTextArea;
