import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-screen'>

            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;