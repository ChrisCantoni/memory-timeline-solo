import moment from 'moment';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button'
import '../TimelinePage/TimelinePage.css';
import Swal from 'sweetalert2';


function TimelineItem(props) {

    const dispatch = useDispatch();

    const handleVisible = (id) => {
        console.log('You clicked the eye!')
        dispatch({type: 'SET_VISIBLE', payload: id })
    }
    const handleDeleteTimeline = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "All posts on this timeline will also be deleted",
            icon: "warning",
            iconColor: '#09074B',
            showCancelButton: true,
            confirmButtonColor: "#09074B",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              dispatch({type: 'DELETE_TIMELINE', payload: id});
            }
            });
        
    }
    

    // TODO: Set timelines up as a table

    return (
    
        <>
        <tr>
        <td>{props.item.title}</td> 
        <td>{moment(props.item.date_created).format('LL')}</td>
        <td><Button className="visibleBtn" variant="contained" onClick={() => handleVisible(props.item.id)}>{props.item.visible ? 
        <VisibilityIcon sx={{color: '#01CBAE'}}/> : '' }</Button></td>
        <td><Button variant="contained" sx={{ backgroundColor: '#09074B', ":hover": {backgroundColor: 'secondary'}}} color="secondary" onClick={() => handleDeleteTimeline(props.item.id)}>Delete Timeline</Button></td>
        </tr>
        </>
    )
}

export default TimelineItem;