import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import logo from '../img/argentBankLogo.png';
import { CallGetUserInfos } from '../Service/CallApi';
import { loginUser } from '../store/actions/userAction';

function Header(props) {
  const dispatch = useDispatch()
  if(localStorage.getItem("token")) {
    const restConnect = async () => {
      const getUserInfo = await CallGetUserInfos(localStorage.getItem("token"));
      if (getUserInfo !== "error") {
        dispatch(loginUser({
          "token": localStorage.getItem("token"),
          "createdAt": getUserInfo.createdAt,
          "email": getUserInfo.email,
          "firstName": getUserInfo.firstName,
          "id": getUserInfo.id,
          "lastName": getUserInfo.lastName,
          "updatedAt": getUserInfo.updatedAt,
        }));
      }
    }
    restConnect();
  }

  const firstName = useSelector((state) => state.userLogged.firstName);
  const lastName = useSelector((state) => state.userLogged.lastName);
  const token = useSelector((state) => state.userLogged.token);


  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={ logo }
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
      { 
        !token &&
        <>
            <NavLink to="/sign-in" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                Sign In
            </NavLink>
        </>
      }
        
      {/* Connecté */}
      {
        token &&
        <>
            <NavLink to="/profil" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                {firstName + " " + lastName}
            </NavLink>
            <NavLink to="/logout" className="main-nav-item">
                <i className="fa fa-sign-out"></i>
                Sign Out
            </NavLink>
        </>
      }
      </div>
    </nav>
  );
}

export default Header;