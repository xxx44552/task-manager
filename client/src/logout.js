import React from 'react';
import { withRouter } from 'react-router-dom';

export default function Logout(props) {

  const token = localStorage.getItem('tokenApi');

  console.log(props)

  function logout() {
    console.log(1)
    fetch('/logout', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }})
        .then((res) => res.json()).then(data => {
          if(data.redirect) {


          }
    })
  }

  return (
      <button onClick={logout}>Выйти</button>
  )
}
