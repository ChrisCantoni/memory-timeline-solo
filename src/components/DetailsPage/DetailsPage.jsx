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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './DetailsPage.css';

function DetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    let currentDate = new Date();

    const [toggleEditDetails, setToggleEditDetails]  = useState(false);
    const [toggleEditing, setToggleEditing] = useState(false);
    const details = useSelector(store => store.details);
    const timelineList = useSelector(store => store.timelines);

    let [newDetails, setNewDetails] = useState({title: details.post_title, date: details.date, notes: details.notes, timeline: details.timeline_id });
    const [isImage, setIsImage] = useState(true);
    

    const refreshPage = () => {
        dispatch({type: 'FETCH_DETAILS', payload: id})
        dispatch({type: 'FETCH_TIMELINES'})
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
        setToggleEditing(!toggleEditing);
        dispatch({type: 'FETCH_TIMELINES'})
        setNewDetails({
            id: id,
            title: details.post_title, 
            media_url: details.media_url,
            notes: details.notes, 
            date: details.date, 
            timeline: details.timeline_id
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
        dispatch({ type: 'EDIT_DETAILS', payload: newDetails});
        setNewDetails({title: details.post_title, media_url: details.media_url, 
            date: details.date, timeline: details.timeline_id});
    }

    const handleTitleChange = (e) => {
        console.log(newDetails.title);
        console.log(details.post_title);
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
    }, [details]);

    useEffect(() => {
        checkImage();
    }, [timelineList])

    return (
        <>
            <div className="postDetails" key={details.id}>
                <Dialog open={toggleEditing}
                    sx={{
                    '& .MuiPaper-root': {
                      background: '#8075FF',
                      color: '#04E2B7',
                      filter: 'drop-shadow(0 0 0.5rem #E950C8)'
                    }
                    }}
                    onClose={() => setToggleEditing(!toggleEditing)}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            setToggleEditing(!toggleEditing);
                            sendEdittoServer();
                        },
                    }}>
                        {/* //! Right here is where we're working */}
                    <DialogTitle sx={{textAlign: 'center', fontSize: '36px', color: '#04E2B7'}}>Edit post</DialogTitle>
                    <DialogContent>

                        <TextField autoFocus
                            
                            margin="dense"
                            id="title"
                            name="title"
                            fullWidth
                            variant="standard"
                            defaultValue={details.post_title}
                            onChange={e => handleTitleChange(e)}
                            InputProps={{ inputProps: { style: { color: '#04E2B7'}}}}
                            style={{ padding: '1px', color: '#04E2B7' }} />
        
                        <TextField 
                            margin="dense"
                            id="notes"
                            name="notes"
                            fullWidth
                            variant="standard"
                            defaultValue={details.notes}
                            onChange={e => handleNotesChange(e)}
                            InputProps={{ inputProps: { style: { color: '#04E2B7'}}}}
                            style={{ padding: '1px', color: '#04E2B7' }} />
                        <Typography color="#04E2B7" variant="h4">
                        <InputLabel sx={{color: '#04E2B7'}} id="select-timeline-dropdown">Select a date:</InputLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker sx={{marginLeft: '65px', color: '#04E2B7'}} 
                                            slotProps={{
                                            textField: {
                                                size: "small",
                                                error: false,
                                            },
                                            }}name="date" defaultValue={dayjs(details.date)} onChange={handleDateChange} backgroundColor="white" />
                                    </LocalizationProvider></Typography>
                        <InputLabel sx={{color: '#04E2B7'}} id="select-timeline-dropdown">Select a timeline:</InputLabel>
                        <Select sx={{marginLeft: '20%', width: 230, "& .MuiInputBase-root": {backgroundColor: '#8075FF'}}} labelId="select-timeline-dropdown" 
                                label="Select a Timeline" name='timeline' defaultValue={newDetails.timeline} onChange={handleTimelineSelect}>
                                    
                            <MenuItem value={details.timeline} >Keep current timeline</MenuItem>
                                {timelineList.map((item, i) => (
                            <MenuItem backgroundcolor='white' key={i} value={item.id}>{i + 1}. {item.title}</MenuItem>))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                <div className="first-row" style={{ width: '90%', marginBottom: '20px' }}>
                                    <Button variant="contained" style={{ width: '40%', backgroundColor: '#09074B', marginRight: '60px' }} onClick={() => setToggleEditing(!toggleEditing)}>Cancel</Button>
                                    <Button variant="contained" type="submit" style={{ width: '40%', color: '#DAA520', backgroundColor: '#3D007A' }}>Save</Button>
                                </div>
                            </div>
                    </DialogActions>
                </Dialog>
                <Card sx={{margin: 'auto', padding: '20px', backgroundColor: '#8075FF', maxWidth: 1000, display: 'flex', alignItems: 'center', flexDirection: 'Column'}}>
                <Typography color="#04E2B7" marginBottom="20px" variant="h2">{toggleEditDetails === false ? 
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
                    <Typography color="#04E2B7" variant="body1"><><u>Notes</u>: {details.notes}</></Typography> : <div className="editDetails">Notes: {details.notes}<br/><TextField type='text' sx={{backgroundColor: 'white', width: 500 }}  defaultValue={newDetails.notes} onChange={handleNotesChange}/></div>
                }
                <br/>
                <Typography color="#04E2B7" variant="h5">
                    <><small><u>Timeline:</u></small><br/>{details.timeline_title}</>
                    {toggleEditDetails === true ? 
                        <div className="editDetails">
                            <InputLabel sx={{color: '#04E2B7'}} id="select-timeline-dropdown">Select a timeline:</InputLabel>
                    <Select sx={{marginLeft: '20%', width: 230, "& .MuiInputBase-root": {backgroundColor: '#8075FF'}}} labelId="select-timeline-dropdown" 
                            label="Select a Timeline" name='timeline' value={details.timeline_id} onChange={handleTimelineSelect}>
                        <MenuItem value={details.timeline} >Keep current timeline</MenuItem>
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