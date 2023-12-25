import "./App.scss";
import { useDispatch } from "react-redux";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { getProfile } from "./services/auth.service";
import { login, logout } from "./store/slice/UserSlice";
import { useEffect, useState } from "react";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
import { instance } from "./api/axios.api";
import { companyTypes } from "./store/slice/selectDataSlice";
import Loader from "./components/Ui/Loader /Loader";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const checkAuth = async () => {
    const { accessToken } = getTokenFromLocalStorage();

    try {
      if (accessToken) {
        const data = await getProfile();
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.log("Get Profile Error: " + error.message);
    }
  };

  const getCommonData = async () => {
    const { data } = await instance.get("company-type");
    dispatch(companyTypes(data));
  };

  useEffect(() => {
    (async () => {
      await Promise.all([getCommonData(), checkAuth()]);
      setLoading(false);
    })();
  }, []);

  return <>{loading ? <Loader /> : <RouterProvider router={router} />}</>;
}

export default App;
