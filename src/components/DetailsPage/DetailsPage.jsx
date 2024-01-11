import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        console.log(details.media_url)
        if (details.media_url == undefined) {
            return;
        } else if (details.media_url.indexOf('http') === -1) {
            console.log('Setting isImage to false')
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
                icon: "success"
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
        setNewDetails({title: details.title, media_url: details.media_url, 
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
            <div className="postDetails" key={details.id}>
                {toggleEditDetails === false ? 
                    <h2>{details.title}</h2> : 
                    <><TextField type='text' sx={{width: 400}} defaultValue={newDetails.title} onChange={handleTitleChange}/></>
                }
                <br/>
                {details.media_url != undefined && !isImage ? <>{toggleEditDetails === false ? <p>{details.media_url}</p> : <TextField type='text' sx={{width: 400}} defaultValue={newDetails.title} onChange={handleTitleChange}/>}</> : <img src={details.media_url} width={800}/>}
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
                {toggleEditDetails === false ? 
                    <p>Notes: {details.notes} </p> : <TextField type='text' sx={{width: 400}} defaultValue={newDetails.notes} onChange={handleNotesChange}/>
                }
                <br/>
                    Timeline: {details.timeline_title}
                    {toggleEditDetails === true ? 
                        <div>
                            <label>Choose a timeline:</label>
                            <select name='timelines' value={newDetails.timeline} onChange={handleTimelineSelect}>
                            <option value="none" defaultValue disabled hidden>Select a Timeline</option>
                            {timelineList.map((item, i) => (
                                <option key={i} value={item.id}>{item.id}. {item.title}</option>))}
                            </select>
                        </div> : <></>
                    }
                <div className="detailsButtons">
                    <Button variant='contained' color='secondary' onClick={deletePost}>Delete Post</Button>

                    {toggleEditDetails === false ?
                            <Button variant='contained' color='secondary' onClick={() => editDetails()}>Edit Details</Button> : 
                        <div>
                            <Button variant='contained' color='secondary' onClick={() => editDetails()}>Cancel</Button>
                            <Button variant='contained' color='secondary' onClick={sendEdittoServer}>Save Changes</Button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default DetailsPage;