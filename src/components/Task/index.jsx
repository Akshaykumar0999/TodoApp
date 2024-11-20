import React from "react";
import './index.css';
import AnimatedGif from "../AnimatedGif";
const Task = ({details, handleDelete ,handlescroll}) => {
    const onClickDelete = () => {
        handleDelete(details.id)
    }
    const onClickScroll = () => {
        handlescroll(details.id)
    }
    const {task, category, scrolled, subTasksList} = details
    return(
        <li className="task-item-card">
            <div className="task-item-first-card">
                <div className="task-text"><input type="checkbox" className="checkbox" /><p>{task}</p></div>
                <div className="action-card">
                    <button className="delete-button" onClick={onClickScroll}><AnimatedGif src='/scroll-down.gif' alt='Delete'  /></button>
                    <button className="delete-button" onClick={onClickDelete}><AnimatedGif src='/trash-bin.gif' alt='Delete'  /></button>
                </div>
            </div>
            {scrolled && 
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',}}>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}><AnimatedGif src='/time.gif' alt='Time' /><p className="estimated-time">Estimated Time: <span className="span-ele">{category}</span></p>
                    </div>
                    <ul className="subtasks-ul-card">
                        {
                           subTasksList.map(subTask => <li key={subTask} className="list-sub-task">👉  {subTask}</li>) 
                        }
                    </ul>
                </div>
            }
        </li>
    )
}

export default Task