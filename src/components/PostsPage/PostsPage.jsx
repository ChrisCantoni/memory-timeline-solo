import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './PostsPage.css';
import moment from 'moment';

function PostsPage(props) {

    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(true)

    const checkImage = () => {
        dispatch({type: 'EMPTY_DETAILS'});
    if (props.post.media_url.indexOf('http') === -1) {
        setIsImage(false)
    }};

    const handleDetails = (id) => {
        console.log('You clicked on id #', id)
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }

    useEffect(() => {
        checkImage();
    }, [props]);

    return (
        <div className="postItem" onClick={() => handleDetails(props.post.id)}>
            <Link to={`/details/${props.post.id}`}>
                <h4>{props.post.post_title}</h4> <br/> 
                {!isImage ? <p>{props.post.media_url}</p> : <img className="imagePost" src={props.post.media_url} width={500}/> }<br/>
                <small><strong>Notes:</strong> {props.post.notes}</small><br/>
            </Link>
        </div>
    )
}

export default PostsPage;