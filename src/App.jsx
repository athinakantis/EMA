import './App.css';
import EmployeeList from './Components/EmployeeList/EmployeeList';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleClick() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <>
      <Header handleClick={handleClick}/>
      <main>
        {isLoggedIn ? (
          <>
          <EmployeeList />
          </>
        ) : (
          <div id="logInPage">
          <button id='logInBtn' onClick={handleClick}>Log in</button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
