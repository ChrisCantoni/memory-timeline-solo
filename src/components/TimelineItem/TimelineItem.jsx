import moment from 'moment';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
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
    };

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: 'white',
            '& + .MuiSwitch-track': {
              backgroundColor: 'secondary',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: 'tertiary',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: 'white',
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: 'primary',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
      }));
      

    // TODO: Set timelines up as a table

    return (
    
        <>
        <tr>
        <td>{props.item.title}</td> 
        <td>{moment(props.item.date_created).format('LL')}</td>
        <td><IOSSwitch sx={{ m: 1}} color='tertiary' checked={props.item.visible} onChange={() => handleVisible(props.item.id)}/></td>
        <td><Button variant="contained" sx={{ backgroundColor: '#09074B', ":hover": {backgroundColor: 'secondary'}}} color="secondary" onClick={() => handleDeleteTimeline(props.item.id)}>Delete Timeline</Button></td>
        </tr>
        </>
    )
}

export default TimelineItem;