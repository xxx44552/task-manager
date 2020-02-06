import React, {useState} from 'react';
import Avatar from "./Avatar";

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
        <form onSubmit={changeData}>
          <h3>Edit user information</h3>
          <input type='text' onChange={e=>setName(e.target.value)} placeholder='Name'/>
          <input type='email' onChange={e=>setEmail(e.target.value)} placeholder='Email' />
          <input type='number' onChange={e=>setAge(e.target.value)} placeholder='Age'/>
          <input type='password' onChange={e=>setPassword(e.target.value)} placeholder='Password'/>
          <input type='submit' value='Change'/>
        </form>
        <p>Change user avatar</p>
        <Avatar/>
      </>
  )
};
