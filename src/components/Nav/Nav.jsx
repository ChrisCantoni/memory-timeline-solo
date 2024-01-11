import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';


function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = () => {
    //Fetch posts that match user.id AND search term
    console.log(searchTerm);
    dispatch({type: 'FETCH_SEARCH', payload: searchTerm})
    setToggleSearch(false);
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">StarGazer</h2>
      </Link>
      <div>
      
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Button onClick={() => setToggleSearch(!toggleSearch)}><SearchIcon sx={{color: "white"}}/></Button>
              {toggleSearch ? <><TextField variant='filled' className='Noah' sx={{backgroundColor: 'white'}} color='secondary' size='small' value={searchTerm} onChange={handleSearchChange}/>
              <Link className='navLink' to={`/search?=${searchTerm}`}><Button color='secondary' variant='contained' onClick={handleSubmit}>Submit</Button></Link></> : ''}
            <Link className="navLink" to="/user">
              <HomeIcon/>
            </Link>

            

            <Link className="navLink" to="/info">
              <InfoIcon/>
            </Link>

            <Link className="navLink" to="/timelines">
              Timelines
            </Link>

            <Link className="navLink" to="/about">
              About
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        
      </div>
    </div>
  );
}

export default Nav;
