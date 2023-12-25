import Modal from "../../components/Modal/Modal";
import { getAllCompanies } from "../../services/company.service";
import Button from "../../components/Ui/Buttons/Button/Button";
import style from "./CompaniesPages.module.scss";
import CompaniesForm from "../../components/Forms/CompaniesForm/CompanyForm";
import Company from "../../components/Company/Company";
import { useEffect, useState } from "react";
import Loader from "../../components/Ui/Loader /Loader";
import { toast } from "react-toastify";

function CompaniesPages() {
  const [companies, setCompanies] = useState(null);
  const [selectCompanies, setSelectCompanies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const fetchCompanies = async () => {
    setLoading(true);
    const { data } = await getAllCompanies(
      sortBy == null ? "name" : sortBy,
      sortOrder == null ? "ASC" : sortOrder
    );
    setCompanies(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, [sortBy, sortOrder]);

  const notify = () => toast("Wow so easy!");

  return (
    <main className={style.page}>
      <div className={style.page_box}>
        <Button
          method={() => setModal(true)}
          width={"200px"}
          title={"Create Company"}
        />

        <form className={style.page_select}>
          <select
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value={"name"}>Name</option>
            <option value={"service"}>Service</option>
          </select>
          <select
            name="sortOrder"
            onChange={(e) => {
              setSortOrder(e.target.value);
            }}
          >
            <option value={"ASC"}>Descending</option>
            <option value={"DESC"}>Ascending</option>
          </select>
        </form>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className={style.page_companiesList}>
          {companies?.length ? (
            companies.map((company, index) => (
              <Company
                data={company}
                key={index}
                setSelectCompanies={setSelectCompanies}
                setActive={setModal}
                fetchCompanies={fetchCompanies}
              />
            ))
          ) : (
            <h3 className={style.message}>No companies</h3>
          )}
        </div>
      )}
      <Modal
        active={modal}
        setActive={() => {
          setModal(false);
          setSelectCompanies(null);
        }}
      >
        <CompaniesForm
          selectCompanies={selectCompanies}
          fetchCompanies={fetchCompanies}
          setActive={setModal}
        />
      </Modal>
      {setModal ? <></> : notify()}
    </main>
  );
}

export default CompaniesPages;
