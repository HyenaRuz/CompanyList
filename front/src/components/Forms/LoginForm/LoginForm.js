import style from "../Form.module.scss";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyTextInput from "../../Ui/MyTextInput/MyTextInput";
import { login } from "../../../services/auth.service";
import { setTokenToLocalStorage } from "../../../helpers/localstorage.helper";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../../store/slice/UserSlice";
import Button from "../../Ui/Buttons/Button/Button";

const LoginForm = ({ setActive }) => {
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (values) => {
    try {
      const data = await login(values);
      if (data) {
        setTokenToLocalStorage(data);
        dispatch(loginAction(data));
        navigate("/");
        toast.success("Login Success")
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(true);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("Required")
            .min(6, "Password is too short - should be 6 chars minimum."),
        })}
        onSubmit={loginHandler}
      >
        <Form className={style.form} onClick={() => setErrorMessage(false)}>
          {errorMessage ? (
            <div style={{ color: "red" }}>User is not found</div>
          ) : (
            <></>
          )}
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="mail"
          />

          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="password"
          />
          <div className={style.button}>
            <Button title="Submit" type="submit" />
          </div>

          <div className={style.form_question}>
            <p>Already on CompanyList?</p>
            <button type="button" onClick={() => setActive(true)}>
              Sign up
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
