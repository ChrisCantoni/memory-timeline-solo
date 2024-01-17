import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';
import Button from '@mui/material/Button';

function LoginPage() {
  const history = useHistory();

  return (
    <div className='loginPage'>
      <LoginForm />

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          variant="contained" color="secondary"
          sx={{marginBottom: '10px'}}
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
