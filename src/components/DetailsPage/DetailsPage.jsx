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
        {details.map((post) => {
        return (
            <div className="postDetails" key={details.id}>
            {post.title}<br/>
            {post.media_url.includes(imagePost) ? <img src={post.media_url} width={800}/> : <p>{post.media_url}</p>}<br/>
            {post.notes}
            </div>
        )
})}
        {/* <div className="postItem" onClick={() => handleDetails(details.id)}>
            {details.map((item) => {
                {item.title} <br/> 
                {item.media_url.includes(imagePost) ? <img src={item.media_url} width={500}/> : <p>{item.media_url}</p>}
                <br/>
                <small>{item.notes}</small>
            })}
        </div> */}
        </>
    )
}

export default DetailsPage;