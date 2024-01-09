import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useHistory} from 'react-router-dom';

function PostInput() {

    const history = useHistory();
    const dispatch = useDispatch();
    const timelineList = useSelector(store => store.timelines)

    let currentDate = new Date();
    let newTime = currentDate.toISOString().slice(0, 16);
    let [newPost, setNewPost] = useState({title: '', description: '', date: newTime, timeline: 1})

    const getTimelines = () => {
        dispatch({type: 'FETCH_TIMELINES'})
    }

    useEffect(() => {
        getTimelines();
    }, []);

    const handleTitleChange = (e) => {
        setNewPost({...newPost, title: e.target.value})
    }

    const handleDescChange = (e) => {
        setNewPost({...newPost, description: e.target.value})
    }

    const handleDateChange = (e) => {
        // setNewPost({...newPost, date: currentDate})
        setNewPost({...newPost, date: e.target.value})
    }

    const handleTimelineSelect = (e) => {
        console.log(e.target.value);
        setNewPost({...newPost, timeline: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newPost)
        dispatch({type: 'ADD_POST', payload: newPost});
        setNewPost({title: '', description: '', date: newTime, timeline: 1})
        history.push('/user');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text' value={newPost.title} onChange={handleTitleChange}/>
                <label>URL/Text:</label>
                <input type='text' value={newPost.description} onChange={handleDescChange}/>
                <label>Date:</label>
                <input type='datetime-local' value={newTime} onChange={handleDateChange}/>
                {/* Dropdown with timelines to select one */}
                <label>Choose a timeline:</label>
                <select name='timelines' value={newPost.timeline} onChange={handleTimelineSelect}>
                    <option value="none" defaultValue disabled hidden>Select a Timeline</option>
                    {timelineList.map((item, i) => (
                        <option key={i} value={item.id}>{item.id}. {item.title}</option>))}
                </select>
                <button>Submit new post</button>
            </form>
        </>

    )

}

export default PostInput;