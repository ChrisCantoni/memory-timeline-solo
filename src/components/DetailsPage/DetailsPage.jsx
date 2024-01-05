import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

function DetailsPage() {

    const dispatch = useDispatch();
    const details = useSelector(store => store.details)

    const imagePost = 'http';

    const handleDetails = (id) => {
        console.log('You clicked on id #', id)
        dispatch({type: 'FETCH_DETAILS', payload: id})
    }

    return (
        <div className="postItem" onClick={() => handleDetails(details.id)}>
            
                {details[0].title} <br/> 
                {details[0].media_url.includes(imagePost) ? <img src={details[0].media_url} width={500}/> : <p>{details[0].media_url}</p>}
                <br/>
                <small>{details[0].notes}</small>
            
        </div>
    )
}

export default DetailsPage;