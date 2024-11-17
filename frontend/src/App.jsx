import './App.css';
import EmployeeList from './Components/EmployeeList/EmployeeList';
import Header from './Components/Header/Header';
import Button from './Components/CustomComponents/Button/Button';
import Footer from './Components/Footer/Footer';
import React, { useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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