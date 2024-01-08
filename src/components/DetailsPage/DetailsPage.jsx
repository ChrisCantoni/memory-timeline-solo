import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

function DetailsPage() {

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

    useEffect(() => {
        refreshPage();
    }, [])

    // TODO: MAP over details. It's an array.

    return (
        <>
        {JSON.stringify(details)}
        {details.map((post) => {
        return (
            <div className="postDetails" key={details.id}>
            {post.title}<br/>
            {post.media_url.includes(imagePost) ? <img src={post.media_url} width={800}/> : <p>{post.media_url}</p>}<br/>
            {post.notes}
            <br/>
            Timeline: {post.timeline_title}
            </div>
        )
})}
        </>
    )
}

export default DetailsPage;