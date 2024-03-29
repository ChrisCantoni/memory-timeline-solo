import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './PostsPage.css';
import moment from 'moment';

function PostsPage(props) {

    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false)

    const checkImage = () => {
        if (props.post.media_url == undefined) {
            return;
        } else if (props.post.media_url.indexOf('http') === -1) {
            setIsImage(false)
        } else {
            setIsImage(true);
        }
    };

    const handleDetails = (id) => {
        dispatch({type: 'EMPTY_DETAILS'});
        console.log('You clicked on id #', id)
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }

    useEffect(() => {
        checkImage();
    }, [props]);

    return (
            <div className="postItem" onClick={() => handleDetails(props.post.id)}>
                <h4>{props.post.post_title}</h4> <br/> 
                {!isImage ? <p>{props.post.media_url}</p> : <img className="imagePost" src={props.post.media_url} width={250}/> }<br/>
            </div>
    )
}

export default PostsPage;