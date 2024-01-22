import React from 'react';
import '../LoginPage/LoginPage.css';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <>

    <div className='registerPage'>
      <RegisterForm />

      <center>
      <Button
          type="button"
          className="btn btn_asLink"
          variant="contained" color="secondary"
          sx={{marginBottom: '10px'}}
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
    </>
  );
}

export default RegisterPage;
