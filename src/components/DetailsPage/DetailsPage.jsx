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

function DetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [toggleEditDetails, setToggleEditDetails]  = useState(false);
    const details = useSelector(store => store.details);
    const timelineList = useSelector(store => store.timelines);

    let [newDetails, setNewDetails] = useState({});

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
        console.log(isImage);
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
        <div class="star-layer" id="stars"></div>
        <div class="star-layer" id="stars2"></div>
        <div class="star-layer" id="stars3"></div>
            <div className="postDetails" key={details.id}>
                <Card sx={{margin: 'auto', padding: '20px', backgroundColor: '#8075FF', maxWidth: 1000, display: 'flex', alignItems: 'center', flexDirection: 'Column'}}>
                <Typography color="#04E2B7" variant="h5">{toggleEditDetails === false ? 
                    <h2>{details.post_title}</h2> : 
                    <div className='editDetails'>Title: <TextField type='text' name="title" sx={{backgroundColor: 'white', width: '100%' }} defaultValue={newDetails.title} onChange={handleTitleChange}/></div>
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
                <Typography color="#04E2B7" variant="h5">
                {toggleEditDetails === false ? 
                    <p>Notes: {details.notes} </p> : <div className="editDetails"><TextField type='text' sx={{width: 400}} defaultValue={newDetails.notes} onChange={handleNotesChange}/></div>
                }</Typography>
                <br/>
                <Typography color="#04E2B7" variant="h5">
                    Timeline: {details.timeline_title}
                    {toggleEditDetails === true ? 
                        <div className="editDetails">
                            <label>Choose a timeline:</label>
                            <select name='timelines' value={newDetails.timeline} onChange={handleTimelineSelect}>
                            <option value="none" defaultValue disabled hidden>Select a Timeline</option>
                            {timelineList.map((item, i) => (
                                <option key={i} value={item.id}>{i+1}. {item.title}</option>))}
                            </select>
                        </div> : <></>
                    }
                    </Typography>
                <div className="detailsButtons">
                    <Button variant='contained' color='secondary' sx={{margin: '10px'}} onClick={deletePost}>Delete Post</Button>

                    {toggleEditDetails === false ?
                            <Button variant='contained' color='secondary' sx={{margin: '10px'}} onClick={() => editDetails()}>Edit Details</Button> : 
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