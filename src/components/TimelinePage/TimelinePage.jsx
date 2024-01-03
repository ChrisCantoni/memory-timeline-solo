import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TimelineItem from '../TimelineItem/TimelineItem.jsx';

function TimelinePage() {

    const [timelines, setTimelines] = useState([])

    const getTimelines = () => {
        axios.get('/api/timeline').then((response) => {
            console.log(response.data)
            setTimelines(response.data)
        }).catch((error) => {
            console.error("Problem fecthing timelines", error)
            alert("Something went wrong");
        })
    }

    useEffect(() => {
        getTimelines();
    }, []);

    return (
        <>
        <h1>This is the Timelines page</h1>
        <p>{JSON.stringify(timelines)}</p>
        <ul>
            {timelines.map((item) => {
                return <li><TimelineItem key={item.id} item={item}/></li>
            })}
        </ul>
        </>
    )
}


export default TimelinePage;