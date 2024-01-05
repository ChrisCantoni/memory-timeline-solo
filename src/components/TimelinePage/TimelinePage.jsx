import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TimelineItem from '../TimelineItem/TimelineItem.jsx';
import {useDispatch, useSelector} from 'react-redux';

function TimelinePage() {

    const dispatch = useDispatch();
    const timelinesList = useSelector(store => store.timelines)
    

    const getTimelines = () => {
        dispatch({type: 'FETCH_TIMELINES'})
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
                return <li><TimelineItem key={item.id} item={item}/></li>
            })}
        </ul>
        <button>Add a new Timeline</button>
        </>
    )
}


export default TimelinePage;