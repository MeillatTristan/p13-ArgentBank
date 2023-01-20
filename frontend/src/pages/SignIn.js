import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CallGetUserInfos, CallLoginUser } from '../Service/CallApi';
import { loginUser } from '../store/actions/userAction';

function SignIn(props) {
  const [isSend, setIsSend] =  useState("false");
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const token = useSelector((state) => state.userLogged.token);
  const dispatch = useDispatch()

  const send = () => {
    if(isSend === "false") {
      setIsSend("true");
    } else {
      setIsSend("false")
    }
  }

  const formPreventDefault = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (isSend === "true") {
      const res = async () => {
        const token = await CallLoginUser({
          "email": document.getElementById('email').value,
          "password": document.getElementById('password').value,
        })

        const getUserInfo = await CallGetUserInfos(token);
        
        if (token === "error") {
          setError("Aucun utilisateur n'a été trouvé");
        } else if (getUserInfo === "error") {
          setError("Une erreur à eu lieu lors de la connexion, veuillez réessayer")
        } else {
          dispatch(loginUser({
            "token": token,
            "createdAt": getUserInfo.createdAt,
            "email": getUserInfo.email,
            "firstName": getUserInfo.firstName,
            "id": getUserInfo.id,
            "lastName": getUserInfo.lastName,
            "updatedAt": getUserInfo.updatedAt,
          }));
          localStorage.setItem('token', token);
        }
      } 
      res()
    }
  }, [isSend,dispatch])

  
  useEffect(() => {
    if(localStorage.getItem("token") || token) {
      return navigate("/profil")
    }
  }, [token, navigate])

  return (
      <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={formPreventDefault}>
        { error &&
          <>
          <div className='error'>
            <span >{error}</span>
          </div>
          </>
        }
          <div className="input-wrapper">
            <label htmlFor="email">Email</label><input type="email" id="email" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label><input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
          </div>

          <button onClick={send} className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;