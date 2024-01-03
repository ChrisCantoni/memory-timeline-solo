import moment from 'moment';

function TimelineItem(props) {

    return (
    
        <>{props.item.title} created on: {moment(props.item.date_created).format('llll')} {props.item.visible = 'true' ? "Yes this is visible" : "No this is not visible"}</>
    )
}

export default TimelineItem;