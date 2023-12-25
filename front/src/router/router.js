import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/Layouts/DefaultLayout/DefaultLayout";
import HomePage from "../Pages/Home/HomePage";
import CompaniesPages from "../Pages/Companies/CompaniesPages";
import LoginPage from "../Pages/LoginPage/LoginPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/companies",
        element: <CompaniesPages />,
      },
      { path: "companies/:id", element: <CompanyPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);
