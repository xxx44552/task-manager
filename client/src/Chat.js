import React, {useState} from 'react';
import io from 'socket.io-client';
let socket = io('http://localhost:5000');

export default function Chat(props) {

  const [listMess, setListMess] = useState([]);
  const [mess, setMess] = useState('');
  const [countClient, setCountClient] = useState();
  const [connectNewUSerText, setConnectNewUSerText] = useState(null);
  const [chatColor, setChatColor] = useState('#414042');

  function sendMessage(e) {
    e.preventDefault();
    socket.emit('sendMess', {mess, name: props.user.name, color: chatColor});
    console.log(1)
    setMess('');
    e.target.reset()
  };

  socket.on('clientCount', count => {
    setCountClient(count)
    console.log(2)
  });

  socket.on('addMess', ({msg}) => {
    setListMess(listMess.concat(msg))

    console.log(3)
  });

  socket.on('user connected', text => {
    setConnectNewUSerText(text);
    setTimeout(()=>setConnectNewUSerText(null), 1500);
    console.log(4)
  });

  return (
    <>
      <h2>Chat</h2>
      <h5>Колличесвто подключенных пользователей {countClient}</h5>
      {connectNewUSerText?<div>{connectNewUSerText}</div>:null}
      <div>
        {
           listMess.map(({name, mess, color}, i) => <p key={i}><b style={{color: color}}>{name} - </b>{mess}</p>)
        }
      </div>
      <form onSubmit={sendMessage}>
        <textarea onChange={e=>setMess(e.target.value)}></textarea>
        <input type='color' defaultValue={chatColor} onChange={e=> {
          setChatColor(e.target.value)
        }}/>
        <button>Отправить</button>
      </form>
    </>
  )
}

