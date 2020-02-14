import React, {useState, useEffect} from 'react';

export default function TaskManager(props) {

  const [title, setTitle] = useState(null);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('tokenApi');
  const [step, setStep] = useState(5);
  const [skip, setSkip] = useState(step);
  const [hideShowMoreBtn, setHideShowMoreBtn] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [minText, setMinText] = useState(true);

  const style = {
    color: "green"
  };

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
    console.log(minText)
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
    console.log(hideCompleted)
    fetch(`/tasks?completed=${hideCompleted}&skip=${skip}&limit=${step}`, {
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
    console.log(Boolean(status))
    if(status) {

      setSkip(5);
      setHideCompleted(true);
      setHideShowMoreBtn(false);
      fetch(`/tasks?completed=${Boolean(status)}&limit=${step}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res=>res.json()).then(data=>{
        setTasks(data);
        console.log(data);
      });
    }else {
      setSkip(5);
      setHideCompleted(false);
      setHideShowMoreBtn(false);
      fetch(`/tasks?completed=${Boolean(status)}&limit=${step}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res=>res.json()).then(data=>{
        setTasks(data)
        console.log(data);
      });
    }
  }

  return (
      <>
        <div className={'col-md-8 main'}>
          <div>
            <form onSubmit={e=>task(e)}>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Добавить новое задание</label>
                <span className={'min-text'} style={!minText?style:null}>Миннимум 10 символов</span>
                <textarea onChange={e=>{
                  e.target.value.length < 10 ? setMinText(true) : setMinText(false);
                  setTitle(e.target.value)
                }} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <input type='submit' className={'btn btn-primary'} value='Отправить'/>
            </form>
            <hr />
            <div>
              <select className={"form-control"} onChange={hideCompletedTasks}>
                <option defaultValue value='0'>Все</option>
                <option value='1'>Показать выполненные</option>
              </select>
            </div>
            <hr />
          </div>
          <div className="tasks-wrap">
            {
              tasks.length !== 0 ? tasks.map(({title, status, _id}, i) => {
                return <div key={_id} className={'list-group task'}>
                  <p className={status ? "list-group-item list-group-item-success item" : "list-group-item"}>{title}</p>
                  <div className="btns-wrap">
                    <div className="custom-control custom-switch">
                      <input data-id={_id} type='checkbox' onChange={setChecked} defaultChecked={status} className="custom-control-input" id={`customSwitch${i}`} />
                      <label className="custom-control-label" htmlFor={`customSwitch${i}`}></label>
                    </div>
                    <button className={'badge badge-danger'} data-id={_id} onClick={e=>del(e)}>Удалить</button>
                  </div>
                </div>
              }) : <h5>Нету еще тасков</h5>
            }
          </div>
          {!hideShowMoreBtn ? <button className={'btn btn-success'} onClick={showMoreTask}>Показать еще</button> : null}
        </div>
      </>
  );
}
