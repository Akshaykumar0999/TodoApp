import { useEffect, useState } from 'react'
import './index.css'
const Timer = ({intialHours, intialMinutes}) => {
    const initialSeconds = intialHours * 3600 + intialMinutes * 60 + 0
    const [time, setTime] = useState(initialSeconds)
    
    useEffect(() => {
        if (time <= 0) return alert('⌛ Time Up 🙇‍♂️');

        const timerId = setInterval(() => {
            setTime((prevTime) => prevTime -1)
        }, 1000)
        return () => clearInterval(timerId);
    }, [time])

    const getTimer = (sec) => {
        const hours = Math.floor(sec/3600);
        const minutes =  Math.floor((sec % 3600)/60);
        const seconds = sec % 60
        return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
    }
    return(
        <div>
            {getTimer(time)}
        </div>
    )
}

export default Timer