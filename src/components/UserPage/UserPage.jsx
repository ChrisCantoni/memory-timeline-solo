import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import PostsPage from '../PostsPage/PostsPage';
import PostInput from '../PostInput/PostInput';


function UserPage() {
  const dispatch = useDispatch();
  // const [timeline, setTimeline] = useState([])
  const post = useSelector(store => store.post)
  const details = useSelector(store => store.details)

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
      <PostInput />
      <ul>
        {post.map((item) => {
          return <li><PostsPage key={item.id} post={item}/></li>
        })}
      </ul>
      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
