import React, {useState} from 'react';
import Avatar from "./Avatar";
import {NavLink} from "react-router-dom";

export default function Edit () {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [password, setPassword] = useState(null);
  const token = localStorage.getItem('tokenApi');

  function changeData(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      age,
      password
    };
    fetch('/user/edit', {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }})
        .then(res => res.json())
        .then(data => console.log(data))
  }

  return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" exact to="/">Главная</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <form className={'edit-form'} onSubmit={changeData}>
            <h5>Информация пользователя</h5>
            <input type='text' onChange={e=>setName(e.target.value)} placeholder='Name'/>
            <input type='email' onChange={e=>setEmail(e.target.value)} placeholder='Email' />
            <input type='number' onChange={e=>setAge(e.target.value)} placeholder='Age'/>
            <input type='password' onChange={e=>setPassword(e.target.value)} placeholder='Password'/>
            <input className={'btn btn-primary'} type='submit' value='Сохранить'/>
          </form>
          <hr />
          <p>Выберите фото профиля</p>
          <Avatar/>
        </div>
      </>
  )
};
