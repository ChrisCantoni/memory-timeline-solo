import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import './DetailsPage.css';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import moment from 'moment';
import './DetailsPage.css';

function DetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    let currentDate = new Date();

    const [toggleEditDetails, setToggleEditDetails]  = useState(false);
    const details = useSelector(store => store.details);
    const timelineList = useSelector(store => store.timelines);

    let [newDetails, setNewDetails] = useState({title: details.title, date: details.date, notes: details.notes, timeline: details.timeline });

    const [isImage, setIsImage] = useState(true);
    

    const refreshPage = () => {
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }

    const checkImage = () => {
        if (details.media_url == undefined) {
            return;
        } else if (details.media_url.indexOf('http') === -1) {
            setIsImage(false)
        } else {
            setIsImage(true);
        }
    };

    const editDetails = () => {
        console.log(newDetails);
        console.log(details);
        setToggleEditDetails(!toggleEditDetails);
        dispatch({type: 'FETCH_TIMELINES'})
        setNewDetails({
            id: id,
            title: details.title, 
            media_url: details.media_url,
            notes: details.notes, 
            date: details.date, 
            timeline: details.timeline
        });
    };

    const deletePost = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: '#09074B',
            showCancelButton: true,
            confirmButtonColor: "#09074B",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                iconColor: '#09074B'
              });
            dispatch({type: 'DELETE_POST', payload: id})
            history.push('/user');
            }
          });
        
    }

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
            setNewDetails({...newDetails, media_url: response.data.url});
          }).catch(error => {
            console.log('error', error);
            alert('Something went wrong');
          })
        } else {
          alert('Please select an image');
        }
      }

    const sendEdittoServer = () => {
        console.log('new details', newDetails)
        dispatch({ type: 'EDIT_DETAILS', payload: newDetails});
        setToggleEditDetails(false);
        setNewDetails({title: details.post_title, media_url: details.media_url, 
            date: details.date, timeline: details.timeline});
    }

    const handleTitleChange = (e) => {
        setNewDetails({...newDetails, title: e.target.value});
    }

    const handleDateChange = (e) => {
        console.log(e)
        setNewDetails({...newDetails, date: e.$d})
    }

    const handleNotesChange = (e) => {
        setNewDetails({...newDetails, notes: e.target.value});
    }
    const handleTimelineSelect = (e) => {
        console.log(e.target.value);
        setNewDetails({...newDetails, timeline: e.target.value});
    }

    useEffect(() => {
        refreshPage();
    }, [])
    useEffect(() => {
        checkImage();
    }, [details])

    return (
        <>
            <div className="postDetails" key={details.id}>
                <Card sx={{margin: 'auto', padding: '20px', backgroundColor: '#8075FF', maxWidth: 1000, display: 'flex', alignItems: 'center', flexDirection: 'Column'}}>
                <Typography color="#04E2B7" variant="h2">{toggleEditDetails === false ? 
                    <>{details.post_title}</> : 
                    <div className='editDetails'>Title: {details.post_title} <TextField type='text' name="title" sx={{backgroundColor: 'white', width: '100%'}} defaultValue={newDetails.title} onChange={handleTitleChange}/></div>
                }
                <br/></Typography>
                {details.media_url != undefined && !isImage ? <>{toggleEditDetails === false ? <p>{details.media_url}</p> : <div className='editDetails'><TextField type='text' sx={{width: 400}} value={newDetails.title} onChange={handleTitleChange}/></div>}</> : <img src={details.media_url} width={800}/>}
                {toggleEditDetails === true ? <div><label>Photo upload:</label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    />
                    </div> : 
                    <></>
                }
                <br/>
                
                    {toggleEditDetails === false? <Typography color="#04E2B7" variant="h4"><>{moment(details.date).format('LL')}</></Typography> :
                                        <Typography color="#04E2B7" variant="h4">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker sx={{margin: 'auto'}} slotProps={{
                                            textField: {
                                                size: "small",
                                                error: false,
                                            },
                                            }}name="date" defaultValue={dayjs(currentDate)} onChange={handleDateChange} backgroundColor="white" />
                                    </LocalizationProvider></Typography>}
                
                
                {toggleEditDetails === false ? 
                    <Typography color="#04E2B7" variant="body1"><>{details.notes}</></Typography> : <div className="editDetails">Notes: {details.notes}<br/><TextField type='text' sx={{backgroundColor: 'white', width: 500 }}  defaultValue={newDetails.notes} onChange={handleNotesChange}/></div>
                }
                <br/>
                <Typography color="#04E2B7" variant="h5">
                    <>{details.timeline_title}</>
                    {toggleEditDetails === true ? 
                        <div className="editDetails">
                            <InputLabel sx={{color: '#04E2B7'}} id="select-timeline-dropdown">Select a timeline:</InputLabel>
                    <Select sx={{marginLeft: '20%', width: 230, "& .MuiInputBase-root": {backgroundColor: '#8075FF'}}} labelId="select-timeline-dropdown" label="Select a Timeline" name='timeline' value={details.timeline} onChange={handleTimelineSelect}>
                        <MenuItem value={details.timeline} selected>Keep current timeline</MenuItem>
                            {timelineList.map((item, i) => (
                        <MenuItem backgroundcolor='white' key={i} value={item.id}>{i + 1}. {item.title}</MenuItem>))}
                    </Select>
                        </div> : <></>
                    }
                    </Typography>
                <div className="detailsButtons">
                    

                    {toggleEditDetails === false ?
                        <>
                            <Button variant='contained' color='secondary' sx={{margin: '10px'}} onClick={deletePost}>Delete Post</Button>
                            <Button variant='contained' color='secondary' sx={{margin: '10px'}} onClick={() => editDetails()}>Edit Details</Button>
                        </> : 
                        <div>
                            <Button variant='contained' color='secondary' sx={{margin: '10px'}}onClick={() => editDetails()}>Cancel</Button>
                            <Button variant='contained' color='secondary' sx={{margin: '10px'}}onClick={sendEdittoServer}>Save Changes</Button>
                        </div>
                    }
                </div>
                
                </Card>
            </div>
        </>
    )
}

export default DetailsPage;