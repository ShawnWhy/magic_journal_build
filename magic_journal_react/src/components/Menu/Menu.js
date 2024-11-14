import React from 'react';
import PropTypes from 'prop-types';
import styles from './Menu.module.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../utils/API';
import { useState, useContext } from 'react';
import { MyContext } from '../../contexts/myContext';

const Menu = () => {

  const loginModalDeploy = (e) => {
    e.preventDefault();
    document.getElementById('loginModal').style.display = 'block';
  };

  const signUpModalDeploy = (e) => {
    e.preventDefault();
    document.getElementById('signUpModal').style.display = 'block';
  };

  const logOut = (e) => {
    e.preventDefault();
    API.logout().then((res) => {
      console.log(res);
      if (res.data === 'logged out') {
        setLoggedIn(false);
        setUserProfile({
          id: '1111',
          email: '',
        })
      }
    });
  };

  const { userProfile, setUserProfile} = useContext(MyContext);
  const [loggedIn, setLoggedIn] = useState(false);

return (
  <div className="row justify-content-center">
    <div className="margin title_linkLogo title_link">
      <div>Magic journal</div>
    </div>
    <div className="menuRow">
      <Link to="/">Home Page</Link>

      <Link className="margin title_link2 title_link" to="/Calendar">
        Calendar
      </Link>

      <div
        style={{
          pointerEvents: "none",
        }}
        className={
          loggedIn === false ? "visible title_link3 title_link" : "invisible"
        }
      >
        <a
          onClick={(e) => {
            loginModalDeploy(e);
          }}
          href="#"
        >
          Log In
        </a>
      </div>
      <div
        style={{
          pointerEvents: "none",
        }}
        className={
          loggedIn === false ? "visible title_link4 title_link" : "invisible"
        }
      >
        <a
          onClick={(e) => {
            signUpModalDeploy(e);
          }}
          href=""
        >
          Sign Up
        </a>
      </div>
      <div
        style={{
          pointerEvents: "none",
        }}
        className={
          loggedIn === false
            ? "invisible "
            : "visible title_link3 title_link logoutColor"
        }
      >
        <a
          onClick={(e) => {
            logOut(e);
          }}
          href="#"
        >
          Log Out
        </a>
      </div>

      <div
        style={{
          pointerEvents: "none",
        }}
        className="margin title_link4 title_link"
      >
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  </div>
);
        };


export default Menu;
