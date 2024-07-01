import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import clients from '../api/client';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import GoogleLoginButton from '../GoogleLoginButton';
import Navbar from "../css/Navbar";

function Register() {
  const [progress, setProgress] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    setProgress(10);
    clients
      .get("/api/user/")
      .then(function (res) {
        setProgress(50);
        navigate('/myaccount'); // Change '/login' to the actual login page URL
        setCurrentUser(true);
        window.location.reload();
        setProgress(100);
      })
      .catch(function (error) {
        setProgress(50);
        setCurrentUser(false);
        // Redirect to the login page if there's no currentUser
        if (!currentUser) {
          navigate('/signup'); // Change '/login' to the actual login page URL
          setProgress(100);
        }
      });
  }, []);

  function submitRegistration(e) {
    setProgress(10);
    e.preventDefault();
    clients.post(
      "/api/signup/",
      {
        "username": username,
        "password": password
      }
    ).then(function (res) {
      setProgress(50);
      clients.post(
        "/api/login/",
        {
          "username": username,
          "password": password
        }
      ).then(function (res) {
        setCurrentUser(true);
        navigate('/myaccount');
        setProgress(100);
      })
        .catch(function (error) {
          setProgress(50);
          setOpenSnackbar(true);
          setErrorMsg(error)
          setProgress(50);
          setCurrentUser(false);
          // Redirect to the login page if there's no currentUser
          setProgress(100);
        });
    }).catch(function (error) {
      setProgress(50);
      setOpenSnackbar(true);
      setErrorMsg(error.response.data.username)
      setProgress(50);
      setCurrentUser(false);
      // Redirect to the login page if there's no currentUser
      setProgress(100);
    })
  }

  return (
    <>
    <Navbar />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="warning">
          {errorMsg}
        </MuiAlert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={submitRegistration} sx={{ mt: 3 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className='bg-purple-600 hover:bg-purple-800  w-full p-4 text-center shadow-md dark:shadow-gray-200 rounded-full font-semibold text-white'
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>

            <div className='text-center mt-6'>
              <p className='mb-2'>Or</p>
              <GoogleLoginButton />
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Register;
