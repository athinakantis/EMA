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
      <Header logOut={handleClick}/>
      <main>
        {isLoggedIn ? (
          <>
          <EmployeeList />
          </>
        ) : (
          <button onClick={handleClick}>Log in</button>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
