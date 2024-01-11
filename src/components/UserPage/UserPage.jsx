import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import PostsPage from '../PostsPage/PostsPage';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../PostsPage/PostsPage.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import FlareIcon from '@mui/icons-material/Flare';
import moment from 'moment';


function UserPage() {
  const dispatch = useDispatch();
  // const [timeline, setTimeline] = useState([])
  const post = useSelector(store => store.post)
  const timelineList = useSelector(store => store.timelines);

  const getPosts = () => {
    dispatch({type: 'FETCH_POSTS'})
  }

  const getTimelines = () => {
    dispatch({type: 'FETCH_TIMELINES'})
  }


  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getTimelines()
  }, [post]);

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      {/* <div class="star-layers">
        <div class="star-layer" id="stars"></div>
        <div class="star-layer" id="stars2"></div>
        <div class="star-layer" id="stars3"></div>
      </div> */}
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <br />
      {timelineList.length === 0 ? <div className='welcomePackage'><h2>Get started by adding your own timeline!</h2>
      <br/><Link to={'/addtimeline'}><Button variant="contained" color="secondary">Click Here to Add a Timeline</Button></Link></div> : ''}
      <VerticalTimeline lineColor={'#04E2B7'}>
        {post.map((item, i) => {
          return <VerticalTimelineElement className="postTimelineElement" 
          date={moment(item.date).format('LL')}
          contentStyle={{ background: '#8075FF', color: '#fff' }}
          iconStyle={{ background: '#3D007A'}}
          icon={<FlareIcon fontSize='large' style={{color:'#04E2B7'}}/>}
          key={i}><PostsPage post={item}/></VerticalTimelineElement> 
        })}
      </VerticalTimeline>
      <Link to={'/addpost'}><Button className='addPostBtn' variant="contained" color="secondary">Add New Post</Button></Link>
    </div>
  </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
