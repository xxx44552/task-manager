import React from 'react';
import io from 'socket.io-client';
let socket = io('http://localhost:5000');

export default class Chat extends React.Component {

  constructor() {
    super();

    this.state = {
      listMess: [],
      mess: '',
      countClient: null,
      connectNewUSerText: null,
      chatColor: localStorage.getItem('messColor') || '#414042'
    }
  }

  sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMess', {mess: this.state.mess, name: this.props.user.name, color: this.state.chatColor});
    e.target.reset()
    localStorage.setItem('messColor', this.state.chatColor)
  };



  componentDidMount() {
    socket.on('clientCount', count => {
      this.setState({
        countClient: count
      })
    });

    socket.on('addMess', (msg) => {
      this.setState({
        listMess: this.state.listMess.concat(msg)
      })
    });

    socket.on('user connected', text => {
      this.setState({
        connectNewUSerText: text
      });
      setTimeout(()=>this.setState({connectNewUSerText: null}), 1500);
    });
  }


  render() {

    const {listMess, connectNewUSerText, countClient, chatColor} = this.state;

    return (
        <>
          <h2>Chat</h2>
          <h5>Колличесвто подключенных пользователей {countClient}</h5>
          {connectNewUSerText?<div>{connectNewUSerText}</div>:null}
          <div>
            {
              listMess.map((el, i) => {
                console.log(el)
                return <p key={i}><b style={{color: el.color}}>{el.name} - </b>{el.mess}</p>
              })
            }
          </div>
          <form onSubmit={this.sendMessage}>
            <textarea onChange={e=>this.setState({mess: e.target.value})}></textarea>
            <input type='color' defaultValue={chatColor} onChange={e=> {
              this.setState({chatColor: e.target.value})
            }}/>
            <button>Отправить</button>
          </form>
        </>
    )
  }
}

