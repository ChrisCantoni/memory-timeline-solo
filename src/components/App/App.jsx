import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import TimelinePage from '../TimelinePage/TimelinePage';
import DetailsPage from '../DetailsPage/DetailsPage';
import AddTimeline from '../AddTimeline/AddTimeline';
import PostInput from '../PostInput/PostInput';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const dispatch = useDispatch();
  const theme = createTheme({
    typography: {
      "fontFamily": `"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
     },
    palette: {
      primary: {
        main: '#09074B'
      },
      secondary: {
        main: '#8075FF'
      },
      tertiary: {
        main: '#04E2B7'
      }
    }
  })

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>
            <Route
              exact
              path="/timelines"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <TimelinePage/>
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>
            <Route exact path ="/addtimeline">
            {user.id ? <AddTimeline/> : <LandingPage />}
            </Route>

            <Route exact path ="/addpost">
            {user.id ? <PostInput/> : <LandingPage />}
            </Route>

            <Route exact path="/details/:id">
              {user.id ? <DetailsPage/> : <LandingPage />}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
