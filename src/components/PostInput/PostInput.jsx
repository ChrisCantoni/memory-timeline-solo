import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function PostInput() {

    const history = useHistory();
    const dispatch = useDispatch();
    const timelineList = useSelector(store => store.timelines)

    let currentDate = new Date();
    let newTime = currentDate.toISOString().slice(0, 16);
    let [newPost, setNewPost] = useState({title: '', description: '', notes: '', date: newTime, timeline: 1})

    const getTimelines = () => {
        dispatch({type: 'FETCH_TIMELINES'})
    }

    useEffect(() => {
        getTimelines();
    }, []);

    const onFileChange = async (event) => {
        // Access the selected file
        const fileToUpload = event.target.files[0];
    
        // Limit to specific file types.
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    
        // Check if the file is one of the allowed types.
        if (acceptedImageTypes.includes(fileToUpload.type)) {
          const formData = new FormData();
          formData.append('file', fileToUpload);
          formData.append('upload_preset', process.env.REACT_APP_PRESET);
          let postUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
          axios.post(postUrl, formData).then(response => {
            console.log('Success!', response);
            setNewPost({...newPost, description: response.data.url});
          }).catch(error => {
            console.log('error', error);
            alert('Something went wrong');
          })
        } else {
          alert('Please select an image');
        }
      }

    const handleTitleChange = (e) => {
        setNewPost({...newPost, title: e.target.value})
    }

    const handleDescChange = (e) => {
        if (!newPost.description.includes('http')) {
            console.log('we are in description')
            setNewPost({...newPost, description: e.target.value})
        } else {
            console.log('we are in notes')
            setNewPost({...newPost, notes: e.target.value})
        }
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
        setNewPost({title: '', description: '', notes: '', date: newTime, timeline: 1})
        history.push('/user');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text' value={newPost.title} onChange={handleTitleChange}/>
                <label>Photo upload:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    />
                <label>Description:</label>
                <input type='text' value={newPost.description.includes('http') ? newPost.notes : newPost.description} onChange={handleDescChange}/>
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