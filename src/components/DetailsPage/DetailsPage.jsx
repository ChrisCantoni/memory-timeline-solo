import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';

function DetailsPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const details = useSelector(store => store.details)

    const imagePost = 'http';

    // const handleDetails = (id) => {
    //     console.log('You clicked on id #', id)
    //     dispatch({type: 'FETCH_DETAILS', payload: id})
    // }

    const refreshPage = () => {
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }

    const deletePost = () => {
        dispatch({type: 'DELETE_POST', payload: id})
        history.push('/user');
    }

    useEffect(() => {
        refreshPage();
    }, [])

    // TODO: DELETE function
    // TODO: Add warning pop-up!

    return (
        <>
        {details.map((post) => {
        return (
            <div className="postDetails" key={details.id}>
            {post.title}<br/>
            {post.media_url.includes(imagePost) ? <img src={post.media_url} width={800}/> : <p>{post.media_url}</p>}<br/>
            {post.notes}
            <br/>
            Timeline: {post.timeline_title}
            <button onClick={deletePost}>Delete Post</button>
            </div>
        )
})}
        </>
    )
}

export default DetailsPage;