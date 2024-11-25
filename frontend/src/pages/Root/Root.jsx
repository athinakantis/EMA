import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
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
