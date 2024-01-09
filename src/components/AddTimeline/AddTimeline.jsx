import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';

function AddTimeline() {

    const dispatch = useDispatch();
    const history = useHistory();
    let currentDate = new Date();
    let newTime = currentDate.toISOString().slice(0, 16);
    let [newTimeline, setNewTimeline] = useState({title: '', date: newTime})

    const handleTitleChange = (e) => {
        setNewTimeline({...newTimeline, title: e.target.value})
    };

    const handleDateChange = (e) => {
        setNewTimeline({...newTimeline, date: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Button clicked', newTimeline)
        dispatch({type: 'ADD_TIMELINE', payload: newTimeline})
        setNewTimeline({title: '', date: newTime});
        history.push('/timelines');
    }


    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Timeline Name:</label>
            <input type='text' value={newTimeline.title} onChange={handleTitleChange}/>
            <input type="datetime-local" value={newTime} onChange={handleDateChange}/>
            <Button type='submit' variant="contained">Create Timeline</Button>
        </form>
        </>
    )
}

export default AddTimeline;