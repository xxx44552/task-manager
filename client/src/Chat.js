import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
let socket = io('http://localhost:5000');

export default function Chat(props) {

  const [listMess, setListMess] = useState([]);
  const [mess, setMess] = useState('');
  const [countClient, setCountClient] = useState();
  const [connectNewUSerText, setConnectNewUSerText] = useState(null);
  const [chatColor, setChatColor] = useState('#414042');
  let arr = []

  function sendMessage(e) {
    e.preventDefault();
    socket.emit('sendMess', {mess, name: props.user.name, color: chatColor});
    setMess('');
    e.target.reset()
  };

  useEffect(() => {
    socket.on('clientCount', count => {
      setCountClient(count);
    });

    socket.on('addMess', (msg) => {
      const {name} = msg;
      console.log(name)
      console.log(msg, '-0-')
      setListMess('999');
      arr.push(msg)
      console.log(listMess, '/*/*/*')
    });

    socket.on('user connected', text => {
      setConnectNewUSerText(text);
      setTimeout(()=>setConnectNewUSerText(null), 1500);
    });
  }, []);

  console.log(typeof listMess, listMess,'|||')
  console.log(arr, '1arr22')

  return (
    <>
      <h2>Chat</h2>
      <h5>Колличесвто подключенных пользователей {countClient}</h5>
      {connectNewUSerText?<div>{connectNewUSerText}</div>:null}
      <div>
        {
          console.log(listMess, '666')
           //listMess.map(({name, mess, color}, i) => <p key={i}><b style={{color: color}}>{name} - </b>{mess}</p>)
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

