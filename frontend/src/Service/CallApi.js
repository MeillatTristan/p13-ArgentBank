import { Navigate, useNavigate } from "react-router-dom";


export const CallLoginUser = async (data) => {
  try {
    let res = await fetch('http://localhost:3001/api/v1/user/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    })
    let body = await res.json();
    return body.body.token
  } catch (e) {
    return 'error'
  }
};

export const CallGetUserInfos = async (token) => {
  try {
    let res = await fetch('http://localhost:3001/api/v1/user/profile',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer" + token
        }
    })
    let data = await res.json();
    return data.body
  } catch (e) {
    return 'error'
  }
}

export const CallUpdateUserInfos = async (token, data) => {
  let call;
  try {
    call = await fetch('http://localhost:3001/api/v1/user/profile',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer" + token
      },
      body: JSON.stringify(data),
    })
    
    
  } catch (e) {
    console.log('There was an error', e);

  }

  if (call?.ok) {
    let res = await call.json();
    return res.body
  } else {
      return "error"
  }
}