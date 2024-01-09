import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TimelineItem from '../TimelineItem/TimelineItem.jsx';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

function TimelinePage() {

    const dispatch = useDispatch();
    const timelinesList = useSelector(store => store.timelines)
    

    const getTimelines = () => {
        dispatch({type: 'FETCH_TIMELINES'})
    }

    // TODO: Turn this into a Saga:
    const handleDeleteTimeline = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
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

    useEffect(() => {
        getTimelines();
    }, []);

    

    return (
        <>
        <h1>This is the Timelines page</h1>
        {JSON.stringify(timelinesList)}
        <ul>   
            {timelinesList.map((item) => {
                return <li><TimelineItem key={item.id} item={item}/> <Button variant="contained" onClick={() => handleDeleteTimeline(item.id)}>Delete Timeline</Button></li>
            })}
        </ul>
        <Link to={'/addtimeline'}><Button variant='contained'>Add a new Timeline</Button></Link>
        </>
    )
}


export default TimelinePage;