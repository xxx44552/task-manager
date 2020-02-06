import React, {useState} from 'react';

export default function Avatar() {

  const [file, setFile] = useState(null);
  const token = localStorage.getItem('tokenApi');

  function img(e) {
    const data = new FormData();
    data.append('avatar', file);
    e.preventDefault()
    console.log(file)
    fetch('/upload', {
      method: 'post',
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(file => console.log(file))
  }

  return (
    <>
      <form onSubmit={img}>
        <input type='file' onChange={e=>setFile(e.target.files[0])}/>
        <input type='submit' value='Save'/>
      </form>

    </>
  )
};
