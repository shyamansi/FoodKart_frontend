import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from "react-router-dom";
const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const handleSuccess=(credentialResponse)=>{
        fetch('http://localhost:3000/users/auth/google_oauth2/callback',{
            method: 'POST',
              credentials: 'include',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                token: credentialResponse.credential,
            }),
        })
        .then((response)=>{
            if (!response.ok){
                throw new Error("Network response was not ok");
            }
        return response.json();
        })
       .then((data)=>{
        localStorage.setItem("token",data.token);
        alert("login successful11111");
        navigate('/dashboard_admin');
       })

       .catch((err)=>{
        console.error("login failed", err);
       });  
    };
  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log('Login Failed')}
    />
  );
}

export default GoogleLoginButton
