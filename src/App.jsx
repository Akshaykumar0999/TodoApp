import React, {useEffect, useState} from 'react'
import './App.css'
import {v4 as uuid} from 'uuid'
import Task from './components/Task'
import DayTab from './components/DayTab'

const categoriesList = [
  {
    id: '1',
    name: '00:30 Hrs'
  },
  {
    id: '2',
    name: '01:00 Hrs'
  },
  {
    id: '3',
    name: '01:30 Hrs'
  },
  {
    id: '4',
    name: '02:00 Hrs'
  },
  {
    id: '5',
    name: '03:00 Hrs'
  },
]

const daysList = [
  {
    id: 'MONDAY',
    name: "Monday",
    emoji: '/monday.png'
  },
  {
    id: 'TUESDAY',
    name: "Tuesday",
    emoji: '/tuesday.png'
  },
  {
    id: 'WEDNESDAY',
    name: "Wednesday",
    emoji: '/wednesday.png'
  },
  {
    id: 'THURSDAY',
    name: "Thursday",
    emoji: '/thursday.png'
  },
  {
    id: 'FRIDAY',
    name: "Friday",
    emoji: '/friday.png'
  },
  {
    id: 'SATURDAY',
    name: "Saturday",
    emoji: '/saturday.png'
  },
  {
    id: 'SUNDAY',
    name: "Sunday",
    emoji: '/sunday.png'
  },
]

const getLocalStorae = () => {
  let data = localStorage.getItem('tasks');
  if (data) {
    return JSON.parse(localStorage.getItem('tasks'));
  }else {
    return []
  }
}

function App() {
  const [todosList, setTodosList] = useState(getLocalStorae())
  const [category, setCategory] = useState(categoriesList[0].name)
  const [actTab, setActTab] = useState(daysList[0].id)
  const [day, setDay] = useState(daysList[0].id)
  const [subTask, setSubTask] = useState('')
  const [subTasksList, setSubTasksList] = useState([])
  const [task, setTask] =useState('')   
  const [description, setdescription] =useState('')   
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  
  
  const onSubmitTask = (e) => {
    e.preventDefault()
    const newTask = {
      id: uuid(),
      task,
      category,
      scrolled: false,
      day,
      subTasksList: subTasksList,
      description
    }
    setTodosList([...todosList, newTask])
    setSubTask('')
    setTask('')
    setSubTasksList([])
  }
  
  const handleDelete = (id) => {
    const filteredTodoList = todosList.filter(todo => todo.id !== id)
    setTodosList(filteredTodoList)
  }

  const handlescroll = (id) => {
    setTodosList(todosList.map(todo => {
      if (todo.id === id) {
        return {...todo, scrolled: !todo.scrolled}
      }else{
        return todo
      }
    }))
  }
  const updatedActiveTab = (id) => {
    setActTab(id)
  }

  const onAddSubTask = () => {
    setSubTasksList([...subTasksList, subTask])
    setSubTask('')
  }

  useEffect(() => {
    window.localStorage.setItem('tasks', JSON.stringify(todosList))
  }, [todosList])

  const updatedFilteredlist = todosList.filter(each => each.day === actTab)
  
  return (
      <div className='App-container'>
        <div className='task-form-card'>
          <div className='time-date-card'>
            <p className='date-time-string'>📆 <span style={{color: '#fff'}}>{date}</span></p>
            {/* <p className='date-time-string'>⏲️ <span style={{color: '#fff', fontSize: '20px'}}>{time.toLocaleTimeString()}</span></p> */}
          </div>
          <div className='tasks-inputs-main-card'>
            <p className='text1'>Todos Tasks</p>
            <p className='text2'>Create Task Here</p>
            <form className='task-form' onSubmit={onSubmitTask} >
              <input className='input-cards' type='text' value={task} placeholder='Task Details' onChange={(e) => setTask(e.target.value)} />
              <select className='input-cards' onChange={(e) => setDay(e.target.value)} >
                <option value='MONDAY'>Monday</option>
                <option value='TUESDAY'>Tuesday</option>
                <option value='WEDNESDAY'>Wednesday</option>
                <option value='THURSDAY'>Thursday</option>
                <option value='FRIDAY'>Friday</option>
                <option value='SATURDAY'>Saturday</option>
                <option value='SUNDAY'>Sunday</option>
              </select>
              <select className='input-cards' value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categoriesList.map(eachCat => <option key={eachCat.id} value={eachCat.name} >{eachCat.name}</option>)}
              </select>
              <div className='subtask-input-card'>
                <input className='input-sub-cards' type='text' value={subTask} placeholder='Sub Tasks Details' onChange={(e) => setSubTask(e.target.value)} />
                <button type='button' className='subtask-add-button' onClick={onAddSubTask}>Add</button>
              </div>
              <textarea className='textarea-cards' style={{paddingTop: '10px'}} value={description}  type='text' placeholder='Task Description (Optional)' onChange={(e) => setdescription(e.target.value)} />
              <button type='submit' className='add-button'><img src='/sticky-notes.png' className='add-img-styles' />Add Task</button>
            </form> 
          </div>
        </div>
        <div className='tasks-list-items-main-card'>
          <h3 className='text2-card'>List of Tasks u should complete by the EOD</h3>
          <ul className='days-ul-element'>
            {
              daysList.map((eachday) => <DayTab key={eachday.id} deatils={eachday} updatedActiveTab={updatedActiveTab} isActive={actTab === eachday.id} />)
            }
          </ul>
          <ul className='tasks-list-main-ul-card'>
            {
              updatedFilteredlist.map((eachTask) => (
                <Task key={eachTask.id} details={eachTask} handleDelete={handleDelete} handlescroll = {handlescroll} />
              ))
            }
          </ul>
        </div>
      </div>
  )
}

export default App


