import './index.css'
import AnimatedGif from '../AnimatedGif'
const DayTab = ({deatils, updatedActiveTab, isActive}) => {
    const {name, id, emoji} = deatils
    const onClickTab = () => {
        updatedActiveTab(id)
    }
    const activeclass = isActive ? 'active-class' : ''
    return(
        <li className={`day-tab ${activeclass}`} onClick={onClickTab}>
            <AnimatedGif src={emoji} alt='Time' />
            <p className='name-text'>{name}</p>
        </li>
    )
}

export default DayTab