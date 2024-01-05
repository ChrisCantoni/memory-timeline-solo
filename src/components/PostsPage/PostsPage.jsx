import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import './PostsPage.css';

function PostsPage(props) {

    const dispatch = useDispatch();
    

    const imagePost = 'http'

    const handleDetails = (id) => {
        console.log('You clicked on id #', id)
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }

    return (
        <div className="postItem" onClick={() => handleDetails(props.post.id)}>
            <Link to={`/details/${props.post.id}`}>
                {props.post.title} <br/> 
                {props.post.media_url.includes(imagePost) ? <img src={props.post.media_url} width={500}/> : <p>{props.post.media_url}</p>}
                <br/>
                <small>{props.post.notes}</small>
            </Link>
        </div>
    )
}

export default PostsPage;