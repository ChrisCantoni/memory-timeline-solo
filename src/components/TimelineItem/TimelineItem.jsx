import moment from 'moment';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button'

function TimelineItem(props) {

    const dispatch = useDispatch();

    const handleDeleteTimeline = (id) => {
        axios.delete(`api/timeline/${id}`)
        .then((response) => {
            console.log('Delete success')
            dispatch({type: 'FETCH_TIMELINES'})
        }).catch((err) => {
            console.error('Delete problem', err)
            alert('Something went wrong');
        })
    }

    // TODO: Make the visibility icon a button for visibility

    return (
    
        <>
        {props.item.title} created on: {moment(props.item.date_created).format('llll')} 
        {props.item.visible = 'true' ? <VisibilityIcon/> : ''}
        <Button variant="contained" onClick={() => handleDeleteTimeline(props.item.id)}>Delete Timeline</Button>
        </>
    )
}

export default TimelineItem;