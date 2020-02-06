import React, {useState} from 'react';

export default function Registration() {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [password, setPassword] = useState(null);

  function reg(e) {
    e.preventDefault();
    console.log(name, age, email, password)
    fetch('/registration', {
      method: 'post',
      body: JSON.stringify({userName: name, age, email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then( res => res.json())
        .then(token => localStorage.setItem('tokenApi', token.token))
        .catch(e=>console.log(e))
  }

  return (
      <form onSubmit={e=>reg(e)}>
        <input type='text' name='userName' onChange={e=>setName(e.target.value)} placeholder='Имя'/>
        <input type='email' name='email' onChange={e=>setEmail(e.target.value)} placeholder='Почта'/>
        <input type='number' name='age' onChange={e=>setAge(e.target.value)} placeholder='Возраст'/>
        <input type='password' name='password' onChange={e=>setPassword(e.target.value)} placeholder='Пароль'/>
        <input type='submit' value='Отправить'/>
      </form>
  );
}
