import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

function PostInput() {

    const history = useHistory();
    const dispatch = useDispatch();
    const timelineList = useSelector(store => store.timelines)

    let currentDate = dayjs(Date());
    // let newTime = currentDate.toISOString().slice(0, 16);
    const [newDate, setNewDate] = useState(null);
    let [newPost, setNewPost] = useState({title: '', description: '', notes: '', date: newDate, timeline: 1})
    

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

    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.name]: e.target.value})
    }

    const handleDateChange = (e, date) => {
        console.log(e);
        setNewDate(date);
        // console.log(newPost.date);
    }

    const handleDescChange = (e) => {
        if (!newPost.description.includes('http')) {
            setNewPost({...newPost, description: e.target.value})
        } else {
            setNewPost({...newPost, notes: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newDate);
        console.log(newPost)
        // dispatch({type: 'ADD_POST', payload: newPost});
        // setNewPost({title: '', description: '', notes: '', timeline: 1})
        // history.push('/user');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text' name="title" value={newPost.title} onChange={handleChange}/>
                <label>Photo upload:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    />
                <label>Description:</label>
                <input type='text' name="description" value={newPost.description.includes('http') ? newPost.notes : newPost.description} onChange={handleDescChange}/>
                <label>Date:</label>
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker name="date" value={newDate} onChange={setNewDate} />
                    </LocalizationProvider>
                {/* Dropdown with timelines to select one */}
                <InputLabel id="select-timeline-dropdown">Select a timeline:</InputLabel>
                <Select labelId="select-timeline-dropdown" label="Select a Timeline" name='timeline' value={newPost.timeline} onChange={handleChange}>
                    {/* <MenuItem value="none" defaultValue disabled hidden>Select a Timeline</MenuItem> */}
                    {timelineList.map((item, i) => (
                        <MenuItem key={i} value={item.id}>{i + 1}. {item.title}</MenuItem>))}
                </Select>
                <Button type="submit" variant="contained" color="secondary">Submit new post</Button>
            </form>
        </>

    )

}

export default PostInput;