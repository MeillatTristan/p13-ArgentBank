import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CallUpdateUserInfos } from '../Service/CallApi';
import { loginUser } from '../store/actions/userAction';

function Users(props) {
  let error;
  const firstName = useSelector((state) => state.userLogged.firstName);
  const lastName = useSelector((state) => state.userLogged.lastName);
  const token = useSelector((state) => state.userLogged.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if(!localStorage.getItem("token") || !token) {
      return navigate("/sign-in")
    }
  })

  const [isClicked, setIsClicked] = useState(false);
  const buttonHandler = () => {
    if (isClicked === true) {
      setIsClicked(false)
    } else {
      setIsClicked(true)
    }
  }

  const formPreventDefault = (e) => {
    e.preventDefault();
  }
  const [isSend, setIsSend] = useState(false)
  const sendHandler = () => {
    if (isSend === true) {
      setIsSend(false)
    } else {
      setIsSend(true)
      const call = async () => {
        const updateInfo = await CallUpdateUserInfos(token, {
          "firstName": document.getElementById('firstname').value,
          "lastName": document.getElementById('lastname').value,
        })
        if (updateInfo !== "error") {
          dispatch(loginUser({
            "firstName": updateInfo.firstName,
            "lastName": updateInfo.lastName,
          }));
        } else {
          error = "An error has occurred"
        }
      }
      call();
    }
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />
        {
          !isClicked &&
          <>
            {firstName + " " + lastName}!
          </>
        }
        </h1>
        {
          !isClicked &&
          <>
            <button onClick={ buttonHandler } className="edit-button">Edit Name</button>
          </>
        }
        {
          isClicked &&
          <>
            <form className='formModifyName' onSubmit={formPreventDefault}>
              {
                error && 
                <>
                  <div className='error'>
                    <span >{error}</span>
                  </div>
                </>
              }
              <div className='containerInput'>
                <input id="firstname" defaultValue={firstName} />
                <input id="lastname" defaultValue={lastName} />
              </div>
              <div className='containerButton'>
                <button onClick={sendHandler}>Save</button>
                <button onClick={buttonHandler}>Cancel</button>
              </div>
            </form>
          </>
        }
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default Users;