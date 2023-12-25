import style from "../Form.module.scss";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../Ui/MyTextInput/MyTextInput";
import MyTextArea from "../../Ui/MyTextArea/MyTextArea";
import { registration, updateUser } from "../../../services/auth.service";
import Button from "../../Ui/Buttons/Button/Button";
import { toast } from "react-toastify";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const complianceCheck = (obj1, obj2) => {
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};

const SignupForm = ({ user, fetchUse, setActive }) => {
  const registrationHandler = async (values) => {
    const data = await registration(values);

    if (data) {
      setActive(false);
    }

    toast.success("User registration");
  };

  const update = async (values) => {
    await updateUser(values);
    setActive(false);
    toast.success("User updated");
  };

  return (
    <>
      <Formik
        initialValues={
          user
            ? { ...user }
            : {
                firstName: "",
                lastName: "",
                nickname: "",
                phone: "",
                email: "",
                description: "",
                password: "",
                comphormPasword: "",
                position: "",
              }
        }
        enableReinitialize
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          nickname: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          phone: Yup.string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("Required")
            .typeError(Yup.number, "The number must contain only numbers"),

          position: Yup.string().required("Required"),
          description: Yup.string().required("Required"),
          password: !user
            ? Yup.string()
                .required("Required")
                .min(6, "Password is too short - should be 6 chars minimum.")
                .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
            : "",

          comphormPasword: !user
            ? Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
                .min(6, "Password is too short - should be 6 chars minimum.")
                .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
            : "",
        })}
        onSubmit={async (values, actions) => {
          if (user) {
            if (!complianceCheck(user, values)) {
              try {
                await update(values);
              } catch (error) {
                //TODO: get rid of code duplication but how?!!!
                const err = error.response?.data.message;
                actions.setFieldError("email", err.toString());
                return false;
              }
            } else {
              toast.info("User not updated");
              setActive(false)

            }
          } else {
            try {
              await registrationHandler(values);
            } catch (error) {
              //TODO: get rid of code duplication but how?!!!
              const err = error.response?.data.message;
              actions.setFieldError("email", err.toString());
              return false;
            }
          }
          fetchUse();
        }}
      >
        <Form className={style.form}>
          <div className={style.form_name}>
            <div className={style.form_name_box}>
              <MyTextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="first name"
              />
            </div>
            <div className={style.form_name_box}>
              <MyTextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="last name"
              />
            </div>
          </div>

          <MyTextInput
            label="Nickname"
            name="nickname"
            type="text"
            placeholder="nickname"
          />

          <MyTextInput
            label="Phone number"
            name="phone"
            type="tel"
            placeholder="phone number"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="mail"
          />

          <MyTextArea
            label="Description"
            name="description"
            type="textarea"
            placeholder="description"
          />

          {user ? (
            <></>
          ) : (
            <>
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="password"
              />

              <MyTextInput
                label="Comphorm Password"
                name="comphormPasword"
                type="password"
                placeholder="comphorm password"
              />
            </>
          )}
          <MyTextInput
            label="Position"
            name="position"
            type="text"
            placeholder="position"
          />

          <div className={style.button}>
            <Button title="Submit" type="submit" />
          </div>
          {user ? (
            <></>
          ) : (
            <div className={style.form_question}>
              <p>New to CompanyList?</p>
              <button type="button" onClick={() => setActive(false)}>
                Join now
              </button>
            </div>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default SignupForm;
