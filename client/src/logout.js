import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

export default function Logout() {

  const token = localStorage.getItem('tokenApi');
  const history = useHistory();

  function logout() {
    fetch('/logout', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }})
        .then((res) => res.json()).then(data => {
          if(data.redirect) {
            history.push(data.redirectUrl)
          }
    })
  }

  return (
      <li onClick={logout} className="nav-item bg-danger close">
        <NavLink className="nav-link" exact to="/">Выйти</NavLink>
      </li>
  )
}
