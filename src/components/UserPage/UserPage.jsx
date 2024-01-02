import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import axios from 'axios';

function UserPage() {

  const [timeline, setTimeline] = useState({})

  const getTimeline = () => {
    axios.get('/api/post').then((response) => {
      console.log(response.data)
      setTimeline(response.data);
    }).catch((error) => {
      console.error('Problem fetching timeline', error)
      alert('Something went wrong');
    })
  }

  useEffect(() => {
    getTimeline();
  }, []);

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      {JSON.stringify(timeline[0])}
      <br />
      {/* <ul>
        <li>{timeline[0].title}</li>
        <li><img src={timeline[0].media_url}/></li>
        <li>{timeline[1].title}</li>
        <li><img src={timeline[1].media_url}/></li>
      </ul> */}
      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
