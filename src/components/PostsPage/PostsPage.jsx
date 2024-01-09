import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './PostsPage.css';

function PostsPage(props) {

    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(true)

    const checkImage = () => {
    if (props.post.media_url.indexOf('http') === -1) {
        setIsImage(false)
    }};

    const handleDetails = (id) => {
        console.log('You clicked on id #', id)
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }

    useEffect(() => {
        checkImage();
    }, []);

    return (
        <div className="postItem" onClick={() => handleDetails(props.post.id)}>
            <Link to={`/details/${props.post.id}`}>
                {props.post.title} <br/> 
                {!isImage ? <p>{props.post.media_url}</p> : <img src={props.post.media_url} width={500}/> }<br/>
                <small>{props.post.notes}</small>
            </Link>
        </div>
    )
}

export default PostsPage;