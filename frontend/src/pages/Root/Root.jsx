import Header from '../../Components/Header/Header';
import EmployeeList from '../EmployeeList/EmployeeList';
import Footer from '../../Components/Footer/Footer';
import Button from '../../Components/CustomComponents/Button/Button';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Root;
