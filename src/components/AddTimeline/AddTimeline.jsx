import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';

function AddTimeline() {

    const dispatch = useDispatch();
    const history = useHistory();
    let [newTimeline, setNewTimeline] = useState({title: '', date: Dayjs})

    const handleTitleChange = (e) => {
        setNewTimeline({...newTimeline, title: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Button clicked', newTimeline)
        dispatch({type: 'ADD_TIMELINE', payload: newTimeline})
        setNewTimeline({title: '', date: Dayjs});
        history.push('/timelines');
    }


    return (
        <>
        <form onSubmit={handleSubmit}>
            <TextField type='text' value={newTimeline.title} label="Timeline Name" onChange={handleTitleChange}/>
            <br/>
            <Button type='submit' variant="contained">Create Timeline</Button>
        </form>
        </>
    )
}

export default AddTimeline;