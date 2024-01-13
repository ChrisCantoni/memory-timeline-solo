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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import './PostInput.css';

function PostInput() {

    const history = useHistory();
    const dispatch = useDispatch();
    const timelineList = useSelector(store => store.timelines)

    // let newTime = currentDate.toISOString().slice(0, 16);
    // const [newDate, setNewDate] = useState(null);
    
    let [newPost, setNewPost] = useState({title: '', description: '', notes: '', date: '', timeline: 1})
    

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

    const handleDateChange = (e) => {
        console.log(e);
        setNewPost({...newPost, date: e.$d});
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
        // setNewPost({...newPost, date: newDate.$d})
        console.log(newPost)
        dispatch({type: 'ADD_POST', payload: newPost});
        setNewPost({title: '', description: '', date: '', notes: '', timeline: 1})
        history.push('/user');
    }

    return (
        <div className='newPost'>
            <Card sx={{margin: 'auto', backgroundColor: '#3D007A', maxWidth: 800}}>
                <CardContent sx={{backgroundColor: '#3D007A', margin: 'auto'}}>
            <form onSubmit={handleSubmit}>
                <Card sx={{margin: '10px auto', padding: '10px', maxWidth: 400, backgroundColor: '#8075FF'}}>
                    <Typography backgroundColor='#8075FF' color="#04E2B7" gutterBottom variant="h5">Title:</Typography>
                    <TextField type='text' minWidth='400' name="title" value={newPost.title} onChange={handleChange}/>
                </Card>
                <Card sx={{margin: '10px auto', maxWidth: 420, backgroundColor: '#8075FF'}}>
                    <Typography padding="10px" color="#04E2B7" gutterBottom variant="h5">Photo upload:</Typography>
                    <input
                        style={{padding: '10px'}}
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        />
                </Card>
                <Card sx={{border: '2px solid #8075FF', margin: '10px auto', padding: '10px', maxWidth: 400, backgroundColor: 'white'}}>
                    <Typography color="#04E2B7" gutterBottom variant="h5">Description:</Typography>
                    <TextField type='text' name="description" sx={{minWidth: '400'}}
                    value={newPost.description.includes('http') ? newPost.notes : newPost.description} onChange={handleDescChange}/>
                </Card>
                <Card sx={{margin: '10px auto', padding: '10px', maxWidth: 400, backgroundColor: '#8075FF'}}>
                    <Typography color="#04E2B7" gutterBottom variant="h5">Date:</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker name="date" value={newPost.date} onChange={handleDateChange} backgroundColor="white" />
                    </LocalizationProvider>
                </Card>
                {/* Dropdown with timelines to select one */}
                <Card sx={{margin: '10px auto', padding: '10px', maxWidth: 400, backgroundColor: '#8075FF'}}>
                    <InputLabel id="select-timeline-dropdown">Select a timeline:</InputLabel>
                    <Select  labelId="select-timeline-dropdown" label="Select a Timeline" name='timeline' value={newPost.timeline} onChange={handleChange}>
                        <MenuItem value="none" defaultValue disabled hidden>Select a Timeline</MenuItem>
                            {timelineList.map((item, i) => (
                        <MenuItem color="#04E2B7" key={i} value={item.id}>{i + 1}. {item.title}</MenuItem>))}
                    </Select>
                </Card>
                <br/>
                <CardActions>
                <Button sx={{margin: 'auto'}} type="submit" variant="contained" color="secondary">Submit new post</Button>
                </CardActions>
            </form>
            </CardContent>
            </Card>
        </div>

    )

}

export default PostInput;