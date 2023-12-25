import { useNavigate, useParams } from "react-router-dom";
import style from "./CompanyPage.module.scss";
import { useEffect, useState } from "react";
import Loader from "../../components/Ui/Loader /Loader";
import { getCompanyById } from "../../services/company.service";

function CompanyPage() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const fetchCompanies = async () => {
    setLoading(true);
    const { data } = await getCompanyById(id);
    setCompany(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.company}>
          <button onClick={goBack} className={style.company_goBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50"
              viewBox="0 -960 960 960"
              width="50"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </button>
          <div className={style.company_name}>
            <h2>{company.name}</h2>
          </div>
          <div className={style.company_holder}>
            <div className={style.company_holder_info}>
              <div className={style.company_box}>
                <h3 className={style.company_title}>Address: </h3>
                <p>{company.address}</p>
              </div>
              <div className={style.company_box}>
                <h3 className={style.company_title}>Service of activity: </h3>
                <p>{company.service}</p>
              </div>
              <div className={style.company_box}>
                <h3 className={style.company_title}>Number of employees: </h3>
                <p>{company.employees}</p>
              </div>
              <div className={style.company_box}>
                <h3 className={style.company_title}>Type: </h3>
                <p>{company.type.title}</p>
              </div>
            </div>
            <div className={style.company_description}>
              <h3 className={style.company_title}>Description: </h3>
              <p>{company.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CompanyPage;
