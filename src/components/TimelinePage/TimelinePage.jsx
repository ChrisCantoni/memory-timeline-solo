import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TimelineItem from '../TimelineItem/TimelineItem.jsx';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function TimelinePage() {

    const dispatch = useDispatch();
    const timelinesList = useSelector(store => store.timelines)
    

    const getTimelines = () => {
        dispatch({type: 'FETCH_TIMELINES'})
    }

    // TODO: Turn this into a Saga:
    

    useEffect(() => {
        getTimelines();
    }, []);

    

    return (
        <>
        <h1>This is the Timelines page</h1>
        <table className='timelinesTable'>
            <thead>
                <tr>
                    <th>Timeline Name</th>
                    <th>Date Created</th>
                    <th>Visible</th>
                    <th><DeleteForeverIcon/></th>
                </tr>
            </thead> 
            <tbody>
                {timelinesList.map((item) => {
                    return <TimelineItem key={item.id} item={item}/>
                })}
            </tbody>
        </table> 
        <Link to={'/addtimeline'}><Button variant='contained' sx={{ backgroundColor: '#09074B', ":hover": {backgroundColor: 'secondary'}}}>Add a new Timeline</Button></Link>
        </>
    )
}


export default TimelinePage;