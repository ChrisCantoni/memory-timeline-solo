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
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';


function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Button className='navLink' onClick={() => setToggleSearch(!toggleSearch)}><SearchIcon sx={{color: "#04E2B7"}}/></Button>
              {toggleSearch ? <><TextField variant='filled' className='searchField' sx={{backgroundColor: 'white'}} color='secondary' size='small' value={searchTerm} onChange={handleSearchChange}/>
              <Button color='secondary' variant='contained' onClick={handleSubmit}>Submit</Button></> : ''}
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
            
            
            <div className='menuDiv'>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <MenuIcon sx={{color:"#04E2B7"}}/>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}>         
                
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
              </Menu>
            </div>
          </>
        )}

        
      </div>
    </div>
  );
}

export default Nav;
