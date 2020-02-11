import React, {useState, useEffect} from 'react';

export default function TaskManager(props) {

  const [title, setTitle] = useState(null);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('tokenApi');
  const [step, setStep] = useState(5);
  const [skip, setSkip] = useState(step);
  const [hideShowMoreBtn, setHideShowMoreBtn] = useState(false);

  const completedTask = {textDecorationLine: 'line-through'};
  const hide = {display: 'none'};


  useEffect(()=> {
    fetch('/api', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then( res => res.json()).then(data => {
      setTasks(data.tasks)
    })
  }, []);

  function task(e) {

    e.preventDefault();
    fetch('/task', {
      method: 'post',
      body: JSON.stringify({title}),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
        .then(res => res.json())
        .then(task => {
          console.log(task)
          setTasks(tasks.concat(task))
        })

  }

  function del(e) {
    const id = e.target.dataset.id;
    fetch('/del/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(() => {
        setTasks(tasks.filter(el=>el._id !== id));
        console.log(id)
      })
  };

  function setChecked(e) {
    const value = e.target.checked;
    const id = e.target.dataset.id;
    fetch(`/task/${id}/?completed=${value}`, {
      method: 'post',
      body: JSON.stringify({completed: value}),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(()=>{
      if(value) {
        setTasks(tasks.map(el=>{
          if(el._id === id) {
            el.status = true
          }
          return el
        }))
      }else {
        setTasks(tasks.map(el=>{
          if(el._id === id) {
            el.status = false
          }
          return el
        }))
      }
    })
  }

  function showMoreTask() {
    fetch(`/tasks?skip=${skip}&limit=${step}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res)=> {
      setSkip(skip + step);
      return res.json();
    }).then(data=>{
      setTasks(tasks.concat(data));
      console.log(data)
      if(data.length < 5) setHideShowMoreBtn(true);
    })
  }

  function hideCompletedTasks(e) {
    const status = Number(e.target.value);
    tasks.map(el => console.log(el))
  }
  
  return (

      <>
        <hr />
          <form onSubmit={e=>task(e)}>
          <textarea onChange={e=>setTitle(e.target.value)}></textarea>
          <input type='submit' value='Отправить'/>
        </form>
        <hr />
        <div>
          <select onChange={hideCompletedTasks}>
            <option value='0'>Показать выполненные</option>
            <option value='1'>Скрыть выполненные</option>
          </select>
        </div>
        <hr />
        {
          tasks.map(({title, status, _id}) => {
            return <div key={_id} style={status ? completedTask : null} className='task'>
              <span className='title'>{title}</span><span> ||| status: <input data-id={_id} type='checkbox' onChange={setChecked} defaultChecked={status}/></span>
              <button data-id={_id} onClick={e=>del(e)}>del</button>
            </div>
          })
        }
        {!hideShowMoreBtn ? <button onClick={showMoreTask}>Показать еще</button> : null}
      </>
  );
}
