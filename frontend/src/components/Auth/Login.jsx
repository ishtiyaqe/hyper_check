import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import client from '../api/client';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import GoogleLoginButton from '../GoogleLoginButton';
import Navbar from "../css/Navbar";



export default function Login() {
  const [currentUser, setCurrentUser] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    client
      .post('api/login/', {
        username: username,
        password: password,
      })
      .then(function (res) {
        setCurrentUser(true);
        navigate('/myaccount');
      })
      .catch(function (error) {
        setCurrentUser(false);
        setOpenSnackbar(true);
      });
  };

  useEffect(() => {
    client
      .get('/api/user')
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, [navigate]);

  useEffect(() => {
    const value = username.replace(/\D/g, '');
    setFormData({ ...formData, username: value });
  }, [username]);

  if (currentUser) {
    navigate('/myaccount');
    return null;
  }

  return (
    <div>
      <Navbar />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="warning">
          Check username & Password
        </MuiAlert>
      </Snackbar>

      <div className='flex justify-center mt-10 mb-20 p-4 '>
        <div className='flex flex-col justify-items-center '>
          <div className='theme_color flex justify-center m-auto rounded-full w-10 h-10'>
            <LockOutlinedIcon className='self-center text-white' />
          </div>
          <div className='text-xl text-center font-semibold'>
            Sign in
          </div>
          <form noValidate onSubmit={submitLogin} className='flex flex-col mt-4'>

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => {
                const input = e.target.value;
                setUsername(input);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              className='bg-purple-600 hover:bg-purple-800 theme_colol w-full text-center p-2 mt-4 mb-4 text-white font-semibold text-xl rounded-full shadow-md dark:shadow-gray-200'
            >
              Sign In
            </button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <p className='mb-2 mt-4 text-center'>Or</p>
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
