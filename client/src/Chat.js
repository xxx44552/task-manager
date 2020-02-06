import React, {useState} from 'react';
import io from 'socket.io-client';
let socket = io('http://localhost:5000')

export default function Chat(props) {

  const [listMess, setListMess] = useState([]);
  const [mess, setMess] = useState('');
  const [countClient, setCountClient] = useState();

  function sendMessage(e) {
    e.preventDefault();
    socket.emit('sendMess', {mess, name: props.user.name});
    setMess('');
    e.target.reset()
  }

  socket.on('clientCount', count => {
    setCountClient(count)
  })

  socket.on('addMess', ({msg}) => {
    setListMess(listMess.concat(msg))
  });

  socket.on('user connected', name => {
    console.log(name)
  })


  return (
    <>
      <h2>Chat</h2>
      <h5>Колличесвто подключенных пользователей {countClient}</h5>
      <div>
        {
           listMess.map(({name, mess}, i) => <p key={i}><b>{name} - </b>{mess}</p>)
        }
      </div>
      <form onSubmit={sendMessage}>
        <textarea onChange={e=>setMess(e.target.value)}></textarea>
        <button>Отправить</button>
      </form>
    </>

  )
}

