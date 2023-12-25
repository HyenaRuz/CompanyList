import { Formik, Form } from "formik";
import MyTextInput from "../../Ui/MyTextInput/MyTextInput";
import MyTextArea from "../../Ui/MyTextArea/MyTextArea";
import MySelect from "../../Ui/MySelect/MySelect";
import style from "../Form.module.scss";
import Button from "../../Ui/Buttons/Button/Button";
import {
  createCompany as created,
  updateCompany as update,
} from "../../../services/company.service";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const updateCompany = async (id, values) => {
  await update(id, values);
  toast.success(
    <span>
      Company <strong className="bold-text">{values.name}</strong> updated
    </span>
  );
};

const createCompany = async (values, actions) => {
  await created(values);
  toast.success(
    <span>
      Company <strong className="bold-text">{values.name}</strong> created
    </span>
  );
};

const complianceCheck = (obj1, obj2) => {
  const obj = { ...obj2, type: obj2.type?.id };
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key) && obj.hasOwnProperty(key)) {
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj[key])) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};

function CompaniesForm({ selectCompanies, fetchCompanies, setActive }) {
  const types = useSelector((state) => state.selectData.companyTypes);

  return (
    <>
      <Formik
        initialValues={
          selectCompanies
            ? { ...selectCompanies, type: selectCompanies.type?.id }
            : {
                name: "",
                service: "",
                address: "",
                employees: "",
                description: "",
                type: types[0]?.id,
              }
        }
        enableReinitialize={true}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          address: Yup.string().required("Required"),
          service: Yup.string().required("Required"),
          employees: Yup.number().required("Required"),
          type: Yup.number().required("Required"),
          description: Yup.string().required("Required"),
        })}
        onSubmit={async (values, actions) => {
          if (selectCompanies) {
            if (!complianceCheck(values, selectCompanies)) {
              try {
                await updateCompany(selectCompanies?.id, values);
              } catch (error) {
                //TODO: get rid of code duplication but how?!!!
                const err = error.response?.data.message;
                actions.setFieldError("name", err.toString());
                return false;
              }
            } else {
              toast.info("Company not updated");
              setActive(false)
            }
          } else {
            try {
              await createCompany(values, actions);
            } catch (error) {
              //TODO: get rid of code duplication but how?!!!
              const err = error.response?.data.message;
              actions.setFieldError("name", err.toString());
              return false;
            }
          }
          actions.resetForm();
          setActive(false);
          fetchCompanies();
        }}
      >
        <Form className={style.form}>
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            placeholder={selectCompanies?.name}
          />

          <MyTextInput
            label="Address"
            name="address"
            type="text"
            placeholder={selectCompanies?.address}
          />

          <MyTextArea
            label="Description"
            name="description"
            type="textarea"
            placeholder={selectCompanies?.description}
          />

          <MyTextInput
            label="Service"
            name="service"
            type="text"
            placeholder={selectCompanies?.service}
          />

          <MyTextInput
            label="Employees"
            name="employees"
            type="number"
            placeholder={selectCompanies?.employees}
          />

          <MySelect label="Type" name="type">
            {types.map((type, index) => (
              <option value={type.id} key={index}>
                {type.title}
              </option>
            ))}
          </MySelect>

          <div className={style.button}>
            <Button title="Submit" type="submit" />
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default CompaniesForm;
