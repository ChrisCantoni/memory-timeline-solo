import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

function DetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [toggleEditDetails, setToggleEditDetails]  = useState(false);
    const details = useSelector(store => store.details)
    let [newDetails, setNewDetails] = useState({title: details.title, media_url: details.media_url, 
        date: details.date, timeline: details.timeline})
    const [isImage, setIsImage] = useState(true)
    

    const refreshPage = () => {
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }

    const checkImage = () => {
        if (details.media_url == undefined) {
            return;
        } else if (details.media_url.indexOf('http') === -1) {
            setIsImage(false)
        }};

    const deletePost = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
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

    const sendEdittoServer = () => {
        console.log('new details', newDetails)
        dispatch({ type: 'EDIT_DETAILS', payload: newDetails});
        setToggleEditDetails(false)
    }

    const handleTitleChange = (e) => {
        setNewDetails({...details, title: e.target.value});
    }

    useEffect(() => {
        refreshPage();
        checkImage();
    }, [])

    // TODO: Add warning pop-up!

    return (
        <>
            <div className="postDetails" key={details.id}>
            {toggleEditDetails === false ? 
            <h2>{details.title}</h2> : <input type='text' value={newDetails.title} onChange={handleTitleChange}/>}<br/>
            {!isImage ? <p>{details.media_url}</p> : <img src={details.media_url} width={800}/> }<br/>
            {details.notes}
            <br/>
            Timeline: {details.timeline_title}
            <button onClick={deletePost}>Delete Post</button>
            {toggleEditDetails === false ?
            <button onClick={() => setToggleEditDetails(!toggleEditDetails)}>Edit Details</button> : 
            <div>
            <button onClick={() => setToggleEditDetails(!toggleEditDetails)}>Cancel</button>
            <button onClick={sendEdittoServer}>Save Changes</button>
            </div>}
             
            </div>
        </>
    )
}

export default DetailsPage;