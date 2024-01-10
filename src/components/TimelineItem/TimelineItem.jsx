import moment from 'moment';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button'
import '../TimelinePage/TimelinePage.css';


function TimelineItem(props) {

    const dispatch = useDispatch();

    const handleVisible = (id) => {
        console.log('You clicked the eye!')
        dispatch({type: 'SET_VISIBLE', payload: id })
    }
    

    // TODO: Set timelines up as a table

    return (
    
        <>
        {props.item.visible}
        {props.item.title} created on: {moment(props.item.date_created).format('llll')}
        <Button className="visibleBtn" variant="contained" onClick={() => handleVisible(props.item.id)}>{props.item.visible ? 
        <VisibilityIcon sx={{color: '#01CBAE'}}/> : '' }</Button>
        </>
    )
}

export default TimelineItem;