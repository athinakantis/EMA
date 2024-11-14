import './App.css';
import EmployeeList from './Components/EmployeeList/EmployeeList';
import Header from './Components/Header/Header';
import Button from './Components/CustomComponents/Button/Button';
import Footer from './Components/Footer/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [employees, setEmployees] = useState([]);

  function toggleLogin() {
    setIsLoggedIn(prev => !prev);
  }

  return (
    <>
      <Header handleClick={toggleLogin}/>
      <main>
        {isLoggedIn ? (
          <>
          <EmployeeList/>
          </>
        ) : (
          <div id="logInPage">
          <Button text={isLoggedIn ? 'Log out' : 'Log in'} handleClick={toggleLogin}/>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
