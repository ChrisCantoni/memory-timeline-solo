import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import PostsPage from '../PostsPage/PostsPage';
import { useHistory, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../PostsPage/PostsPage.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import FlareIcon from '@mui/icons-material/Flare';
import moment from 'moment';


function UserPage() {
  const history = useHistory();
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

  const handleDetails = (id) => {
    dispatch({type: 'EMPTY_DETAILS'});
    console.log('You clicked on id #', id)
    dispatch({type: 'FETCH_DETAILS', payload: id})
    history.push(`/details/${id}`)
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
      {/* <div className="star-layers">
        
      </div> */}
    <div className="container star-layers">
    <div class="star-layer" id="stars"></div>
        <div class="star-layer" id="stars2"></div>
        <div class="star-layer" id="stars3"></div>
      {timelineList.length === 0 ? <div className='welcomePackage'><h2>Get started by adding your own timeline!</h2>
      <br/><Link to={'/addtimeline'}><Button variant="contained" color="secondary">Click Here to Add a Timeline</Button></Link></div> : ''}
      <div className='timelineDiv' id='timelineDiv'>
      <VerticalTimeline lineColor={'#04E2B7'}>
        {post.map((item, i) => {
          return <VerticalTimelineElement className="postTimelineElement" 
            date={moment(item.date).format('LL')}
            contentStyle={{ background: '#8075FF', color: '#fff', border: '2px #04E2B7 solid'}}
            iconStyle={{ background: '#3D007A'}}
            icon={<FlareIcon fontSize='large' style={{color:'#04E2B7'}}/>}
            onTimelineElementClick={() => handleDetails(item.id)}
            key={i}><Link to={`/details/${item.id}`}><PostsPage post={item}/></Link>
          </VerticalTimelineElement> 
        })}
      </VerticalTimeline>
      </div>
      <Link to={'/addpost'}><Button size='large' sx={{width: 400, border: '2px #04E2B7 solid'}} className='addPostBtn' variant="contained" color="secondary">Add New</Button></Link>
    </div>
  </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
