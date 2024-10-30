import './App.css';
import EmployeeList from './Components/EmployeeList/EmployeeList';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <EmployeeList />
      </main>
      <Footer />
    </>
  );
}

export default App;
