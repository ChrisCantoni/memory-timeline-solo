import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

function DetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [toggleEditDetails, setToggleEditDetails]  = useState(false);
    const details = useSelector(store => store.details)
    let [newDetails, setNewDetails] = useState({title: details.title, media_url: details.media_url, 
        date: details.date, timeline: details.timeline})
    const [isError, setIsError] = useState(false)
    const imagePost = 'http';

    const refreshPage = () => {
        console.log(id)
        dispatch({type: 'FETCH_DETAILS', payload: id})
        setIsError(false);
    }

    const deletePost = () => {
        dispatch({type: 'DELETE_POST', payload: id})
        history.push('/user');
    }

    const sendEdittoServer = () => {
        console.log('new details', newDetails)
        dispatch({ type: 'EDIT_DETAILS', payload: newDetails})
        refreshPage();
    }

    const handleTitleChange = (e) => {
        setNewDetails({...details, title: e.target.value});
    }

    useEffect(() => {
        refreshPage();
    }, [])

    // TODO: Add warning pop-up!

    return (
        <>
            <div className="postDetails" key={details.id}>
                {JSON.stringify(details)}
            {toggleEditDetails === false ? 
            <h2>{details.title}</h2> : <input type='text' value={newDetails.title} onChange={handleTitleChange}/>}<br/>
            {!isError ? <img onError={() => setIsError(true)} src={details.media_url} width={800}/> : <p>{details.media_url}</p>}<br/>
            {details.notes}
            <br/>
            Timeline: {details.timeline_title}
            <button onClick={deletePost}>Delete Post</button>
            {toggleEditDetails === false ?
            <button onClick={() => setToggleEditDetails(!toggleEditDetails)}>Edit Details</button> :
            <button onClick={sendEdittoServer}>Save Changes</button>}
             
            </div>
        </>
    )
}

export default DetailsPage;