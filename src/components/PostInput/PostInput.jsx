import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';

function PostInput() {

    const dispatch = useDispatch();

    let currentDate = new Date();
    let newTime = currentDate.toISOString().slice(0, 16);
    let [newPost, setNewPost] = useState({title: '', description: '', date: newTime})

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type: 'ADD_POST', payload: newPost});
        setNewPost({title: '', description: '', date: newTime})
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text' value={newPost.title} onChange={handleTitleChange}/>
                <input type='text' value={newPost.description} onChange={handleDescChange}/>
                <input type='datetime-local' value={newTime} onChange={handleDateChange}/>
                {/* Dropdown with timelines to select one */}
                <button>Submit new post</button>
            </form>

            <p>{JSON.stringify(newPost)}</p>
        </>

    )

}

export default PostInput;