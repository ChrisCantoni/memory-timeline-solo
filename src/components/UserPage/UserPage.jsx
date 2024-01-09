import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import PostsPage from '../PostsPage/PostsPage';
import { Link } from 'react-router-dom';


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
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <br />
      <ul>
        {post.map((item, i) => {
          return <li key={i}><PostsPage post={item}/></li>
        })}
      </ul>
      <Link to={'/addpost'}><button>Add New Post</button></Link>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
