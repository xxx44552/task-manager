import React, {useState, useEffect} from 'react';

export default function CreateTask(props) {

  const [title, setTitle] = useState(null);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('tokenApi');
  const step = 5;
  let skip = step;

  const completedTask = {textDecorationLine: 'line-through'};

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
  }, [])

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
        setTasks(tasks.filter(el=>el._id !== id))
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
    }).then((res)=>console.log(res))
  }

  function showMoreTask() {

  }
  
  return (

      <>
        <hr />
          <form onSubmit={e=>task(e)}>
          <textarea onChange={e=>setTitle(e.target.value)}></textarea>
          <input type='submit' value='Отправить'/>
        </form>
        <hr />
        {

          tasks.map(({title, status, _id}) => {
            return <div key={_id} className='task'>
              <div>
                <span className='title' style={status?completedTask:null}>{title}</span><span> ||| status: <input data-id={_id} type='checkbox' onChange={setChecked} defaultChecked={status}/></span>
                <button data-id={_id} onClick={e=>del(e)}>del</button>
              </div>
            </div>
          })
        }
        <button>Показать еще</button>
      </>
  );
}
