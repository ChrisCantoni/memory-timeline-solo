import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import PostsPage from '../PostsPage/PostsPage';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function UserPage() {
  const dispatch = useDispatch();
  // const [timeline, setTimeline] = useState([])
  const post = useSelector(store => store.post)

  const getPosts = () => {
    dispatch({type: 'FETCH_POSTS'})
  }


  useEffect(() => {
    getPosts();
  }, []);

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <div class="star-layers">
        <div class="star-layer" id="stars"></div>
        <div class="star-layer" id="stars2"></div>
        <div class="star-layer" id="stars3"></div>
      </div>
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <br />
      <ul>
        {post.map((item, i) => {
          return <li key={i}><PostsPage post={item}/></li>
        })}
      </ul>
      <Link to={'/addpost'}><Button variant="contained" color="secondary">Add New Post</Button></Link>
    </div>
  </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
