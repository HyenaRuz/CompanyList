import { useNavigate } from "react-router-dom";
import { deleteCompany } from "../../services/company.service";
import Button from "../Ui/Buttons/Button/Button";
import style from "./Company.module.scss";
import { toast } from "react-toastify";

function Company({ data, setSelectCompanies, setActive, fetchCompanies }) {
  const navigate = useNavigate();

  const notificationMessage = (
    <span>
      Company <strong  className="bold-text">{data.name}</strong> deleted
    </span>
  );

  return (
    <div
      className={style.company}
      onClick={() => navigate(`/companies/${data.id}`)}
    >
      <div className={style.company_box}>
        <p className={style.company_title}>Tytle: </p>
        <p>{data.name}</p>
      </div>
      <div className={style.company_box}>
        <p className={style.company_title}>Service of activity: </p>
        <p>{data.service}</p>
      </div>
      <div className={style.company_box}>
        <p className={style.company_title}>Number of employees: </p>
        <p>{data.employees}</p>
      </div>
      <div className={style.company_box}>
        <p className={style.company_title}>Type: </p>
        <p>{data.type.title}</p>
      </div>

      <div
        className={style.company_controll}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          title="Delete"
          method={async () => {
            await deleteCompany(data.id);
            fetchCompanies();
            toast.info(notificationMessage);
          }}
        />
        <Button
          title="Update"
          method={() => {
            setSelectCompanies(data);
            setActive(true);
          }}
        />
      </div>
    </div>
  );
}

export default Company;
