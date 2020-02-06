import React, {useState} from 'react';

export default function Restore() {

  const [email, setEmail] = useState(null);

  function res(e) {
    e.preventDefault()
    const data = {email}
    fetch('/restore', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }}).then(()=>console.log(JSON.stringify(data)))
  }

  return (
      <form onSubmit={res}>
        <h3>Восстановление пароля</h3>
        <input type='email' name='email' onChange={e=>setEmail(e.target.value)} placeholder='Почта'/>
        <input type='submit' value='Отправить'/>
      </form>
  );
}
