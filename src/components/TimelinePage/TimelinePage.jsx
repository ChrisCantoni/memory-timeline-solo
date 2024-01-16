import React, {useState, useEffect} from 'react';
import TimelineItem from '../TimelineItem/TimelineItem.jsx';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from '@mui/material/TextField';

function TimelinePage() {

    const dispatch = useDispatch();
    const timelinesList = useSelector(store => store.timelines)
    let [newTimeline, setNewTimeline] = useState({title: ''})
    const [addTimelineToggle, setAddTimelineToggle] = useState(false);

    const getTimelines = () => {
        dispatch({type: 'FETCH_TIMELINES'})
    }

    // TODO: Turn this into a Saga:
    

    useEffect(() => {
        getTimelines();
    }, []);

    const handleTitleChange = (e) => {
        setNewTimeline({...newTimeline, title: e.target.value})
    };

    const handleCancel = () => {
        setAddTimelineToggle(!addTimelineToggle);
        setNewTimeline({title: ''});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Button clicked', newTimeline)
        dispatch({type: 'ADD_TIMELINE', payload: newTimeline})
        setNewTimeline({title: ''});
        setAddTimelineToggle(!addTimelineToggle);
    }
    

    return (
    <div className='container'>
        <div class="star-layers">
            <div class="star-layer" id="stars"></div>
            <div class="star-layer" id="stars2"></div>
            <div class="star-layer" id="stars3"></div>
        </div>
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
        <div className="addTimelineBtn">
        <Button variant='contained' color="secondary" onClick={() => setAddTimelineToggle(!addTimelineToggle)}>Add a new Timeline</Button>
        {addTimelineToggle ? 
        <>
          <form onSubmit={handleSubmit}>
            <TextField type='text' value={newTimeline.title} label="Timeline Name" onChange={handleTitleChange}/>
            <br/>
            <Button variant="contained" onClick={handleCancel}>Cancel</Button>
            <Button type='submit' variant="contained">Create Timeline</Button>
          </form> 
        </>: ''}
    </div>
    </div>
    )
}


export default TimelinePage;