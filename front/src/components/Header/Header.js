import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import style from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slice/UserSlice";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { useAuth } from "../../hooks/useAuth";

const setActive = ({ isActive }) => (isActive ? style.active_link : "");

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isActive = useAuth();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    navigate("/login");
  };

  return (
    <header className={style.header}>
      <h2 className={style.header_title}>CompanyList</h2>
      {isActive ? (
        <>
          <nav className={style.header__navigation}>
            <NavLink to="/" className={setActive}>
              Profile
            </NavLink>
            <NavLink to="/companies" className={setActive}>
              Companies
            </NavLink>
          </nav>
          <button className={style.header_logout} onClick={logoutHandler}>logout</button>
        </>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
