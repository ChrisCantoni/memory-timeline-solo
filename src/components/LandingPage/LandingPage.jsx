import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { Typography, Button, Card } from '@mui/material';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to StarGaze');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="landingContainer">
      <h2><span id='landingHeader'>{heading}</span></h2>

      <div className="grid">
        <div className="grid-col">
          <Card sx={{maxWidth: 600, backgroundColor: '#8075FF', 
          textAlign: 'center',
            padding: '10px', border: '5px solid #3D007A', minHeight: '430px',
            filter: 'drop-shadow(0 0 0.5rem #E950C8)'}}>
            <Typography margin='auto' color="#04E2B7" variant="h6">
            <p>StarGaze is an app for capturing memories. Instead of all those magical
            moments being lost in the never-ending stream of our technological life, 
            StarGaze allows you to capture special moments so you can revisit and remember them
            outside of the bluster and horn-blowing of social media. </p>
            
            <p>These memories arent meant to be shared with the world, but with you, 
              to remind yourself where you've been and inspire where you'll go next. 
              To look up at the sky at night and feel the wonder that's keeping the stars apart.</p>
              <p> If you haven't yet registered, begin your stargazing now!</p>
            </Typography>
          </Card>
        </div>
        <div className="grid-col_4">
          <Card sx={{maxWidth: 600, backgroundColor: '#8075FF', paddingBottom: '10px', marginLeft: '10px', 
          filter: 'drop-shadow(0 0 0.5rem #E950C8)',
          border: '5px solid #3D007A', minHeight: '440px'}}>
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <Button variant="contained" color='secondary' sx={{margin: '10px'}} className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </Button>
          </center>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
