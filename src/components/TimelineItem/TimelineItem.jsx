import moment from 'moment';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';


function TimelineItem(props) {

    const dispatch = useDispatch();

    

    // TODO: Make the visibility icon a button for visibility

    return (
    
        <>
        {props.item.title} created on: {moment(props.item.date_created).format('llll')} 
        {props.item.visible = 'true' ? <VisibilityIcon/> : ''}
        </>
    )
}

export default TimelineItem;