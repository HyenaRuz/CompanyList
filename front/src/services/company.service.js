import { instance } from "../api/axios.api";

export const createCompany = async (companyData) => {
  const { data } = await instance.post("/companies", companyData);
  return data;
};

export const getAllCompanies = async ( sortBy, sortOrder ) =>
  instance.get(`companies/my?sortBy=${sortBy}&sortOrder=${sortOrder}`);

export const deleteCompany = async (id) =>
  instance.delete(`/companies/company/${id}`);

export const updateCompany = async (id, companyData) => {
  const { data } = await instance.patch(
    `/companies/company/${id}`,
    companyData
  );
  return data;
};
export const getCompanyById = async (id) => {
  return instance.get(`/companies/company/${id}`);
};
